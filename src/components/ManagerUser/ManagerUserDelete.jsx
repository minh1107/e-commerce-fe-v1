import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { showModal } from "stores/app/appSlice";
import { apiDeleteUserByAdmin } from "apis";
import Swal from "sweetalert2";

export default function ManagerUserDelete({ idUser }) {
    console.log(idUser)
    const dispatch = useDispatch()
    const handleSubmit = async() => {
        const resDelete = await apiDeleteUserByAdmin({_id: idUser})
        if(resDelete.status) {
            Swal.fire('Xóa người dùng thành công', 'Đã xóa', 'success')
        } else {
            Swal.fire('Xóa người dùng thất bại', 'Xóa thất bại', 'error')
        }
        dispatch(showModal({ isShowModal: false, modalChildren: null, isUpdated: true }))
    }
  return (
    <Dialog open={true}
      onClick={(e) => e.stopPropagation()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Xóa người dùng!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn xóa người dùng này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null, isUpdated: false }))}>
          Từ chối
        </Button>
        <Button autoFocus onClick={handleSubmit}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  );
}
