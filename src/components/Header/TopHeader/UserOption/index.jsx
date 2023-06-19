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
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../../axios";
import { useStateContext } from "../../../../contexts/ContextProvider";

const UserOption = () => {
  const navigate =useNavigate();
  const permission = {
    adminPermission: ["admin"],
    ManagerPermission: ["admin", "manager"],
    foodPermission: ["admin", "foodmod", "manager"],
    orderPermission: ["admin", "ordermod", "foodmod", "manager"],
    DashboardPermission: ["admin", "ordermod", "foodmod", "manager"],
  };
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      navigate("/")
    });
  };
  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);
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
            <Link to="/profile/info">Thông tin tài khoản</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile/change-password">Đổi mật khẩu</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile/order-history">Lịch sử đặt hàng</Link>
          </MenuItem>
          {userToken &&
          Object.keys(currentUser).length !== 0 &&
          permission.DashboardPermission.includes(currentUser.role.name) ? (
            <MenuItem>
              <Link to="/admin/order">Manager</Link>
            </MenuItem>
          ) : (
            ""
          )}
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
