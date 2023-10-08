import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import paths from "../../utils/paths";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "stores/product/productSlice";

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
  const { currentUser } = useSelector((state) => state.userReducer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between xl:w-main md:w-tablet h-[110px] items-center">
      <Link to={paths.HOME}>
        <img
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1692246358/electronicStore/logo/logo_digital_new_250x_nkrya1.png"
          className="w-[234px] h-6"
          alt=""
        />
      </Link>
      <div className="flex text-[13px]">
        <div className="xl:flex hidden flex-col items-center px-4 border-r">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="xl:flex hidden flex-col items-center px-4 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-4 border-r">
          <BsHandbagFill color="red" />
          <span>0 Item(s)</span>
        </div>
        <div>
          <Button
            startIcon={<FaUserCircle size={24} />}
            color="error"
            className="flex items-center gap-2 hover:cursor-pointer justify-center px-4"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Profile
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to={`/${paths.MEMBER}/${paths.ORDER}`}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>Cart</MenuItem>
            {currentUser?.data?.role == 1 && (
              <MenuItem onClick={handleClose}>
                <Link to={`/${paths.ADMIN}/${paths.DASHBOARD}`}>
                  Admin dashboard
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={() => dispatch(logout())}>
              <Link to={`/${paths.LOGIN}`}>Logout</Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
