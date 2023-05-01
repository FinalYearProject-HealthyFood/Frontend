import { Route, Routes } from "react-router-dom";
// import Header from './components/Header'
// import Navigation from './components/Navigation'
// import Footer from './components/Footer'
// import TheThanks from './components/TheThanks'
import MainLayout from "./pages/layout/MainLayout";
import Home from "./pages/guest/Home";
import Meal from "./pages/guest/Menu/Meal";
import Nutrient from "./pages/guest/Menu/Nutrient";
import Tdde from "./pages/guest/Tdde";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import ScrollTopButton from "./components/ScrollTopButton";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import TddeCalculator from "./pages/guest/TddeCalculator";
import Profile from "./pages/guest/Profile";
import Info from "./pages/guest/Profile/Info";
import ChangePassword from "./pages/guest/Profile/ChangePassword";
import OrderHistory from "./pages/guest/Profile/OrderHistory";
import Cart from "./pages/guest/Cart";
import Payment from "./pages/guest/Payment";
import DashboardLayout from "./pages/layout/DashboardLayout";
import MealManager from "./pages/admin/MealManager";
import OrderManager from "./pages/admin/OrderManager";
import NutrientManager from "./pages/admin/NutrientManager";
import UserManager from "./pages/admin/UserManager";
import axiosClient from "./axios";
import { useStateContext } from "./contexts/ContextProvider";
import { useEffect } from "react";

function App() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
    useEffect(() => {
      if (userToken) {
        axiosClient.get("/me").then(({ data }) => {
          setCurrentUser(data);
        });
      }
    }, []);
  return (
    <Box scrollBehavior={"smooth"}>
      <ScrollToTop />
      <ScrollTopButton />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="meal" element={<Meal />} />
          <Route path="nutrient" element={<Nutrient />} />
          <Route path="tdde-calculator" element={<TddeCalculator />} />
          <Route path="tdde-index" element={<Tdde />} />
          <Route path="faq" element={""} />
          <Route path="contact" element={""} />
          <Route path="profile" element={<Profile />}>
            <Route path="info" element={<Info />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="cart-payment" element={<Payment />} />
        </Route>
        {Object.keys(currentUser).length !== 0 ? (
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="order" element={<OrderManager />} />
            <Route path="meal" element={<MealManager />} />
            <Route path="nutrient" element={<NutrientManager />} />
            <Route path="user" element={<UserManager />} />
          </Route>
        ) : (
          ""
        )}
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
