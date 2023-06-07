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
  Icon,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import axiosClient from "../../../../axios";
import { useState } from "react";
import { InfoIcon } from "@chakra-ui/icons";

const Info = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [edit, setEdit] = useState(false);
  const [verify, setVerify] = useState("false");
  const toast = useToast();

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
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      //   setCurrentUser(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setAge(data.age);
      setWeight(data.weight);
      setHeight(data.height);
      setGender(data.gender);
      setVerify(data.email_verified_at);
      //   console.log(!edit);
    });
  }, []);
  const resendVeriyLink = () => {
    showToast("Warning!", "warning", "Đang gửi link xác thực. Vui lòng chờ đợi.");
    axiosClient.post("email/verify/resend").then(data => {
      showToast("Success!", "success", "Gửi link xác thực thành công. Vui lòng check email của bạn.");
    })
    .catch(error => {
      console.log(error);
      showToast("Error!", "error", "Lỗi gửi link xác thực.");
    })
  }
  const getInfo = () => {
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setAge(data.age);
      setWeight(data.weight);
      setHeight(data.height);
      setGender(data.gender);
      //   console.log(!edit);
    });
  };
  const onSave = () => {
    const updateProfile = {
      name: name,
      email: email,
      age: age,
      weight: weight,
      height: height,
      gender: gender,
      address: address,
      phone: phone,
    };
    axiosClient
      .post("/profile/update", updateProfile)
      .then((data) => {
        showToast(
          "Success!",
          "success",
          "cập nhật thông tin tài khoản thành công!"
        );
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          finalErrors.map((error) => {
            showToast("Error!", "error", error);
          });
        }
        console.error(error);
      });
  };
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
        <Stack spacing={0} mb={5} alignItems={"center"}>
          <Heading color={"brand.300"} fontSize={"2xl"}>
            Thông tin tài khoản
          </Heading>
          {(verify == "" || verify == null) && (
            <Flex>
              <Text color={"red"} fontSize={"xs"}>
                <Icon as={InfoIcon} /> Bạn chưa xác thực email. Làm ơn hãy xác
                thực email của bạn.
              </Text>
              <Button
                cursor={"pointer"}
                as="u"
                fontSize={"xs"}
                colorScheme="red"
                variant="link"
                onClick={resendVeriyLink}
              >
                Gửi lại
              </Button>
            </Flex>
          )}
        </Stack>
        <Flex w={"100%"} px={"20%"}>
          <Spacer />
          <Center gap={2}>
            <Text color={"blue.500"} fontWeight={"bold"} fontSize={"lg"}>
              Edit
            </Text>
            <Switch
              onChange={(e) => {
                setEdit(e.target.checked);
                getInfo();
              }}
              defaultChecked={edit}
            />
          </Center>
        </Flex>
        <Grid templateColumns={"repeat(5, 1fr)"}>
          <GridItem colStart={2} colSpan={1}>
            <Text color={"gray.500"} fontWeight={"medium"}>
              Tên tài khoản
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Email
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Số điện thoại
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Địa chỉ
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Input
              fontSize={"md"}
              mt={1}
              size={"xs"}
              value={name ?? ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
              readOnly={!edit}
            />
            <Input
              fontSize={"md"}
              type="email"
              mt={1}
              size={"xs"}
              value={email ?? ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              readOnly={true}
            />
            <Input
              fontSize={"md"}
              type="number"
              mt={1}
              size={"xs"}
              value={phone ?? ""}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              readOnly={!edit}
            />
            <Input
              fontSize={"md"}
              mt={1}
              size={"xs"}
              value={address ?? ""}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              readOnly={!edit}
            />
          </GridItem>
        </Grid>
        <Divider py={5} borderColor={"brand"} />
        <Text py={2} color={"brand.400"} fontWeight={"medium"}>
          Thông tin sức khỏe
        </Text>
        <Grid pb={5} gap={15} templateColumns={"repeat(4, 1fr)"}>
          <GridItem colSpan={2}>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Tuổi
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Cân nặng (kg)
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Chiều cao (cm)
            </Text>
            <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
              Giới tính
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex direction={"column"}>
              <Input
                fontSize={"md"}
                w={"50px"}
                type="number"
                mt={1}
                size={"xs"}
                value={age ?? ""}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                readOnly={!edit}
              />
              <Input
                fontSize={"md"}
                w={"50px"}
                type="number"
                mt={1}
                size={"xs"}
                value={weight ?? ""}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                readOnly={!edit}
              />
              <Input
                fontSize={"md"}
                w={"50px"}
                type="number"
                mt={1}
                size={"xs"}
                value={height ?? ""}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                readOnly={!edit}
              />
              <RadioGroup
                mt={2}
                size={"sm"}
                onChange={setGender}
                value={gender}
                isDisabled={!edit}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="male">
                    Nam
                  </Radio>
                  <Radio colorScheme="green" value="female">
                    Nữ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
      {edit ? (
        <HStack justifyContent={"center"} p={5}>
          <Button colorScheme="brand" boxShadow={"lg"} onClick={onSave}>
            Lưu thay đổi
          </Button>
          {/* <Button colorScheme="red" boxShadow={"lg"}
            onClick={() => {
                setEdit(false);
            }}
        >
          Hủy
        </Button> */}
        </HStack>
      ) : (
        ""
      )}
    </>
  );
};

export default Info;
