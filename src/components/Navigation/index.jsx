import React from "react";
import { Box, Flex, Text, Button, Spacer, HStack, Stack, Divider, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Navigation = () => {
    return (
        <Stack
            alignItems="center"
            my={4}
            boxShadow={"xl"}
            mb={10}
        >
            <HStack spacing={8}>
                <Link to="/home">
                    <Button
                        variant="ghost"
                    >
                        Home
                    </Button>
                </Link>
                <Divider orientation="vertical" height="30px" mx={4} />
                <Menu isLazy>
                    <MenuButton
                        fontWeight={"medium"}
                    >
                        Menu
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            fontWeight={"medium"}
                        >
                            <Link to="/meal">
                                Chọn khẩu phần ăn
                            </Link>
                        </MenuItem>
                        <MenuItem
                            fontWeight={"medium"}
                        >
                            <Link to="/nutrient">
                                Tự chọn khẩu phần ăn
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Divider orientation="vertical" height="30px" mx={4} />
                <Link to="/tdde-calculator">
                    <Button
                        variant="ghost"
                    >
                        TDDE Calculator
                    </Button>
                </Link>
                <Divider orientation="vertical" height="30px" mx={4} />
                <Link to="/faq">
                    <Button
                        variant="ghost"
                    >
                        FAQ
                    </Button>
                </Link>
                <Divider orientation="vertical" height="30px" mx={4} />
                <Link to="/contact">
                    <Button
                        variant="ghost"
                    >
                        Contact
                    </Button>
                </Link>
            </HStack>
        </Stack>
    )
}

export default Navigation