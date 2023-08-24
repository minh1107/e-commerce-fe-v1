import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { apiUpdateUserByAdmin } from "apis";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "stores/app/appSlice";
import Swal from "sweetalert2";

const ManagerUserForm = ({ userInfo, isEdit }) => {
  const dispatch = useDispatch((state) => state.appReducer);
  const [firstname, setFirstname] = useState(userInfo?.firstname);
  const [lastname, setLastname] = useState(userInfo?.lastname);
  const [email, setEmail] = useState(userInfo?.email);
  const [role, setRole] = useState(userInfo?.role);
  const [isBlocked, setIsBlocked] = useState(userInfo?.isBlocked);
  const [mobile, setMobile] = useState(userInfo?.mobile);

  const handleSubmit = async () => {
    if(isEdit) {
      const res = await apiUpdateUserByAdmin({ firstname, lastname, email, role, mobile, isBlocked },userInfo._id);
      if (res.status) {
        Swal.fire(res.data, "" , 'success').then(() => {
          dispatch(showModal({ isShowModal: false, modalChildren: null,  isUpdated: true }))
        }) 
      }      
    } else {
      const res = await apiUpdateUserByAdmin({ firstname, lastname, email, role, mobile, isBlocked },userInfo._id);
      if (res.status) {
        Swal.fire(res.data, "" , 'success').then(() => {
          dispatch(showModal({ isShowModal: false, modalChildren: null, isUpdated: true }))
        }) 
      }
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      className="p-10 rounded-md flex flex-col gap-4 bg-white w-[900px]"
    >
      <h1 className="text-center font-semibold text-3xl w-full">Edit user</h1>
      <Box className="flex w-full gap-4">
        <TextField
          fullWidth
          id="outlined-basic"
          label="First name"
          variant="outlined"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
      </Box>
      <Box className="flex w-full gap-4">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Mobile"
          variant="outlined"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Box>
      <Box className="flex w-full gap-4">
        <FormControl fullWidth>
          <h1 className="w-fit">Select role</h1>
          <RadioGroup
            defaultValue={role}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value={1}
              onChange={(e) => setRole(e.target.value)}
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              value={0}
              onChange={(e) => setRole(e.target.value)}
              control={<Radio />}
              label="User"
            />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <h1 className="w-fit">Status</h1>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={isBlocked}
          >
            <FormControlLabel
              value={true}
              onChange={(e) => setIsBlocked(e.target.value)}
              control={<Radio />}
              label="Block"
            />
            <FormControlLabel
              value={false}
              onChange={(e) => setIsBlocked(e.target.value)}
              control={<Radio />}
              label="Active"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className="flex gap-3 w-full justify-end">
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null, isUpdated: false }))
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ManagerUserForm;
