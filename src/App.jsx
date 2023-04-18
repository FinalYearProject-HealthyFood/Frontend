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

function App() {
  return (
    <Box scrollBehavior={"smooth"}>
      <ScrollToTop/>
      <ScrollTopButton/>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="meal" element={<Meal />} />
          <Route path="nutrient" element={<Nutrient />} />
          <Route path="tdde-calculator" element={<Tdde />} />
          <Route path="faq" element={""} />
          <Route path="contact" element={""} />
          <Route path="profile" element={""} />
          <Route path="changepassword" element={""} />
          <Route path="order-history" element={""} />
        </Route>
        <Route path="/admin" element={""}>
          <Route path="order" element={""} />
          <Route path="meal" element={""} />
          <Route path="nutrient" element={""} />
          <Route path="user" element={""} />
        </Route>
        <Route path="/">
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
