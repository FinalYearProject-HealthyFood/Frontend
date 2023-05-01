import {
  Flex,
  HStack,
  Heading,
  VStack,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Stack,
  Text,
  Box,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaUser, FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdMoney } from "react-icons/md";
import { GiMeal, GiMeat } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import { HamburgerIcon } from "@chakra-ui/icons";

const DashboardLayout = () => {
  const navLinks = [
    { to: "order", icon: MdMoney, text: "Order" },
    { to: "meal", icon: GiMeal, text: "Xuất ăn" },
    { to: "nutrient", icon: GiMeat, text: "Thành phần ăn" },
    { to: "user", icon: FaUserCog, text: "User" },
  ];
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
    });
  };
  return (
    <>
      <HStack
        h="5%"
        padding="0.5%"
        pr="2.5%"
        position={"fixed"}
        left="20%"
        top="0"
        right="0"
        zIndex={10}
        w="80%"
        bgColor={"white"}
        boxShadow={"lg"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"}>
          <Icon as={HamburgerIcon} color={"gray"} ml={2} />
          <Button
            color={"gray"}
            fontFamily={"cursive"}
            fontSize={{ base: "md" }}
            ml={2}
            variant={"unstyled"}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
        </Flex>
        <Spacer />
        <Stack h={"25px"} direction={"row"}>
          <Menu isLazy>
            <MenuButton>
              <Flex>
                <Icon h={"25px"} color="brand.500" as={FaUser} />
                <Text px={2}>{currentUser.name}</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/profile/info">Thông tin tài khoản</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/profile/change-password">Đổi mật khẩu</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/profile/order-history">Lịch sử mua hàng</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin">Manager</Link>
              </MenuItem>
            </MenuList>
          </Menu>

          <Divider
            border={"1px"}
            borderColor={"gray.400"}
            orientation="vertical"
          />
          <Box as={"button"} onClick={(ev) => logout(ev)}>
            <Flex>
              <Icon h={"25px"} color="brand.500" as={IoLogOut} />
              <Text px={2}>Logout</Text>
            </Flex>
          </Box>
        </Stack>
      </HStack>
      <VStack
        w="20%"
        zIndex={100}
        position={"fixed"}
        top="0"
        left="0"
        bottom="0"
        bgColor={"white"}
        boxShadow={"lg"}
      >
        <Flex
          p={2}
          bgColor={"brand.900"}
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"5%"}
        >
          <Heading
            color={"white"}
            fontFamily={"cursive"}
            fontSize={{ base: "xl" }}
          >
            Heathy Food Store
          </Heading>
        </Flex>
        <Box w={"90%"}>
          <Text
            mt={"10%"}
            color={"black"}
            fontWeight={"medium"}
            fontSize={"lg"}
            ml={"7%"}
          >
            Menu
          </Text>
        </Box>
        <Divider mt={"2%"} />
        {navLinks.map((link) => (
          <Box w={"80%"} key={link.to}>
            <Flex
              as={NavLink}
              _activeLink={{
                bgColor: "brand.200",
                color: "white",
                fontWeight: "bold",
              }}
              to={link.to}
              py={5}
              borderRadius="lg"
              _hover={{
                bgColor: "brand.50",
                color: "white",
                transition: "all 0.2s ease-in-out",
              }}
              transition="all 0.2s ease-in-out"
              color={"black"}
              bgColor={"white"}
              alignItems="center"
            >
              <Icon as={link.icon} boxSize={"24px"} ml={"7%"} />
              <Text ml={"7%"}>{link.text}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
      <Box w="80%" ml="20%" mt="5%">
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
