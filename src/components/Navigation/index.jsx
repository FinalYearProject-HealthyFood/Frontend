import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  HStack,
  Stack,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Stack alignItems="center" mt={4} boxShadow={"xl"} mb={5}>
      <HStack spacing={8}>
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Divider orientation="vertical" height="30px" mx={4} />
        <Box>
          <Menu isLazy>
            <MenuButton fontWeight={"medium"}>Menu</MenuButton>
            <MenuList>
              <MenuItem fontWeight={"medium"}>
                <Link to="/meal">Chọn khẩu phần ăn</Link>
              </MenuItem>
              <MenuItem fontWeight={"medium"}>
                <Link to="/nutrient">Tự chọn khẩu phần ăn</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Divider orientation="vertical" height="30px" mx={4} />
        <Link to="/tdee-calculator">
          <Button variant="ghost">TDEE Calculator</Button>
        </Link>
        <Divider orientation="vertical" height="30px" mx={4} />
        <Link to="/faq">
          <Button variant="ghost">FAQ</Button>
        </Link>
        <Divider orientation="vertical" height="30px" mx={4} />
        <Link to="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
      </HStack>
    </Stack>
  );
};

export default Navigation;
