import { Container } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Menu = () => {
    return (
        <Container maxW='60%' >
            <Outlet/>
        </Container>
    )
}

export default Menu