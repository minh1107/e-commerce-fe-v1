import { Button } from "@mui/material";
import { apiCurrentCart } from "apis";
import withBaseComponent from "hocs/withBaseComponent";
import React, { useEffect, useState } from "react";
import { formatMoney } from "utils/helper";

const cellTableStyled = "border-[1px] border-black text-center w-[10%]";
const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const fetchAllOrder = async () => {
    const res = await apiCurrentCart();
    setCart(res?.data.cart);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div>
        <h1 className="text-3xl my-4 font-semibold text-main">Cart</h1>
      <table className="shadow-md">
        <thead>
          <tr className="bg-gray-200 h-[50px]">
            <th className={cellTableStyled}>Product</th>
            <th className={cellTableStyled}>Color</th>
            <th className={cellTableStyled}>Ram</th>
            <th className={cellTableStyled}>Internal</th>
            <th className={cellTableStyled}>Quantity</th>
            <th className={cellTableStyled}>Price</th>
            <th className={cellTableStyled}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr className="border-[1px] border-black w-full" key={index}>
              <td className="border-[1px] border-black w-[20%]">
                <div className="flex items-center gap-2">
                  <span>
                    <img
                      src={item.product.thumb}
                      alt={item.product.title}
                      width="50"
                    />
                  </span>
                  <span>{item.product.title}</span>
                </div>
              </td>
              <td className={cellTableStyled}>{item.color}</td>
              <td className={cellTableStyled}>{item.ram}</td>
              <td className={cellTableStyled}>{item.internal}</td>
              <td className={cellTableStyled}>{item.count}</td>
              <td className={cellTableStyled}>{formatMoney(item.price)} VND</td>
              <td className={cellTableStyled}>{formatMoney(item.totalPrice)} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 w-full flex justify-end">
          <Button variant="contained" size="large">Thanh toán</Button>
      </div>
    </div>
  );
};

export default withBaseComponent(Cart);
