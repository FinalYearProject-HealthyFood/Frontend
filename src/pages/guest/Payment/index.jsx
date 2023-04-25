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
  Grid,
  GridItem,
  Icon,
  Stack,
  VStack,
  Divider,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import food_14 from "../../../assets/Sample 2.png";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Payment = () => {
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
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        templateRows={"repeat(4, 1fr)"}
        gap={4}
      >
        <GridItem rowSpan={4} colSpan={2}>
          <TableContainer
            borderLeftWidth={"1px"}
            borderRightWidth={"1px"}
            bgColor={"white"}
            overflowY="auto"
            maxHeight="650px"
            
          >
            <Table>
              <Thead position="sticky" zIndex={10} top={0} bg={"brand.500"}>
                <Tr>
                  <Th textColor={"white"}>Tên sản phẩm</Th>
                  <Th textColor={"white"}>số lượng</Th>
                  <Th textColor={"white"}>Giá </Th>
                  <Th textColor={"white"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {[0, 1, 2, 3, 4].map((index, data) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <Box>
                          <Flex>
                            <Image boxSize={"100px"} src={food_14} />
                            <Box ml={5}>
                              <Text
                                whiteSpace="normal"
                                height="auto"
                                noOfLines={4}
                              >
                                ức gà chiên ức gà chiên ức gà chiên ức gà chiên
                                ức gà chiên ức gà chiên ức gà chiên ức gà chiên
                                ức gà chiên{" "}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </Td>
                      <Td>
                        <Box>x {5}</Box>
                      </Td>
                      <Td>25.000 vnđ</Td>
                      <Td>
                        <Button colorScheme="red">X</Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot position="sticky" bottom={"0"} bg={"brand.500"}>
                <Tr>
                  <Th textColor={"white"}>
                    <Flex alignItems={"center"}>
                      <Box>
                        <Icon
                          as={ArrowForwardIcon}
                          boxSize={"18px"}
                          color={"white"}
                        />
                      </Box>
                      <Box>
                        <Icon
                          as={FaShoppingCart}
                          boxSize={"18px"}
                          color={"white"}
                        />
                      </Box>

                      <Button
                        color={"white"}
                        ml={2}
                        fontSize={"18px"}
                        variant={"link"}
                      >
                        <Text as={"u"}>Tiếp tục mua sắm</Text>
                      </Button>
                    </Flex>
                  </Th>
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
        </GridItem>
        <GridItem rowSpan={2}>
          <VStack
            px={4}
            pt={2}
            pb={5}
            bg="white"
            borderColor={"brand.100"}
            borderWidth={"2px"}
            borderRadius={"lg"}
            boxShadow={"lg"}
          >
            <Box>
              <Text fontWeight={"bold"}>Thông tin giao hàng</Text>
            </Box>
            <Divider borderColor={"black"} />
            <Box>
              <Flex alignItems={"center"}>
                <Text w={"150px"}>Họ và tên người nhận</Text>
                <Input borderColor={"gray"} />
              </Flex>
              <Flex mt={2}>
                <Text w={"150px"}>Địa chỉ</Text>
                <Textarea borderColor={"gray"} />
              </Flex>
              <Flex alignItems={"center"} mt={2}>
                <Text w={"150px"}>Điện thoại</Text>
                <Input borderColor={"gray"} />
              </Flex>
            </Box>
          </VStack>
        </GridItem>
        <GridItem rowSpan={2} >
          <Box
            px={4}
            pt={2}
            pb={5}
            bg="white"
            borderColor={"brand.100"}
            borderWidth={"2px"}
            borderRadius={"lg"}
            boxShadow={"lg"}
          >
            <Box>
              <Center>
                <Text fontWeight={"bold"}>Đơn hàng</Text>
              </Center>
              <Stack w={"100%"}>
                <Text>5 Sản phẩm</Text>
              </Stack>
            </Box>
            <Divider borderColor={"black"} />
            <Flex pt={5} pb={2} >
              <Text fontSize={"md"} >Tổng đơn hàng</Text>
              <Spacer/>
              <Text fontSize={"md"}>125.000 vnđ</Text>
            </Flex>
            <Flex pb={2} >
              <Text fontSize={"md"} >Phí vận chuyển</Text>
              <Spacer/>
              <Text fontSize={"md"}>25.000 vnđ</Text>
            </Flex>
            <Flex pb={5} >
              <Text fontSize={"xl"} fontWeight={"medium"}>Thành tiền:</Text>
              <Spacer/>
              <Text fontSize={"xl"} color={"red"} fontWeight={"medium"}>150.000 vnđ</Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
      <VStack mt={10}>
        <Stack>
            <Box>
                <Button colorScheme={"brand"} variant={"solid"} >
                    Đặt mua
                </Button>
            </Box>
        </Stack>
      </VStack>
    </Container>
  );
};

export default Payment;
