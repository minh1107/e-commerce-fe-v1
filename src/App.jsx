import { Route, Routes,useNavigate  } from "react-router-dom";
import paths from "./utils/paths";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./stores/app/asyncActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home, Public, Blogs, DetailProduct, Login, Products, Service, FinalRegister, ResetPassword } from "./pages/public";
import Modal from "./components/common/Modal";
import { AdminLayout, CreateProduct, Dashboard, ManagerProduct, ManagerUser } from "pages/admin";
import ManagerOrder from "pages/admin/ManagerOrder";
import { MemberLayout, Personal } from "pages/member";
import Cart from "pages/member/Cart";
import ShoppingHistory from "pages/member/ShoppingHistory";
import Favorite from "pages/member/Favorite";
import OrderInfo from "pages/member/OrderInfo";
import ContactUs from "pages/public/ContactUs";
import CreateBlog from "pages/admin/CreateBlog";
import BlogDetail from "pages/public/BlogDetail";
import ManagerBlogs from "pages/admin/ManagerBlogs";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector(state => state.appReducer)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  
  return (
    <div className="flex font-poppin overflow-y-auto min-h-screen relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
    <Routes>
        <Route path={paths.PUBLIC} element={<Public />}>
          <Route path={paths.HOME} element={<Home />}/>
          <Route path={paths.BLOGS} element={<Blogs />}/>
          <Route path={paths.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />}/>
          <Route path={paths.CONTACT_US} element={<ContactUs />}/>
          <Route path={paths.PRODUCTS} element={<Products />}/>
          <Route path={paths.OUR_SERVICES} element={<Service />}/>
          <Route path={paths.FINAL_REGISTER} element={<FinalRegister />}/>
          <Route path={paths.BLOG_DETAIL} element={<BlogDetail />}/>
        </Route>
        <Route path={paths.ADMIN} element={<AdminLayout />}>
          <Route path={paths.DASHBOARD} element={<Dashboard />}/>
          <Route path={paths.MANAGER_USER} element={<ManagerUser />}/>
          <Route path={paths.MANAGER_PRODUCT} element={<ManagerProduct />}/>
          <Route path={paths.MANAGER_ORDER} element={<ManagerOrder />}/>
          <Route path={paths.CREATE_PRODUCT} element={<CreateProduct />}/>
          <Route path={paths.CREATE_BLOG} element={<CreateBlog />}/>
          <Route path={paths.BLOG_DASHBOARD} element={<ManagerBlogs />}/>
        </Route>
        <Route path={paths.MEMBER} element={<MemberLayout />}>
          <Route path={paths.PERSONAL} element={<Personal />}/>
          <Route path={paths.CART} element={<Cart />}/>
          <Route path={paths.SHOPPING_HISTORY} element={<ShoppingHistory />}/>
          <Route path={paths.WISHLIST} element={<Favorite />}/>
          <Route path={paths.ORDER} element={<OrderInfo />}/>
        </Route>
        <Route path={paths.RESET_PASSWORD} element={<ResetPassword />}/>
        <Route path={paths.LOGIN} element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
