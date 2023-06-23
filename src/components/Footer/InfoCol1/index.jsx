import React from "react";
import { Box, Center, Flex, HStack, Heading, Spacer, Stack, Text, VStack } from "@chakra-ui/react";

const InfoCol1 = () => {
    return (
        <Stack
            fontSize="sm" color="white"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            w={"300px"}
        >
            <Text>
                HEALTHY FOOD STORE
            </Text>
            <Text>
                123 Thanh Khe District, Da Nang City
            </Text>
            <Text>
                Tel: +84 234 56789
            </Text>
            <Text>
                Hotline: +84 (0) 909 123 456
            </Text>
            <Text>
                danang@healthyfoodstore.site
            </Text>
            <Text>
                Vietnam
            </Text>
            <Text>
                Certificate of business registration : 0303030303
            </Text>
            <Text>
                Issued: 09/06/2023 in Da Nang City
            </Text>
        </Stack>
    )
}

export default InfoCol1