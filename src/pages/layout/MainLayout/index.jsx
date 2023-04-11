import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import TheThanks from "../../../components/TheThanks";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Navigation />
            <Outlet />
            <TheThanks />
            <Footer />
        </>
    )
}

export default MainLayout;