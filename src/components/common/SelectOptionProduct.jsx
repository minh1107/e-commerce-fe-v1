import React, { useRef, useState } from "react";

const SelectOptionProduct = ({ title, type, onclick }) => {
  const [selected, setSelected] = useState() 

  const handleClick = (index, item) => {
    onclick(title, item)
    setSelected(index)
  }

  return (
    <div className="flex gap-2 items-center">
      <h3 className="font-semibold">{title}: </h3>
      {type?.map((item, index) => (
        <span key={item} onClick={() => handleClick(index, item)} 
        className={`p-2 border-[1px] hover:cursor-pointer border-gray-500 hover:border-main ${(selected === index) ? 'border-main bg-gray-200' : ''}`}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default SelectOptionProduct;
