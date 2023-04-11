import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import LogoHealthy from "../../assets/Logo.png"

const Logo = () => {
    return(
        <Box w={"200px"}>
            <Image src = {LogoHealthy} alt="Logo"/>
        </Box>
    )
}

export default Logo