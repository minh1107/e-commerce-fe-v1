import React from "react";
import { NavLink } from "react-router-dom";
import paths from "../../utils/paths";
import { createSlug } from "../../utils/helper";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { productCategory } = useSelector((state) => state.appReducer);

  console.log(productCategory);
  return (
    <div className="flex h-full flex-col border shadow-md">
      <div className="pt-[14px] bg-main mb-5 text-white font-semibold pb-[15px] px-5 text-base">
        ALL COLLECTIONS
      </div>
      {productCategory?.data?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={`/${el.title.toLowerCase()}`}
          className={({ isActive }) =>
            isActive
              ? "text-main flex-1 bg-main px-5 text-sm"
              : "hover:text-main flex-1 px-5 text-sm"
          }
        >
          <div className="flex gap-2 items-center">
            <img src={el.image} alt="thumb" className="w-5 h-5 rounded-full" />
            <span>{el.title}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
