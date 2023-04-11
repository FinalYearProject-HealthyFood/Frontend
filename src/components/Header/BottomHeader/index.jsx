import { Badge, Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import React from "react";
import Logo from "../../Logo";
import { FaShoppingCart, FaHeart } from "react-icons/fa"

const BottomHeader = () => {
    return (
        <Stack p={5}
            direction="row"
            w="100%"
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Spacer />
            <Logo />
            <Spacer />
            <Box w="42%" >
                <InputGroup>
                    <InputLeftElement width={"2.5rem"}>
                        <SearchIcon
                            color={"gray.600"}
                        />
                    </InputLeftElement>
                    <Input
                        placeholder="Tìm kiếm khẩu phần ăn (ví dụ: cơm, gà, trứng, ...)"
                        type="search"
                        variant={"filled"}
                        borderRadius={"3xl"}
                        color={"green"}
                        boxShadow={"lg"}

                    />
                    <InputRightElement width={"6rem"}>
                        <Button
                            colorScheme={"brand"}
                            aria-label='Search database'
                            size={"sm"}
                            borderRadius={"full"}
                        >
                            Tìm kiếm
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Spacer />

            <Button
                variant="solid"
                colorScheme="brand"
                size="md"
                leftIcon={<FaHeart />}
                boxShadow={"md"}
            >
                Yêu thích
            </Button>
            <Button
                variant="solid"
                colorScheme="brand"
                size="md"
                leftIcon={<FaShoppingCart />}
                boxShadow={"md"}
            >
                Giỏ hàng
                <Box
                    fontSize='1em'
                    p={2}
                    boxSize={"2em"}
                    bg="red.500"
                    position="absolute"
                    top="-15px"
                    right="-10px"
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"full"}
                    boxShadow={"dark-lg"}
                >
                    <Text fontSize='1em'>
                        {15}
                    </Text>
                </Box>
            </Button>
            <Spacer />

        </Stack>
    )
}

export default BottomHeader