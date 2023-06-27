import React from "react";
import { Box, Center, Heading, Image } from "@chakra-ui/react";
import LogoHealthy from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      w={"200px"}
      textAlign={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      onClick={() => {
        navigate("/");
      }}
    >
      <Center>
        <Image src={LogoHealthy} alt="Logo" />
      </Center>
      <Heading
        color={"brand.500"}
        fontFamily={"cursive"}
        fontSize={{ base: "xl" }}
      >
        Heathy Food Store
      </Heading>
    </Box>
  );
};

export default Logo;
