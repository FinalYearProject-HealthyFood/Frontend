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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import axiosClient from "../../../../axios";
import { useState } from "react";
import Pagination from "react-js-pagination";
import "./pagination.css";
import moment from "moment";
import axios from "axios";
import { api } from "../../../../api";
import { DeleteIcon } from "@chakra-ui/icons";
import ViewOrderModal from "./ViewOrderModal";
import { BsCart4 } from "react-icons/bs";

const OrderHistory = () => {
  const [changeList, setChangeList] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
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
    if (userToken) {
      axiosClient
        .post(`order-items/item-deliverd-by-user?page=${currentPage}`)
        .then((response) => {
          console.log(response.data.data);
          setTotalPage(response.data.total);
        });
      axios
        .get(`${api}/orders/by-user/${currentUser.id}/?page=${currentPage}`)
        .then((response) => {
          console.log(response.data);
          setOrders(response.data.data);
          setTotalPage(response.data.total);
        });
    }
  }, [currentPage, changeList]);

  const getData = (pageNumber = 1) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const deleteMeal = (id) => {
    axios
      .delete(`${api}/orders/delete-pending/${id}`)
      .then((res) => {
        showToast("Success!", "success", "Xóa thành đơn hàng công!");
        setChangeList(changeList + 1);
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
        } else {
          showToast("Error!", "error", "Lỗi xảy ra khi xóa đơn hàng!");
        }
      });
  };

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
            Lịch sử đặt hàng
          </Heading>
        </Box>
        <Stack alignItems={"center"} pt={"20px"}>
          {orders.length > 0 ? (
            <TableContainer
              borderLeftWidth={"1px"}
              borderRightWidth={"1px"}
              bgColor={"white"}
            >
              <Table size={"md"} variant="striped">
                <Thead bg={"brand.500"}>
                  <Tr>
                    <Th textColor={"white"}>No.</Th>
                    <Th textColor={"white"}>Order ID</Th>
                    <Th textColor={"white"}>Giá đơn vị</Th>
                    <Th textColor={"white"}>Ngày đặt</Th>
                    <Th textColor={"white"}>Tình trạng</Th>
                    <Th textColor={"white"}>Hình thức</Th>
                    <Th textColor={"white"}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders?.map((data, index) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"}>
                          {index + 1 + 5 * (currentPage - 1)}
                        </Td>
                        <Td textAlign={"center"}>{data.id}</Td>
                        <Td textAlign={"center"}>
                          {data.total_price?.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}{" "}
                          vnđ
                        </Td>
                        <Td textAlign={"center"}>
                          <Text>
                            {moment(data?.created_at).format("H:m, DD/MM/YYYY")}
                          </Text>
                        </Td>
                        <Td textAlign={"center"} fontWeight={"bold"}>
                          <Text
                            color={
                              data.status == "pending"
                                ? "orange"
                                : data.status == "accepted"
                                ? "green"
                                : data.status == "delivered"
                                ? "blue"
                                : "red"
                            }
                          >
                            {data.status == "pending"
                              ? "Đang xử lý"
                              : data.status == "accepted"
                              ? "Được chấp nhận"
                              : data.status == "delivered"
                              ? "Đã giao"
                              : "Bị hủy bỏ"}
                          </Text>
                          <Text color={"gray"} mt={1} fontSize={"xs"}>
                            {moment(data?.updated_at).format("H:m, DD/MM/YYYY")}
                          </Text>
                        </Td>
                        <Td textAlign={"center"} fontWeight={"bold"}>
                          <Text
                            color={
                              data.payment_mode == "paypal" ? "blue" : "green"
                            }
                          >
                            {data.payment_mode == "paypal"
                              ? "Đã thanh toán PayPal"
                              : "Thanh toán khi giao hàng"}
                          </Text>
                        </Td>
                        <Td textAlign={"center"}>
                          <Stack alignItems={"center"}>
                            <Flex alignItems={"center"}>
                              <ViewOrderModal data={data} />
                              <Stack>
                                <Button
                                  isDisabled={
                                    data.status == "pending" ? false : true
                                  }
                                  colorScheme="red"
                                  onClick={() => {
                                    deleteMeal(data.id);
                                  }}
                                >
                                  <Icon as={DeleteIcon} />
                                </Button>
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
          ) : (
            <Center h={"200px"} flexDirection={"column"}>
              <Icon mb={5} color={"orange"} boxSize={"100px"} as={BsCart4} />
              <Text color={"brand.500"}>Hiện tại bạn chưa có đơn hàng nào</Text>
            </Center>
          )}
          <Flex w={"70%"} justifyContent={"center"}>
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
        </Stack>
        {/* <Stack>
          <Box>
            <Button colorScheme="red">Xóa lịch sử</Button>
          </Box>
        </Stack> */}
      </VStack>
    </>
  );
};

export default OrderHistory;
