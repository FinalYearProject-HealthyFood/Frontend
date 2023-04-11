import { Box, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import React from "react";
import Logo from "../Logo";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

const Header = () => {
    return (
        <VStack spacing={0} >
            <TopHeader/>
            <BottomHeader/>
        </VStack>
    )
}

export default Header