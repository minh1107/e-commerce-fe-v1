import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options}) => {

  return (
    <select className="p-2 border border-gray-200 rounded-md shadow-md outline-none hover:cursor-pointer hover:border-gray-500" value={value} onChange={e => changeValue(e.target.value)}>
      <option value="option">Option</option>
      {options.map(el => (
        <option value={el.value} key={el.id}>{el.text}</option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
