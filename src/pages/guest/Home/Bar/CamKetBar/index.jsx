import React from "react";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";


const CamKetBar = () => {
    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            direction={"row"}
            spacing={0}
            mb={"50px"}
        >
            <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
            <Box
                as={"button"}
                borderRadius={"sm"}
                borderWidth={"1px"}
                borderColor={"brand.400"}
                pointerEvents={"none"}
                w={"200px"}
                fontWeight={"medium"}
            >
                <Text
                    color={"brand.400"}
                    shadow={"lg"}
                    fontSize={"xl"}
                >
                    Cam kết
                </Text>
            </Box>
            <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
        </Stack>
    )
}

export default CamKetBar;