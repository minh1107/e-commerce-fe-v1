import icons from "./icons";
import paths from "./paths";

const {
  MdSpaceDashboard,
  BiSolidUserPin,
  FaProductHunt,
  IoCreate,
  BsFillCartCheckFill,
} = icons;

export const navigation = [
  {
    id: 5,
    value: "HOME",
    path: `/${paths.HOME}`,
  },
  {
    id: 1,
    value: "PRODUCTS",
    path: `/${paths.PRODUCTS}`,
  },
  {
    id: 2,
    value: "BLOGS",
    path: `/${paths.BLOGS}`,
  },
  {
    id: 3,
    value: "OUR SERVICES",
    path: `/${paths.OUR_SERVICES}`,
  },
  {
    id: 1,
    value: "FAQs",
    path: `/${paths.FAQ}`,
  },
];

export const pathAdmin = [
  {
    id: 1,
    value: "Dashboard",
    path: `/${paths.ADMIN}/${paths.DASHBOARD}`,
    icon: MdSpaceDashboard 
  },
  {
    id: 2,
    value: "Manage users",
    path: `/${paths.ADMIN}/${paths.MANAGER_USER}`,
    icon: BiSolidUserPin
  },
  {
    id: 3,
    value: "Manager products",
    path: `/${paths.ADMIN}/${paths.MANAGER_PRODUCT}`,
    icon: FaProductHunt
  },
  {
    id: 4,
    value: "Create product",
    path: `/${paths.ADMIN}/${paths.CREATE_PRODUCT}`,
    icon: IoCreate
  },
  {
    id: 5,
    value: "Manager order",
    path: `/${paths.ADMIN}/${paths.MANAGER_ORDER}`,
    icon: BsFillCartCheckFill
  },
];
