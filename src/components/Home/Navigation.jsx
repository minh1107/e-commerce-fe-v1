import React, { useState } from "react";
import { navigation } from "../../utils/contants";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { createSlug } from "utils/helper";

// Home Products Blogs Our services FAQs
const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { productCategory } = useSelector((state) => state.appReducer);

  return (
    <div className="xl:w-main md:w-tablet h-12 mb-4 py-2 border-y text-sm flex items-center">
      {navigation?.map((el) => {
        if (el.id === 6) {
          return (
            <div key={el.id}>
              <div
                className="pr-12 hover:text-main font-semibold cursor-pointer uppercase"
                onClick={handleClick}
              >
                {el.value}
              </div>
              <Menu
                className="mt-4"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {productCategory?.data?.map((el, index) => (
                  <MenuItem  key={createSlug(el.title)}>
                    <NavLink
                      onClick={handleClose}
                      to={`/${el.title.toLowerCase()}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-main flex-1 px-5 text-sm "
                          : "hover:text-main flex-1 px-5 py-2 w-[500px] text-sm"
                      }
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={el.image}
                          alt="thumb"
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{el.title}</span>
                      </div>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          );
        } else
          return (
            <NavLink
              key={el.id}
              to={el.path}
              className={({ isActive }) =>
                isActive
                  ? "pr-12 uppercase hover:text-main text-main font-semibold"
                  : "pr-12 hover:text-main font-semibold"
              }
            >
              {el.value}
            </NavLink>
          );
      })}
    </div>
  );
};
export default Navigation;
