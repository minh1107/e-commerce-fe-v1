import { apiGetAllUser } from "apis";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PaginationCustom from "components/Pagination/Pagination";
import { Box, Button, ButtonBase, ButtonGroup, TextField } from "@mui/material";
import useDebounce from "components/hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import ManagerUserForm from "components/ManagerUser/ManagerUserForm";
import { showModal } from "stores/app/appSlice";
import moment from "moment";
import ManagerUserDelete from "components/ManagerUser/ManagerUserDelete";

const col = [
  "Index",
  "Full Name",
  "Email",
  "Mobile",
  "Role",
  "Status",
  "Create at",
  "Actions",
];
export default function ManagerUser() {
  const [recordsNumber, setRecordsNumber] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [userList, setUserList] = useState();
  const [searchInput, setSearchInput] = useState({search: ''})
  const dispatch = useDispatch()
  const {isUpdated} = useSelector((state) => state.appReducer)

  const fetchAllUser = async (data) => {
    const res = await apiGetAllUser(data);
    setRecordsNumber(res?.totalUsers)
    setUserList(res?.users);
  };
  useEffect(() => {
    if(isUpdated) {
      fetchAllUser({limit: recordPerPage});
    }
  }, [isUpdated]);

  const handleChangePage = (event, page) => {
    // setPage(page)
    fetchAllUser({page, limit: recordPerPage})
  };

  const searchDebounce = useDebounce(searchInput?.search, 300)
  useEffect(() => {
      if(searchInput.search !== '') {
        fetchAllUser({search: searchDebounce, limit: recordPerPage})    
      } else {
        fetchAllUser({limit: recordPerPage})
      }
  }, [searchDebounce])
  
  const handleEdit = (user) => {
    dispatch(showModal({isShowModal: true, modalChildren: <ManagerUserForm isEdit={true} userInfo={user}/>}))
  }
  return (
    <Paper className="w-full flex gap-4 flex-col ">
      <Box className="flex justify-between w-full pt-5 px-5">
        <Button color="error" variant="contained" 
        onClick={() => dispatch(showModal({isShowModal: true, modalChildren: <ManagerUserForm isEdit={false}/>}))}>Add New user</Button>
        <TextField className="shadow-md w-[350px] " id="outlined-basic" size="small" type="text" onChange={e => setSearchInput({search: e.target.value})} value={searchInput.search} label="Search gmail" variant="outlined" />
      </Box>
      <TableContainer className="h-[calc(100vh-300px)]">
        <Table className="w-full">
          <TableHead className="sticky top-0 w-full bg-white z-20">
            <TableRow>
              {col.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.map((item, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.firstname + item.lastname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.role == 1 ? 'Admin' : 'User'}</TableCell>
                <TableCell>{item.isBlocked ? 'Blocked' : 'Active'}</TableCell>
                <TableCell>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell className="w-[100px]">
                  <ButtonGroup>
                    <Button onClick={() => handleEdit(item)} variant="contained" size="small">
                      Edit
                    </Button>
                    <Button onClick={() => dispatch(showModal({isShowModal: true, modalChildren: <ManagerUserDelete idUser={item._id}/>}))}
                    variant="contained" color="error" size="small"> 
                      Delete
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="flex flex-col items-end py-6 pr-6">
        <PaginationCustom onclick={handleChangePage} recordsNumber={recordsNumber} recordPerPage={recordPerPage}/>
      </Box>
    </Paper>
  );
}
