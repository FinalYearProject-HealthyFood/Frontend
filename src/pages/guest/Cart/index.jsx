import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Image,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Center,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import food_14 from "../../../assets/food14.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <Container maxW={"80%"}>
      <Box my={5}>
        <Flex alignItems={"center"}>
          <Heading color={"brand.500"} fontSize={"4xl"}>
            <FaShoppingCart />
          </Heading>
          <Heading ml={5} color={"brand.500"} fontSize={"4xl"}>
            Giỏ hàng
          </Heading>
        </Flex>
      </Box>
      <TableContainer
        borderLeftWidth={"1px"}
        borderRightWidth={"1px"}
        bgColor={"white"}
      >
        <Table variant="striped">
          <Thead bg={"brand.500"}>
            <Tr>
              <Th textColor={"white"}>No.</Th>
              <Th textColor={"white"}>Tên sản phẩm</Th>
              <Th textColor={"white"}>số lượng</Th>
              <Th textColor={"white"}>Giá đơn vị</Th>
              <Th textColor={"white"}>Giá tổng</Th>
              <Th textColor={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {[0, 1, 2, 3, 4].map((index, data) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex>
                      <Image boxSize={"120px"} src={food_14} />
                      <Box ml={5}>
                        <Text whiteSpace="normal" height="auto" noOfLines={4}>
                          ức gà chiên ức gà chiên ức gà chiên ức gà chiên ức gà
                          chiên ức gà chiên ức gà chiên ức gà chiên ức gà chiên{" "}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Box>
                      <NumberInput
                        size={"md"}
                        step={1}
                        defaultValue={1}
                        min={1}
                        w={"70px"}
                        bg={"white"}
                      >
                        <NumberInputField />
                        <NumberInputStepper bgColor={"brand.500"}>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                  </Td>
                  <Td>25.000 vnđ</Td>
                  <Td>25.000 vnđ</Td>
                  <Td>
                    <Button colorScheme="red">Xóa</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot bg={"brand.500"}>
            <Tr>
              <Th textColor={"white"}></Th>
              <Th textColor={"white"}></Th>
              <Th textColor={"white"}></Th>
              <Th textColor={"white"}></Th>
              <Th textColor={"white"}> Tổng giá thành</Th>
              <Th textColor={"white"}>
                {" "}
                {(25000 * 5).toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}{" "}
                vnđ{" "}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Container mt={5} maxW={"80%"}>
        <HStack>
          <Box>
            <Button colorScheme="red">Xóa tất cả</Button>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme="orange">
              <FaShoppingCart />
              <Text ml={2}>Tiếp tục mua</Text>
            </Button>
          </Box>
          <Box>
            <Button colorScheme="brand" onClick={()=> {navigate("/cart-payment")}}>
              Thanh toán
            </Button>
          </Box>
        </HStack>
      </Container>
    </Container>
  );
};

export default Cart;
