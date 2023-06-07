import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Stack,
  Text,
  Input,
  Box,
  Divider,
  Grid,
  GridItem,
  Flex,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";
import { FaUser } from "react-icons/fa";

const AddUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [verify, setVerify] = useState("no");
  const toast = useToast();
  const { onEdit, setOnEdit } = useDashboardActionContext();

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

  const submit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      age: age,
      weight: weight,
      height: height,
      gender: gender,
      address: address,
      phone: phone,
      verify: verify,
    };
    axios
      .post(`${api}/users/store`, data)
      .then((res) => {
        showToast("Success!", "success", "Tạo tài khoản thành công");
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (password == null) {
          showToast("Error!", "error", "Mật khẩu không được rỗng");
        } else if (email == "") {
          showToast(
            "Error!",
            "error",
            "Email không được bỏ trống và phải bào gồm ký tự @."
          );
        } else if (name == "") {
          showToast("Error!", "error", "Tên không được bỏ trống.");
        } else {
          showToast("Error!", "error", "Lỗi xảy ra khi Tạo tài khoản.");
        }
      });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="brand">
        <Icon boxSize={"24px"} as={FaUser} />
        <Icon ml={2} as={AddIcon} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Tên
                </Text>
                <Input
                  fontSize={"md"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Email
                </Text>
                <Input
                  fontSize={"md"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  password
                </Text>
                <Input
                  fontSize={"md"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Số điện thoại
                </Text>
                <Input
                  fontSize={"md"}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Địa chỉ
                </Text>
                <Input
                  fontSize={"md"}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Box>
            </Stack>
            <Divider mt={5} borderColor={"black"} borderWidth={1} />
            <Stack mt={2} alignItems={"center"}>
              <Text fontWeight={"medium"} fontSize={"lg"}>
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
                  <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
                    Email verify
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
                    />
                    <RadioGroup
                      mt={2}
                      size={"sm"}
                      onChange={setGender}
                      value={gender}
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
                    <RadioGroup
                      mt={2}
                      size={"sm"}
                      onChange={setVerify}
                      value={verify}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="green" value="yes">
                          Yes
                        </Radio>
                        <Radio colorScheme="green" value="no">
                          No
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                </GridItem>
              </Grid>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => {
                submit();
              }}
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
