import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { pathProfile } from "utils/contants";
import { useNavigate } from "react-router-dom";
export default function NavigateMobile() {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue)
  };

  return (
    <BottomNavigation
      className="bottom-0 fixed"
      value={value}
      onChange={handleChange}
    >
      {pathProfile.map((item, index) => (
          <BottomNavigationAction
            label={item.value}
            value={item.path}
            icon={<item.icon />}
          />
      ))}
    </BottomNavigation>
  );
}
