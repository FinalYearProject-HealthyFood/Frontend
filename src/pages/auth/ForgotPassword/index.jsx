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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import { InfoIcon } from "@chakra-ui/icons";
import LogoHealthy from "../../../assets/Logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .post("/forgot-password", {
        email: email,
      })
      .then(({ data }) => {
        showToast(
          "Success!",
          "success",
          "Gửi mã PIN thành công. Vui lòng check email của bạn!"
        );
        setLoading(false);
        navigate("/reset-password", {
          state: email,
        });
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          // finalErrors.map((error) => {
          //   showToast("Error!", "error", error);
          // });
          showToastError("Error!", "error", finalErrors);
        }
        // console.log(error.response.data.errors);
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
          <Box align={"center"} spacing="1" my={"20px"}>
            <Center boxSize={"200px"}>
              <Image src={LogoHealthy} alt="Logo" />
            </Center>
            <Box align={"left"}>
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
              Khôi phục mật khẩu
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
                    type="email"
                    variant="flushed"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="brand"
                  isLoading={loading}
                  type="submit"
                >
                  Gửi mã PIN
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
