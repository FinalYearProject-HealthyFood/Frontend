import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Stack,
  Input,
  TableContainer,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUser, FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdMoney } from "react-icons/md";
import { GiMeal, GiMeat } from "react-icons/gi";
import axios from "axios";
import { api } from "../../../api";
import Pagination from "react-js-pagination";
import "./pagination.css";
import EditUserModal from "./EditUserModal";
import { useDashboardActionContext } from "../../../contexts/DashboardActionContextProvider";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserManager = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { onEdit, setOnEdit } = useDashboardActionContext();
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
  useEffect(() => {
    let timer;
    const fetchData = () => {
      axios
        .get(`${api}/users/?page=${currentPage}`, {
          params: {
            search: search,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.data);
          console.log(users);
          setTotalPage(response.data.total);
        });
      axios.get(`${api}/roles`).then((response) => {
        setRoles(response.data);
      });
    };
    const delayedFetchData = () => {
      clearTimeout(timer);
      timer = setTimeout(fetchData, 500); // Adjust the delay as needed (in milliseconds)
    };

    delayedFetchData();

    return () => {
      clearTimeout(timer);
    };
  }, [currentPage, onEdit, search]);
  const getData = (pageNumber = 1) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const deleteAccount = (id) => {
    axios
      .delete(`${api}/users/delete/${id}`)
      .then((res) => {
        showToast("Success!", "success", "Xóa tài khoản thành công!");
        setOnEdit(onEdit + 1);
      })
      .catch((error) => {
        showToast("Error!", "error", "Lỗi xảy ra khi xóa tài khoản!");
      });
  };

  return (
    <Stack>
      <VStack mb={"50px"}>
        <Box>
          <Heading fontSize={"2xl"} color={"brand.800"}>
            Quản lý User
          </Heading>
        </Box>
        <Divider bgColor="gray" h={"1px"} />
        <Flex mt="2%" mb="3%" w="100%" h="9%" justifyContent={"center"}>
          <InputGroup size="md" w="90%" h="100%">
            <InputLeftElement>
              <BsSearch />
            </InputLeftElement>
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              border="2px"
              focusBorderColor="none"
              type="text"
              placeholder="Tìm kiếm user..."
            />
          </InputGroup>
        </Flex>

        {/* =================> Add button */}

        <Flex w={"90%"} justifyContent={"right"}>
          <AddUserModal roles = {roles} />
        </Flex>
        {/* =================> Add button */}
        <TableContainer w={"90%"}>
          <Table variant={"striped"}>
            <Thead bgColor={"#1F1D36"}>
              <Tr>
                <Th textAlign={"center"} color={"white"}>
                  STT
                </Th>
                <Th textAlign={"center"} color={"white"}>
                  Tên user
                </Th>
                <Th textAlign={"center"} color={"white"}>
                  email
                </Th>
                <Th textAlign={"center"} color={"white"}>
                  email đã kích hoạt
                </Th>
                <Th textAlign={"center"} color={"white"}>
                  role
                </Th>
                <Th textAlign={"center"} color={"white"}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {users?.map((data, index) => {
                return (
                  <Tr>
                    <Td textAlign={"center"}>
                      {index + 1 + 5 * (currentPage - 1)}
                    </Td>
                    <Td textAlign={"center"}>{data.name}</Td>
                    <Td textAlign={"center"}>{data.email}</Td>
                    <Td
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      color={data.email_verified_at ? "brand.500" : "red"}
                    >
                      {data.email_verified_at
                        ? "Đã kích hoạt"
                        : "Chưa kích hoạt"}
                    </Td>
                    <Td
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      color={data.email_verified_at ? "brand.500" : "red"}
                    >
                      {data.role.name}
                    </Td>
                    <Td textAlign={"center"}>
                      <Stack alignItems={"center"}>
                        <Flex alignItems={"center"}>
                          {/* <Button mr={2} colorScheme="blue">
                            <Icon as={ViewIcon} />
                          </Button> */}
                          <Stack>
                            <EditUserModal user={data} roles = {roles} />
                            <DeleteUserModal data={data} />
                          </Stack>
                        </Flex>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex w={"90%"} justifyContent={"center"}>
          {totalPage > 5 ? (
            <Pagination
              hideDisabled
              activePage={currentPage}
              totalItemsCount={totalPage}
              itemsCountPerPage={5}
              itemClass="page-item"
              linkClass="page-link"
              itemClassNext="next-item"
              itemClassPrev="prev-item"
              innerClass="container"
              linkClassFirst="first-link"
              linkClassLast="last-link"
              activeClass="paginationActive"
              activeLinkClass="linkActive"
              disabledClass="disable"
              onChange={(pageNumber) => getData(pageNumber)}
            />
          ) : (
            ""
          )}
        </Flex>
      </VStack>
    </Stack>
  );
};

export default UserManager;
