import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import axiosClient from "../../../../axios";
import { useState } from "react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //   const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

  const onSave = () => {};
  return (
    <>
      <VStack
        boxShadow={"2xl"}
        borderRightRadius={"xl"}
        py={5}
        bgColor={"white"}
        alignItems={"center"}
        borderLeft={"1px"}
        borderColor={"gray.300"}
        borderBottomLeftRadius={"xl"}
      >
        <Box>
          <Heading color={"brand.300"} fontSize={"2xl"}>
            Thay đổi mật khẩu
          </Heading>
        </Box>
        <Box pt={"50px"}>
          <Grid templateColumns={"repeat(6, 1fr)"}>
            <GridItem colStart={2} colSpan={2}>
              <Box >
                <Text color={"gray.500"} fontSize={"md"} fontWeight={"medium"}>
                  Mật khẩu mới
                </Text>
              </Box>
              <Box mt={3}>
                <Text
                  color={"gray.500"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                  mt={4}
                >
                  Nhập lại mật khẩu
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Input
                fontSize={"md"}
                type="password"
                mt={1}
                size={"xs"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                fontSize={"md"}
                type="password"
                mt={4}
                size={"xs"}
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
            </GridItem>
          </Grid>
          <VStack pt={20}>
            <Box>
              <Button colorScheme="brand" py={5} px={10} onClick={onSave}>Lưu</Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default ChangePassword;
