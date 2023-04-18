import { Button, Divider, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GuestOption = () => {
    const navigate = useNavigate()
    return (
        <Stack h={"25px"} direction={"row"}>
            <Button px={2}
                h={"25px"}
                colorScheme="brand"
                variant={"ghost"}
                onClick={
                    () => {
                        navigate("/login")
                    }
                }
            >
                <Text>Login</Text>
            </Button>
            <Divider border={"1px"} borderColor={"gray.400"} orientation='vertical' />
            <Button
                h={"25px"}
                colorScheme="brand"
                variant={"ghost"}
                onClick={
                    () => {
                        navigate("/signup")
                    }
                }
            >
                <Text>Signup</Text>
            </Button>
        </Stack>
    )
}

export default GuestOption