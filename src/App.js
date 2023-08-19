import { Route, Routes } from "react-router-dom";
import paths from "./utils/paths";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Public from "./pages/public/Public";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./stores/app/asyncActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNewProducts } from "./stores/product/asyncAction";


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
          <Route path={paths.LOGIN} element={<Login />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
