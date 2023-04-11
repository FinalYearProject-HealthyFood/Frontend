import { Box, Image, Stack } from "@chakra-ui/react";
import React from "react";
import TheThankPic from "../../assets/TheThanks.png"

const TheThanks = () => {
    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            p={10}
            mt={10}
        >
            <Box w={"60%"}>
                <Image src={TheThankPic} alt= "The Thanks"/>
            </Box>
        </Stack>
    )
}

export default TheThanks