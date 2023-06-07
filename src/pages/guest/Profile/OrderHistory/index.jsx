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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import axiosClient from "../../../../axios";
import { useState } from "react";
import Pagination from "react-js-pagination";
import "./pagination.css";
import moment from 'moment'

const OrderHistory = () => {
  const [itemlist, setItemlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  useEffect(() => {
    if (userToken) {
      axiosClient
        .post(`order-items/item-deliverd-by-user?page=${currentPage}`)
        .then((response) => {
          console.log(response.data.data);
          setItemlist(response.data.data);
          setTotalPage(response.data.total);
        });
    }
  }, [currentPage]);

  const getData = (pageNumber = 1) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
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
            Lịch sử mua hàng
          </Heading>
        </Box>
        <Stack alignItems={"center"} pt={"20px"}>
          <TableContainer
            borderLeftWidth={"1px"}
            borderRightWidth={"1px"}
            bgColor={"white"}
          >
            <Table size={"md"} variant="striped">
              <Thead bg={"brand.500"}>
                <Tr>
                  <Th textColor={"white"}>No.</Th>
                  <Th textColor={"white"}>Tên sản phẩm</Th>
                  <Th textColor={"white"}>số lượng</Th>
                  <Th textColor={"white"}>Ngày mua</Th>
                  <Th textColor={"white"}>Giá</Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemlist?.map((data, index) => {
                  return (
                    <Tr key={data.id}>
                      <Td>{(index + 1)+5*(currentPage-1)}</Td>
                      <Td>
                        <Text whiteSpace="normal" height="auto" noOfLines={4}>
                          {data?.ingredient_id !== null
                            ? data.ingredient.name
                            : data.meal.name}
                        </Text>
                      </Td>
                      <Td>
                        {data?.quantity}
                      </Td>
                      <Td>{moment(data?.updated_at).format("DD/MM/YYYY")}</Td>
                      <Td isNumeric>{data?.total_price} vnđ</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
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
        <Stack>
          <Box>
            <Button colorScheme="red">Xóa lịch sử</Button>
          </Box>
        </Stack>
      </VStack>
    </>
  );
};

export default OrderHistory;
