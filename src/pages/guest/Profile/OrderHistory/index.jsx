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

const OrderHistory = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //   const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

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
        <Box pt={"20px"}>
          <TableContainer borderLeftWidth={"1px"} borderRightWidth={"1px"} bgColor={"white"} >
            <Table size={"md"} variant="striped">
              <Thead bg={"brand.500"} >
                <Tr>
                  <Th textColor={"white"}>No.</Th>
                  <Th textColor={"white"}>Tên sản phẩm</Th>
                  <Th textColor={"white"}>số lượng</Th>
                  <Th textColor={"white"}>Ngày mua</Th>
                  <Th textColor={"white"}>Giá</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[0, 1, 2, 3, 4].map((index, data) => {
                  return (
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td><Text whiteSpace="normal" height="auto" noOfLines={4}>
                          ức gà chiên ức gà chiên ức gà chiên ức gà chiên ức gà
                          chiên ức gà chiên ức gà chiên ức gà chiên ức gà chiên{" "}
                        </Text></Td>
                      <Td>25.4</Td>
                      <Td isNumeric>2</Td>
                      <Td isNumeric>25.000 vnđ</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Stack>
            <Box>
                <Button colorScheme="red" >
                    Xóa lịch sử
                </Button>
            </Box>
        </Stack>
      </VStack>
    </>
  );
};

export default OrderHistory;
