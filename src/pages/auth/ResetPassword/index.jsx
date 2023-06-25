import {
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import { InfoIcon } from "@chakra-ui/icons";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState(location?.state);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ __html: "" });
  const toast = useToast();
  useEffect(()=> {
    if(userToken) {
      navigate("/")
    }
  },[])
  const showToast = (title, status, description) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2500,
      isClosable: true,
      position: "top-right",
      variant: "left-accent",
    });
  };

  const showToastError = (title, status, description) => {
    toast({
      render: ({ onClose }) => (
        <Box
          borderLeft={"2px"}
          borderLeftColor={"red.500"}
          p={4}
          bg="red.100"
          rounded="md"
          shadow="md"
        >
          <CloseButton
            position="absolute"
            right={2}
            top={2}
            onClick={onClose}
          />
          <Text justifyItems={"center"} fontWeight="bold" fontSize="lg" mb={2}>
            <Icon color={"red.500"} as={InfoIcon} /> {title}
          </Text>
          {description.map((item, index) => (
            <Text>{item}</Text>
          ))}
        </Box>
      ),
      duration: 5000,
      isClosable: true,
      position: "top-right",
      isMultiline: true,
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    setLoading(true);
    showToast("Warning!", "warning", "Đang xử lý!");
    axiosClient
      .post("/reset-password", {
        email: email,
        pin: pin,
        password: password,
        password_confirmation: password2,
      })
      .then(({ data }) => {
        showToast("Success!", "success", "Khôi phục mật khẩu thành công!");
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          showToastError("Error!", "error", finalErrors);
        }
        setLoading(false);
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
              Đặt lại mật khẩu
            </Heading>
          </Center>
          <HStack spacing="1" justify="center">
            <Text color="muted">Đã có tài khoản?</Text>
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
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
              <Stack spacing={5} w={""}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                  readOnly
                    type="email"
                    variant="flushed"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mã PIN</FormLabel>
                  <HStack>
                    <PinInput
                      value={pin}
                      onChange={(e) => {
                        setPin(e);
                      }}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => {
                    showToast("Warning!", "warning", "Đang xử lý!");
                    axiosClient
                      .post("/forgot-password", {
                        email: email,
                      })
                      .then(({ data }) => {
                        showToast(
                          "Success!",
                          "success",
                          "Gửi mã PIN thành công. Vui lòng check email của bạn!"
                        );
                      })
                      .catch((error) => {
                        if (error.response) {
                          const finalErrors = Object.values(
                            error.response.data.errors
                          ).reduce((accum, next) => [...accum, ...next], []);
                          showToastError("Error!", "error", finalErrors);
                        }
                      });
                  }}
                >
                  Gửi lại
                </Button>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    variant="flushed"
                    placeholder="password"
                    value={password}
                    name="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    type="password"
                    variant="flushed"
                    placeholder="password"
                    name="password_confirmation"
                    value={password2}
                    onChange={(ev) => setPassword2(ev.target.value)}
                  />
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="brand"
                  isLoading={loading}
                  type="submit"
                >
                  Đặt lại
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
