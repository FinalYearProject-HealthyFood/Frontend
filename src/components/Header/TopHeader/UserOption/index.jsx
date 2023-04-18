import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Stack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios";
import { useStateContext } from "../../../../contexts/ContextProvider";

const UserOption = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
    });
  };
  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])
  return (
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
            <Link to="/profile">Thông tin tài khoản</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/order-history">Lịch sử mua hàng</Link>
          </MenuItem>
        </MenuList>
      </Menu>

      <Divider border={"1px"} borderColor={"gray.400"} orientation="vertical" />
      <Box as={"button"} onClick={(ev) => logout(ev)}>
        <Flex>
          <Icon h={"25px"} color="brand.500" as={IoLogOut} />
          <Text px={2}>Logout</Text>
        </Flex>
      </Box>
    </Stack>
  );
};

export default UserOption;
