import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { apiCurrentOrder } from "apis";
import React, { useEffect, useState } from "react";

const steps = [
  "Đặt hàng",
  "Giao hàng",
  "Nhận hàng",
];

const OrderInfo = () => {
  const [currentOrder, setCurrentOrder] = useState([]);

  const fetchAllOrder = async () => {
    const res = await apiCurrentOrder();
    setCurrentOrder(res?.data);
  };
  useEffect(() => {
    fetchAllOrder();
  }, []);
  console.log(currentOrder);
  return (
    <div>
      {currentOrder?.map((item) => (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {item?.products?.map((el) => (
            <div>
                {el.color}
            </div>
          ))}
        </Box>
      ))}
    </div>
  );
};

export default OrderInfo;
