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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import food_14 from "../../../assets/food14.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { api_image } from "../../../api";
import { GiMeal, GiMeat, GiShoppingCart } from "react-icons/gi";
import PopOverMealInfo from "./PopOverMealInfo";
import PopOverMealIngredients from "./PopOverMealIngredients";

const MyMeal = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [mealList, setMealList] = useState([]);
  const [sumPrice, setSumPrice] = useState([]);
  const [numberSlot, setNumberSlot] = useState(0);
  const [loading, setLoading] = useState(true);
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
    if (Object.keys(currentUser).length == 0) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (userToken) {
      // setLoading(true);
      axiosClient.get("my-meal").then((res) => {
        console.log(res.data);
        setMealList(res.data);
        setLoading(false);
      });
    }
  }, [numberSlot]);
  const removeItem = (id) => {
    axiosClient.put(`remove-my-meal/${id}`).then((res) => {
      showToast("Success!", "warning", "Đã loại khỏi giỏ hàng!");
      setNumberSlot(numberSlot + 1);
    });
  };
  const removeAllItem = () => {
    axiosClient.put(`remove-all-meal`).then((res) => {
      showToast("Success!", "warning", "Đã xóa tất cả giỏ hàng!");
      setNumberSlot(numberSlot + 1);
    });
  };
  const onSubmit = (id) => {
    if (userToken) {
      const data = {
        quantity: 1,
        meal_id: id,
      };
      console.log(data);
      axiosClient
        .post(`order-items/store`, data)
        .then(({ data }) => {
          console.log(data);
          showToast("Success!", "warning", "Đã thêm vào giỏ!");
        })
        .catch((error) => {
          showToast("Error!", "error", "Lỗi xảy ra khi thêm vào giỏ!");
        });
    } else {
      navigate("/login");
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
                <GiMeat />
              </Heading>
              <Heading ml={5} color={"brand.500"} fontSize={"4xl"}>
                Xuất ăn của tôi
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
              {mealList.length !== 0 ? (
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
                          <Th textColor={"white"}>Chi tiết thông tin</Th>
                          <Th textColor={"white"}>Chi tiết thành phần</Th>
                          <Th textColor={"white"}>Giá đơn vị</Th>
                          <Th textColor={"white"}>Loại / Thêm vào giỏ</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {mealList?.map((data, index) => {
                          return (
                            <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>
                                <Flex>
                                  {data.image ? (
                                    <Image
                                      boxSize={"100px"}
                                      src={`${api_image}/storage/${data.image}`}
                                    />
                                  ) : (
                                    <Center
                                      bgColor={"brand.100"}
                                      h={"100px"}
                                      w={"100px"}
                                    >
                                      <Text fontWeight={"bold"} color={"white"}>
                                        HFS Meal
                                      </Text>
                                    </Center>
                                  )}
                                  <Box ml={5}>
                                    <Text
                                      whiteSpace="normal"
                                      height="auto"
                                      noOfLines={4}
                                    >
                                      {data.name}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Td>
                              <Td>
                                <PopOverMealInfo data={data} />
                              </Td>
                              <Td>
                                <PopOverMealIngredients
                                  data={data.ingredients}
                                />
                              </Td>
                              <Td>
                                {data.price?.toLocaleString(undefined, {
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
                                  Loại
                                </Button>
                                <Button
                                  colorScheme="orange"
                                  ml={2}
                                  onClick={() => {
                                    onSubmit(data.id);
                                  }}
                                >
                                  <FaShoppingCart />
                                </Button>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
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
                    </HStack>
                  </Container>
                </>
              ) : (
                <Container mt={5} maxW={"80%"}>
                  <Center py={40} flexDirection={"column"}>
                    <Icon color={"brand.500"} boxSize={"150px"} as={GiMeat} />
                    <Heading color={"brand.500"}>không có xuất ăn nào</Heading>
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

export default MyMeal;
