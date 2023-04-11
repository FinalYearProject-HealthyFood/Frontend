import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Icon, Stack, Text, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import { Link } from "react-router-dom";

const UserOption = () => {
    return (
        <Stack h={"25px"} direction={"row"}>
            <Menu isLazy>
                <MenuButton>
                    <Flex>
                        <Icon
                            h={"25px"}
                            color="brand.500"
                            as={FaUser}
                        />
                        <Text px={2}>User Name</Text>
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Link to="/profile">
                            Thông tin tài khoản
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/changepassword">
                            Đổi mật khẩu
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/order-history">
                            Lịch sử mua hàng
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>

            <Divider border={"1px"} borderColor={"gray.400"} orientation='vertical' />
            <Box
                as={"button"}
            >
                <Flex>
                    <Icon
                        h={"25px"}
                        color="brand.500"
                        as={IoLogOut}
                    />
                    <Text px={2}>Logout</Text>
                </Flex>
            </Box>
        </Stack>
    )
}

export default UserOption