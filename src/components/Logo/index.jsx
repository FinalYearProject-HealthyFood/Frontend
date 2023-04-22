import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import LogoHealthy from "../../assets/Logo.png";

const Logo = () => {
  return (
    <Box
      w={"200px"}
      cursor={"pointer"}
      onClick={() => {
        navigate("/");
      }}
    >
      {/* <Image src={LogoHealthy} alt="Logo" /> */}
      <Heading color={"brand.500"} fontFamily={"cursive"} fontSize={{base: "xl"}} >
        Heathy Food Store
      </Heading>
    </Box>
  );
};

export default Logo;
