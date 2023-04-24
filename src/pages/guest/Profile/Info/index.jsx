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
  //   const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

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
      //   console.log(!edit);
    });
  }, []);
  const getInfo = () => {
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
      //   console.log(!edit);
    });
  };
  const onSave = () => {

  }
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
        <Box mb={5}>
          <Heading color={"brand.300"} fontSize={"2xl"}>
            Thông tin tài khoản
          </Heading>
        </Box>
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
              readOnly={!edit}
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
                  <Radio colorScheme="green" value="1">
                    Nam
                  </Radio>
                  <Radio colorScheme="green" value="2">
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
          <Button colorScheme="brand" boxShadow={"lg"}
            onClick={onSave}
          >
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
