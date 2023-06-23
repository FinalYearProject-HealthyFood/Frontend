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
import IngredientDetail from "./pages/guest/Menu/Nutrient/IngredientDetail";
import DietRecommender from "./pages/guest/DietRecommender";
import SuccessVerify from "./pages/guest/Email/Verify/SuccessVerify";
import AlreadyVerify from "./pages/guest/Email/Verify/AlreadyVerify";
import MealDetail from "./pages/guest/Menu/Meal/MealDetail";
import Page404 from "./pages/pageNotFound/Page404";
import RatingList from "./pages/guest/RatingList";
import PaymentSuccess from "./pages/guest/Payment/PaymentSuccess";
import Contact from "./pages/guest/Contact";
import FAQ from "./pages/guest/FAQ";
import FaqManager from "./pages/admin/FaqManager";

function App() {
  const permission = {
    adminPermission: ["admin"],
    ManagerPermission: ["admin", "manager"],
    foodPermission: ["admin", "foodmod", "manager"],
    orderPermission: ["admin", "ordermod", "foodmod", "manager"],
    DashboardPermission: ["admin", "ordermod", "foodmod", "manager"],
  };
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  useEffect(() => {
    if (userToken) {
      axiosClient
        .get("/me")
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch(() => {
          setCurrentUser({});
          setUserToken(null);
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
          <Route path="/payment">
            <Route path="success" element={<PaymentSuccess />} />
          </Route>
          <Route path="verify">
            <Route path="success" element={<SuccessVerify />} />
            <Route path="already-verify" element={<AlreadyVerify />} />
            <Route />
          </Route>
          <Route path="meal" element={<Meal />} />
          <Route path="meal/:id" element={<MealDetail />} />
          <Route path="nutrient" element={<Nutrient />} />
          <Route path="nutrient/:id" element={<IngredientDetail />} />
          <Route path="tdde-calculator">
            <Route path="" element={<TddeCalculator />} />
            <Route path="result" element={<Tdde />} />
          </Route>
          <Route path="diet-recommend" element={<DietRecommender />} />
          <Route path="faq" element={<FAQ/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="profile" element={<Profile />}>
            <Route path="info" element={<Info />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
          <Route path="ratings" element={<RatingList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart-payment" element={<Payment />} />
        </Route>
        {userToken &&
        Object.keys(currentUser).length !== 0 &&
        permission.DashboardPermission.includes(currentUser.role.name) ? (
          <Route path="/admin" element={<DashboardLayout />}>
            {permission.orderPermission.includes(currentUser.role.name) && (
              <Route path="order" element={<OrderManager />} />
            )}
            {permission.foodPermission.includes(currentUser.role.name) && (
              <>
                <Route path="meal" element={<MealManager />} />
                <Route path="nutrient" element={<NutrientManager />} />
              </>
            )}
            {permission.ManagerPermission.includes(currentUser.role.name) && (
              <>
                <Route path="faq" element={<FaqManager />} />
              </>
            )}
            {permission.adminPermission.includes(currentUser.role.name) && (
              <Route path="user" element={<UserManager />} />
            )}
            <Route path="*" element={<Page404 />} />
          </Route>
        ) : (
          ""
        )}
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
