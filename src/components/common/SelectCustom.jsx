import { forwardRef } from "react"; 

export const SelectCustom = forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  ));