import React from "react";
import { Box, Center, Flex, HStack, Heading, Image, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import Certificate from "../../../assets/Certificate.png"

const InfoCol3 = () => {
    return (
        <Stack
            fontSize="sm" color="white"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            w={"300px"}
        >
            <Box 
                w="150px"
                bg={"certificate.500"}
                borderRadius={"25px"}
                p={3}
            >
                <Image src={Certificate} alt="certificate"/>
            </Box>
        </Stack>
    )
}

export default InfoCol3