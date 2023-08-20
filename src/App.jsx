import { Route, Routes } from "react-router-dom";
import paths from "./utils/paths";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./stores/app/asyncActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home, Public, Blogs, DetailProduct, FAQ, Login, Product, Service, FinalRegister, ResetPassword } from "./pages/public";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  
  return (
    <div className="flex font-poppin overflow-y-auto min-h-screen">
      <Routes>
        <Route path={paths.PUBLIC} element={<Public />}>
          <Route path={paths.HOME} element={<Home />}/>
          <Route path={paths.BLOGS} element={<Blogs />}/>
          <Route path={paths.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />}/>
          <Route path={paths.FAQ} element={<FAQ />}/>
          <Route path={paths.PRODUCTS} element={<Product />}/>
          <Route path={paths.OUR_SERVICES} element={<Service />}/>
          <Route path={paths.FINAL_REGISTER} element={<FinalRegister />}/>
        </Route>
        <Route path={paths.RESET_PASSWORD} element={<ResetPassword />}/>
        <Route path={paths.LOGIN} element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
