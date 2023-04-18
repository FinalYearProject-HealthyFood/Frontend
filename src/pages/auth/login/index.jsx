import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../public/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setUserToken } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  const toast = useToast()

  const showToast = (title, status, description) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2500,
      isClosable: true,
      position: "top-right",
      variant: "left-accent"
    });
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        showToast("Success!", "success", "Đăng nhập thành công!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          finalErrors.map((error) => {
            showToast("Error!", "error", error);
          })
        }
        console.error(error);
      });
  };
  return (
    <Box w={"100%"} h={"100%"} position={"fixed"}>
      <Box
        left={"50%px"}
        position={"fixed"}
        w={"50%"}
        h={"100%"}
        bgColor={"white"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Box>
          <Image
            src={Logo}
            cursor={"pointer"}
            onClick={() => {
              navigate("/");
            }}
          />
          <Box spacing="1" my={"20px"}>
            <Heading
              fontFamily={"cursive"}
              fontStyle={"italic"}
              fontSize={"2xl"}
            >
              Welcome
            </Heading>
            <Flex>
              <Heading
                fontFamily={"cursive"}
                fontStyle={"italic"}
                fontSize={"2xl"}
                mr={"10px"}
              >
                to
              </Heading>
              <Button
                fontFamily={"cursive"}
                color={"brand.500"}
                fontStyle={"italic"}
                fontSize={"2xl"}
                variant="link"
                cursor={"pointer"}
                onClick={() => {
                  navigate("/");
                }}
              >
                Healthy Food Store
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box
        left={"50%"}
        position={"relative"}
        w={"50%"}
        h={"100%"}
        bgColor={"gray.100"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        zIndex={10}
      >
        <Box
          position={"absolute"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Center mx="10">
            <Heading color={"brand.400"} size={"xl"}>
              Đăng nhập
            </Heading>
          </Center>
          <HStack spacing="1" justify="center">
            <Text color="muted">Chưa có tài khoản?</Text>
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Đăng ký
            </Button>
          </HStack>
          <Box
            mt={"15px"}
            px="10"
            py="5"
            boxShadow={"2xl"}
            borderRadius={"xl"}
            bgColor={"white"}
          >
            <form onSubmit={onSubmit}>
              <Stack spacing={5} w={"300px"}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    variant="flushed"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>password</FormLabel>
                  <Input
                    type="password"
                    variant="flushed"
                    placeholder="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="brand"
                  isLoading={false}
                  type="submit"
                >
                  Đăng nhập
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
