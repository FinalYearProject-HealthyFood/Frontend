import React from "react";
import { Box, Center, Flex, HStack, Heading, Image, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import CertificateBCT from "../../../assets/Certificate BCT.png"

const InfoCol2 = () => {
    return (
        <Stack
            fontSize="sm" color="white"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            w={"300px"}
        >
            <Text>
                Privacy and Data Protection
            </Text>
            <Text>
                Terms and conditions of use
            </Text>
            <Text>
                Delivery  & Return Policy
            </Text>
            <Text>
                Secure Payment
            </Text>
            <Text>
                FAQ
            </Text>
            <Text>
                Contact us
            </Text>
            <Box 
                w="150px"
            >
                <Image src={CertificateBCT} alt="certificate"/>
            </Box>
        </Stack>
    )
}

export default InfoCol2