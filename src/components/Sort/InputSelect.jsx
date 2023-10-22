import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    // <select className="p-2 border border-gray-200 rounded-md shadow-md outline-none hover:cursor-pointer hover:border-gray-500" value={value} onChange={e => changeValue(e.target.value)}>
    //   <option value="option">Option</option>
    //   {options.map(el => (
    //     <option value={el.value} key={el.id}>{el.text}</option>
    //   ))}
    // </select>
    <div className="flex flex-col gap-2">
      {options.map((el) => (
        <div>
          <input className="mr-4" id={el.id} name="sort"
            type="radio"
            onChange={(e) => changeValue(e.target.value)}
            value={el.value}
            key={el.id}
          />
          <label className="cursor-pointer" htmlFor={el.id}>{el.text}</label>
        </div>
      ))}
    </div>
  );
};

export default memo(InputSelect);
