import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <Container maxW={"80%"}>
        <Center my={10} >
            <Heading color={"brand.500"} fontSize={"4xl"} >
                Trang thông tin cá nhân
            </Heading>
        </Center>
      <Grid
        boxShadow={"2xl"}
        borderRadius={"xl"}
        mx={"15%"}
        templateColumns={"repeat(5, 1fr)"}
        bg={"gray.50"}
      >
        <GridItem colSpan={1}>
          <VStack
            borderLeftRadius={"xl"}
            py={5}
            bgColor={"white"}
            alignItems={"center"}
            boxShadow={"lg"}
          >
            <Box>
              <Button
                _hover={{
                  bg: "brand.200",
                  color: "white",
                }}
                color={"gray"}
                variant={"link"}
                p={5}
                onClick={() => {
                  navigate("/profile/info");
                }}
              >
                Thông tin tài khoản
              </Button>
            </Box>
            <Divider borderColor={"gray.300"} />
            <Box>
              <Button
                _hover={{
                  bg: "brand.200",
                  color: "white",
                }}
                color={"gray"}
                variant={"link"}
                p={5}
                onClick={() => {
                  navigate("/profile/change-password");
                }}
              >
                Thay đổi mật khẩu
              </Button>
            </Box>
            <Divider borderColor={"gray.300"} />
            <Box>
              <Button
                _hover={{
                  bg: "brand.200",
                  color: "white",
                }}
                color={"gray"}
                variant={"link"}
                p={5}
                onClick={() => {
                  navigate("/profile/order-history");
                }}
              >
                Lịch sử mua hàng
              </Button>
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={4}>
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Profile;
