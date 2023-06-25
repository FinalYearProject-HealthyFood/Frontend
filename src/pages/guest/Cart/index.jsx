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
  useToast,
  Icon,
  VStack,
  Spinner,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import food_14 from "../../../assets/food14.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { api_image } from "../../../api";
import { GiMeal, GiMeat, GiShoppingCart } from "react-icons/gi";

const Cart = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [sumPrice, setSumPrice] = useState([]);
  const [nameCreate, setNameCreate] = useState("");
  const [numberSlot, setNumberSlot] = useState(0);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (Object.keys(currentUser).length == 0) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (userToken) {
      // setLoading(true);
      axiosClient.post("order-items/on-cart-by-user").then((res) => {
        console.log(res.data);
        setCartList(res.data);
        setSumPrice(
          res.data.reduce((accumulator, object) => {
            return accumulator + object.total_price;
          }, 0)
        );
        setLoading(false);
      });
    }
  }, [numberSlot]);
  const onUpdateQtyItem = (qty, id) => {
    axiosClient
      .put(`order-items/update/${id}`, { quantity: qty })
      .then((res) => {
        setNumberSlot(numberSlot + 1);
        showToast("Success!", "warning", "Đã thay đổi số lượng giỏ hàng!");
      });
  };
  const onUpdateFormeItem = (for_me, id) => {
    axiosClient
      .put(`order-items/update-forme/${id}`, { for_me: for_me ? "yes" : "no" })
      .then((res) => {
        setNumberSlot(numberSlot + 1);
        showToast("Success!", "warning", "Đã thay đổi tình trạng giỏ hàng!");
      });
  };
  const removeItem = (id) => {
    axiosClient.delete(`order-items/delete-by-user/${id}`).then((res) => {
      showToast("Success!", "warning", "Đã loại khỏi giỏ hàng!");
      setNumberSlot(numberSlot + 1);
    });
  };
  const removeAllItem = () => {
    axiosClient.delete(`order-items/delete-all-incart-by-user`).then((res) => {
      showToast("Success!", "warning", "Đã xóa tất cả giỏ hàng!");
      setNumberSlot(numberSlot + 1);
    });
  };
  function handleIncrementClick(index, qty) {
    const nextCounters = quantities.map((value, i) => {
      if (value.id === index) {
        // Increment the clicked counter
        return {
          id: value.id,
          quantity: parseFloat(qty),
        };
      } else {
        // The rest haven't changed
        return {
          id: value.id,
          quantity: value.quantity,
        };
      }
    });
    setQuantities(nextCounters);
    console.log(quantities);
  }
  const onSubmit = () => {
    if (userToken) {
      const dataSubmit = {
        name: nameCreate,
        description: "bữa ăn tự mix, Người yêu cầu:" + currentUser.name,
      };
      if (nameCreate == "") {
        showToast("Error!", "error", "Bạn cần đặt tên cho khẩu phần ăn này!");
      } else {
        console.log(dataSubmit);
        axiosClient
          .post(`order-items/create-from-cart`, dataSubmit)
          .then(({ data }) => {
            setNumberSlot(numberSlot + 1);
            showToast("Success!", "warning", "Đã thêm khẩu phần ăn mới vào giỏ!");
          })
          .catch((error) => {
            console.log(error);
            showToast("Error!", "error", "Lỗi xảy ra khi thêm khẩu phần ăn mới vào giỏ!");
          });
      }
    } else {
      showToast("Error!", "error", "Bạn chưa đăng nhập!");
    }
  };
  return (
    <>
      {Object.keys(currentUser).length == 0 ? (
        navigate("/")
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
          {loading ? (
            <>
              <VStack mt={"50px"} alignItems={"center"}>
                <Box mt={"100px"}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="brand.500"
                    size="xl"
                  />
                </Box>
                <Box mb={"100px"} mt={"100px"}>
                  <Heading color={"brand.200"} fontSize={"2xl"}>
                    {" "}
                    Đang tải, xin vui lòng chờ...{" "}
                  </Heading>
                </Box>
              </VStack>
            </>
          ) : (
            <>
              {cartList.length !== 0 ? (
                <>
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
                          <Th textColor={"white"}>Loại sản phẩm</Th>
                          <Th textColor={"white"}>Tôi ăn</Th>
                          <Th textColor={"white"}>số lượng</Th>
                          <Th textColor={"white"}>Giá đơn vị</Th>
                          <Th textColor={"white"}>Giá tổng</Th>
                          <Th textColor={"white"}></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {cartList?.map((data, index) => {
                          return (
                            <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>
                                <Flex>
                                  {data.image ? (
                                    <Image
                                      boxSize={"100px"}
                                      src={`${api_image}/storage/${
                                        data?.ingredient_id !== null
                                          ? data.ingredient.image
                                          : data.meal.image
                                      }`}
                                    />
                                  ) : (
                                    <Center
                                      bgColor={"brand.100"}
                                      h={"100px"}
                                      w={"100px"}
                                    >
                                      <Text fontWeight={"bold"} color={"white"}>
                                        HFS Cart
                                      </Text>
                                    </Center>
                                  )}
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
                              </Td>
                              <Td>
                                <Text
                                  whiteSpace="normal"
                                  height="auto"
                                  noOfLines={4}
                                  fontWeight={"bold"}
                                  color={
                                    data?.ingredient_id !== null
                                      ? "green"
                                      : "orange"
                                  }
                                >
                                  {data?.ingredient_id !== null
                                    ? "Thành phần ăn"
                                    : "Xuất ăn"}
                                </Text>
                              </Td>
                              <Td>
                                {data?.ingredient_id !== null ? (
                                  ""
                                ) : (
                                  <Checkbox
                                    colorScheme="green"
                                    defaultChecked={
                                      data.for_me == "yes" ? true : false
                                    }
                                    onChange={(e) =>
                                      onUpdateFormeItem(
                                        e.target.checked,
                                        data?.id
                                      )
                                    }
                                  ></Checkbox>
                                )}
                              </Td>
                              <Td>
                                <Box>
                                  <NumberInput
                                    size={"md"}
                                    step={1}
                                    defaultValue={data?.quantity}
                                    min={1}
                                    w={"70px"}
                                    bg={"white"}
                                    onChange={(value) => {
                                      onUpdateQtyItem(value, data.id);
                                    }}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper bgColor={"brand.500"}>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Box>
                              </Td>
                              <Td>
                                {data?.ingredient_id !== null
                                  ? data.ingredient.price?.toLocaleString(
                                      undefined,
                                      {
                                        maximumFractionDigits: 3,
                                      }
                                    )
                                  : data.meal.price?.toLocaleString(undefined, {
                                      maximumFractionDigits: 3,
                                    })}{" "}
                                vnđ
                              </Td>
                              <Td>
                                {data.total_price?.toLocaleString(undefined, {
                                  maximumFractionDigits: 3,
                                })}{" "}
                                vnđ
                              </Td>
                              <Td>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    removeItem(data.id);
                                  }}
                                >
                                  Xóa
                                </Button>
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
                          <Th textColor={"white"}></Th>
                          <Th textColor={"white"}></Th>
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
                  <Container mt={5} maxW={"80%"}>
                    <HStack>
                      <Box>
                        <Button colorScheme="red" onClick={removeAllItem}>
                          Xóa tất cả
                        </Button>
                      </Box>
                      <Spacer />
                      <Box>
                        <Button
                          onClick={() => {
                            navigate(-1);
                          }}
                          colorScheme="orange"
                        >
                          <FaShoppingCart />
                          <Text ml={2}>Tiếp tục mua</Text>
                        </Button>
                      </Box>
                      <Box>
                        <Button onClick={onOpen} colorScheme="yellow">
                          <Icon as={GiMeat} />
                          <Text ml={2}>Tạo khẩu phần ăn</Text>
                        </Button>
                        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Tạo khẩu phần ăn</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Box>
                                <Text>Đặt tên</Text>
                                <Input value={nameCreate} onChange={(e)=> {setNameCreate(e.target.value)}} />
                              </Box>
                              <Box>
                                <Text>Danh sách thành phần ăn:</Text>
                              </Box>
                              <TableContainer mt={2}>
                                <Table size={"sm"} variant="striped">
                                  <Thead fontSize={"xs"} bg={"brand.500"}>
                                    <Tr>
                                      <Td textColor={"white"}>Tên sản phẩm</Td>
                                      <Td textColor={"white"}>Khối lượng</Td>
                                      <Td textColor={"white"}>số lượng</Td>
                                      <Td textColor={"white"}>Giá</Td>
                                    </Tr>
                                  </Thead>
                                  <Tbody fontSize={"xs"}>
                                    {cartList?.map((data, index) => {
                                      if (data?.ingredient_id !== null) {
                                        return (
                                          <Tr>
                                            <Td>{data?.ingredient.name}</Td>
                                            <Td>
                                              {data?.ingredient.serving_size}{" "}
                                              gram
                                            </Td>
                                            <Td>{data?.quantity}</Td>
                                            <Td>
                                              {data.total_price?.toLocaleString(
                                                undefined,
                                                {
                                                  maximumFractionDigits: 3,
                                                }
                                              )}{" "}
                                              vnđ
                                            </Td>
                                          </Tr>
                                        );
                                      }
                                    })}
                                  </Tbody>
                                  <Tfoot bg={"brand.500"}>
                                    <Tr>
                                      <Td textColor={"white"}></Td>
                                      <Td textColor={"white"}></Td>
                                      <Td textColor={"white"}>
                                        {" "}
                                        Tổng giá thành
                                      </Td>
                                      <Td textColor={"white"}>
                                        {" "}
                                        {sumPrice.toLocaleString(undefined, {
                                          maximumFractionDigits: 3,
                                        })}{" "}
                                        vnđ{" "}
                                      </Td>
                                    </Tr>
                                  </Tfoot>
                                </Table>
                              </TableContainer>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Hủy
                              </Button>
                              <Button colorScheme="yellow" onClick={()=> {onSubmit()}} >Tạo</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Box>
                      <Box>
                        <Button
                          colorScheme="brand"
                          onClick={() => {
                            navigate("/cart-payment");
                          }}
                        >
                          Thanh toán
                        </Button>
                      </Box>
                    </HStack>
                  </Container>
                </>
              ) : (
                <Container mt={5} maxW={"80%"}>
                  <Center py={40} flexDirection={"column"}>
                    <Icon
                      color={"brand.500"}
                      boxSize={"150px"}
                      as={GiShoppingCart}
                    />
                    <Heading color={"brand.500"}>Giỏ hàng rổng</Heading>
                  </Center>
                </Container>
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Cart;
