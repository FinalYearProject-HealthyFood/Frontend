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
  Select,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";

const EditUserModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(props.user?.name);
  const [email, setEmail] = useState(props.user?.email);
  const [phone, setPhone] = useState(props.user?.phone);
  const [address, setAddress] = useState(props.user?.address);
  const [age, setAge] = useState(props.user?.age);
  const [weight, setWeight] = useState(props.user?.weight);
  const [height, setHeight] = useState(props.user?.height);
  const [gender, setGender] = useState(props.user?.gender);
  const [count, setCount] = useState(0);
  const [verify, setVerify] = useState(
    props.user?.email_verified_at ? "yes" : "no"
  );
  const [roles, setRoles] = useState(props.roles);
  const [userRoles, setUserRoles] = useState(props.user?.role.id);
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

  useEffect(() => {
    console.log(props.data);
    setName(props.user?.name);
    setEmail(props.user.email);
    setPhone(props.user.phone);
    setAddress(props.user.address);
    setAge(props.user.age);
    setWeight(props.user.weight);
    setHeight(props.user.height);
    setGender(props.user.gender);
    setVerify(props.user?.email_verified_at ? "yes" : "no");
    setUserRoles(props.user?.role.id);
    setRoles(props.roles);
  }, [props.user, onEdit, count]);

  const submit = () => {
    const data = {
      id: props.user.id,
      name: name,
      email: email,
      age: age,
      weight: weight,
      height: height,
      gender: gender,
      address: address,
      phone: phone,
      verify: verify,
      role: userRoles,
    };
    axios
      .post(`${api}/users/update-by-manager`, data)
      .then((res) => {
        showToast("Success!", "success", "Chỉnh sửa thông tin user thành công");
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (email == "") {
          showToast(
            "Error!",
            "error",
            "Email không được bỏ trống và phải bào gồm ký tự @."
          );
        } else if (name == "") {
          showToast("Error!", "error", "Tên không được bỏ trống.");
        } else {
          showToast("Error!", "error", "Lỗi xảy ra khi chỉnh sửa thông tin");
        }
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCount(count + 1);
        }}
        colorScheme="yellow"
      >
        <Icon as={EditIcon} />
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
                  <Text color={"gray.500"} fontWeight={"medium"} mt={1}>
                    Role
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
                    <Select
                      mt={2}
                      value={userRoles}
                      size={"sm"}
                      w={"200px"}
                      onChange={(e) => {
                        setUserRoles(e.target.value);
                      }}
                    >
                      {roles.map((data, index) => {
                        return(

                          <option value={data.id}>{data.name}</option>
                          )
                      })}
                    </Select>
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

export default EditUserModal;
