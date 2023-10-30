import { Box, Button, Modal, Step, StepLabel, Stepper } from "@mui/material";
import { apiCurrentOrder } from "apis";
import React, { useEffect, useState } from "react";

const steps = ["Đặt hàng", "Xét duyệt","Giao hàng", "Nhận hàng"];
const processList = ["Canceled", 'Processing', 'Shipping', 'Succeeded'] 

const OrderInfoItem = ({item}) => {
  const [open, setOpen] = useState(false);
  const [process, setProcess] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if(item.status === processList[1]) {
      setProcess(1)
    } else if(item.status === processList[2]){
      setProcess(2)
    }
    else if(item.status === processList[3]) {
      setProcess(3)
    }
  }, [])
  
  return (
    <Box sx={{ width: "100%" }} alignItems={'center'} className="flex flex-col border-[2px] py-4">
      {item?.products?.map((el) => (
        <ul key={el?.id} className="flex items-center  gap-4">
          <img src={el?.thumb} alt="" className="w-10 h-10"/>
          <li>Tên sản phẩm: {el.title}</li>
        </ul>
      ))}
    <Button onClick={handleOpen}>Xem chi tiết đơn hàng đã đặt</Button>
    <Stepper activeStep={process} alternativeLabel className="flex-1 w-full">
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="bg-white flex gap-4 m-auto p-8 rounded-md translate-y-[100%] w-[80%]">
          <ul className="border p-2">
            <li className="font-bold">Thông tin người nhận</li>
            <li>Số điện thoại: {item?.mobile}</li>
            <li>Địa chỉ: {item?.address}</li>
            <li>Người nhận: {item?.receiver}</li>
          </ul>
          {item?.products?.map((el) => (
            <ul key={el?.id}>
              <img src={el?.thumb} alt="" className="w-10 h-10"/>
              <li>Tên sản phẩm: {el.title}</li>
              <li>Màu sắc: {el?.color}</li>
              <li>Giá thành: {el?.price}</li>
              <li>Ram: {el?.ram}</li>
              <li>Internal: {el?.internal}</li>
              <li>Số lượng: {el?.count}</li>
            </ul>
          ))}
        </div>
      </Modal>
    </Stepper>
  </Box>
  )
}

const OrderInfo = () => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const fetchAllOrder = async () => {
    const res = await apiCurrentOrder();
    setCurrentOrder(res?.data);
  };
  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <div className="border">
      {currentOrder?.map((item) => (
        <OrderInfoItem item={item}/>
      ))}
    </div>
  );
};

export default OrderInfo;
