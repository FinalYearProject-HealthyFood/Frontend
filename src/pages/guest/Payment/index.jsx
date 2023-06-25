import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Image,
  Text,
  Button,
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import { api_image } from "../../../api";
import { useNavigate } from "react-router-dom";
import OnlineButton from "./PayPalButton";

const Payment = () => {
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [cartList, setCartList] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(10000);
  const [username, setUsername] = useState(currentUser?.name);
  const [address, setAddress] = useState(currentUser?.address);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (Object.keys(currentUser).length == 0) {
      // navigate("/");
    }
  }, []);

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
      axiosClient.post("order-items/on-cart-by-user").then((res) => {
        console.log(res.data);
        setCartList(res.data);
        setSumPrice(
          res.data.reduce((accumulator, object) => {
            return accumulator + object.total_price;
          }, 0)
        );
      });
    }
  }, []);
  const onSubmit = () => {
    setLoading(true);
    showToast("Warning!", "warning", "Đang xử lý. Vui lòng chờ đợi.");
    const data = {
      username: username,
      delivery_address: address,
      phone: phone,
      total_price: Math.round((sumPrice + deliveryFee) / 1000) * 1000,
    };
    axiosClient
      .post("orders/store", data)
      .then((res) => {
        showToast("Success!", "success", "Thanh toán thành công!");
        setLoading(false);
        navigate("/payment/success");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        showToast("Error!", "error", error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <>
      {Object.keys(currentUser).length == 0 ? (
        // navigate("/")
        ""
      ) : (
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
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cartList.map((data, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Box>
                              <Flex>
                                <Image
                                  boxSize={"100px"}
                                  src={`${api_image}/storage/${
                                    data?.ingredient_id !== null
                                      ? data.ingredient.image
                                      : data.meal.image
                                  }`}
                                />
                                <Box ml={5}>
                                  <Text
                                    whiteSpace="normal"
                                    height="auto"
                                    noOfLines={4}
                                  >
                                    {data?.ingredient_id !== null
                                      ? data.ingredient.name
                                      : data.meal.name}
                                  </Text>
                                </Box>
                              </Flex>
                            </Box>
                          </Td>
                          <Td>
                            <Box>x {data?.quantity}</Box>
                          </Td>
                          <Td>
                            {data.total_price?.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            })}{" "}
                            vnđ
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
                            onClick={()=> {
                              navigate(-1)
                            }}
                          >
                            <Text as={"u"}>Quay lại giỏ hàng</Text>
                          </Button>
                        </Flex>
                      </Th>
                      <Th textColor={"white"}> Tổng giá thành</Th>
                      <Th textColor={"white"}>
                        {" "}
                        {sumPrice.toLocaleString(undefined, {
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
                    <Input
                      borderColor={"gray"}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Flex>
                  <Flex mt={2}>
                    <Text w={"150px"}>Địa chỉ</Text>
                    <Textarea
                      borderColor={"gray"}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Flex>
                  <Flex alignItems={"center"} mt={2}>
                    <Text w={"150px"}>Điện thoại</Text>
                    <Input
                      borderColor={"gray"}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Flex>
                </Box>
              </VStack>
            </GridItem>
            <GridItem rowSpan={2}>
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
                    <Text>{cartList?.length} Sản phẩm</Text>
                  </Stack>
                </Box>
                <Divider borderColor={"black"} />
                <Flex pt={5} pb={2}>
                  <Text fontSize={"md"}>Tổng đơn hàng</Text>
                  <Spacer />
                  <Text fontSize={"md"}>
                    {sumPrice?.toLocaleString(undefined, {
                      maximumFractionDigits: 3,
                    })}{" "}
                    vnđ
                  </Text>
                </Flex>
                <Flex pb={2}>
                  <Text fontSize={"md"}>Phí vận chuyển</Text>
                  <Spacer />
                  <Text fontSize={"md"}>{deliveryFee} vnđ</Text>
                </Flex>
                <Flex pb={5}>
                  <Text fontSize={"xl"} fontWeight={"medium"}>
                    Thành tiền:
                  </Text>
                  <Spacer />
                  <Text fontSize={"xl"} color={"red"} fontWeight={"medium"}>
                    {(
                      Math.round((sumPrice + deliveryFee) / 1000) * 1000
                    )?.toLocaleString(undefined, {
                      maximumFractionDigits: 3,
                    })}{" "}
                    vnđ
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
          <VStack mt={10}>
            <Stack>
              <Flex gap={2}>
                <Button
                  colorScheme={"brand"}
                  variant={"solid"}
                  isLoading={loading}
                  onClick={() => {
                    if (username == "" || address == "" || phone == "") {
                      showToast(
                        "Error!",
                        "error",
                        "Làm ơn hãy điền đầy đủ thông tin giao hàng!"
                      );
                    } else {
                      onOpen();
                    }
                  }}
                >
                  Đặt mua
                </Button>

                <AlertDialog
                  motionPreset="slideInBottom"
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isCentered
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Flex alignContent={"center"}>
                          <Icon
                            boxSize={"24px"}
                            color={"orange"}
                            as={FaShoppingCart}
                            mr={2}
                          />
                          <Text color={"orange"}>Tiến hành thanh toán</Text>
                        </Flex>
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        <Box>Bạn có chắc chắn muốn mua không?</Box>
                        <Box>
                          Bạn sẽ không thể thay đổi thông tin đơn hàng sau khi
                          đồng ý mua.
                        </Box>
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Hủy
                        </Button>
                        <Button
                          colorScheme="orange"
                          onClick={() => {
                            onSubmit();
                            onClose();
                          }}
                          ml={3}
                        >
                          Đồng ý
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                {currentUser.email_verified_at && (
                  <OnlineButton
                    username={username}
                    delivery_address={address}
                    phone={phone}
                    total_price={
                      Math.round((sumPrice + deliveryFee) / 1000) * 1000
                    }
                  />
                )}
              </Flex>
            </Stack>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default Payment;
