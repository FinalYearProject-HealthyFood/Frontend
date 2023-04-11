import React from "react";
import { Box, Divider, Flex, HStack, Heading, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import InfoCol1 from "./InfoCol1";
import InfoCol2 from "./InfoCol2";
import InfoCol3 from "./InfoCol3";
import FacebookIcon from "../../assets/Facebook icon.png"
import InstagramIcon from "../../assets/Instagram icon.png"

const Footer = () => {
    return (
        <VStack
            as="footer"
            bottom={0}
            left={0}
            right={0}
            alignItems="center"
            justifyContent="center"
            bg={"footer.500"}
            py={"10px"}
        >
            <HStack
                w={"100%"}
                px={"10%"}
                pb={"10px"}
            >
                <Heading
                    fontSize="2xl" color="white"
                >
                    Follow us on social network
                </Heading>
                <Spacer />
                <HStack spacing={"10px"}>
                    <Box
                        boxSize={"45px"}
                        bg={"footer.100"}
                        borderRadius={"10px"}
                        p={1}
                    >
                        <Image src={FacebookIcon} alt="facebook" />
                    </Box>
                    <Box
                        boxSize={"45px"}
                        bg={"footer.100"}
                        borderRadius={"10px"}
                        p={1}
                    >
                        <Image src={InstagramIcon} alt="instagram" />
                    </Box>
                </HStack>
            </HStack>
            <Divider />
            <Box >
                <Heading fontSize="2xl" color="white">
                    STORE INFORMATION
                </Heading>
            </Box>
            <HStack
            >
                <InfoCol1 />
                <Spacer />
                <InfoCol2 />
                <Spacer />
                <InfoCol3 />
            </HStack>
            <Divider />
            <Box
            >
                <Text fontSize="sm" color="white">
                    © 2023 - Healthy Food Store
                </Text>
            </Box>
        </VStack>
    )
}

export default Footer