import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { api, api_image } from "../../../../../../api";
import axiosClient from "../../../../../../axios";
import { useStateContext } from "../../../../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MealList = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [clickRate, setClickRate] = useState(0);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    axios.get(`${api}/meals/high-rating`).then((response) => {
      setLoading(false);
      setMeals(response.data);
      //   setTotalPage(response.data.total);
      console.log(response.data);
      setQuantities(
        response.data.map((value, index) => {
          return { id: value.id, quantity: 1 };
        })
      );
    });
  }, [clickRate]);
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
  const onSubmit = (id) => {
    if (userToken) {
      var qty = quantities.find((item) => item.id === id);
      const data = {
        quantity: qty.quantity,
        meal_id: id,
      };
      console.log(data);
      axiosClient
        .post(`${api}/order-items/store`, data)
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
      {meals.length > 0 ? (
        <Box>
          <Heading mb={5} color={"brand.200"} fontSize={"lg"}>
            Danh sách xuất ăn được đánh giá cao gần đây
          </Heading>
          {loading ? (
            <VStack my={"50px"} alignItems={"center"}>
              <Box>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="brand.500"
                  size="xl"
                />
              </Box>
              <Box mb={"100px"} mt={"100px"}>
                <Heading color={"brand.200"} fontSize={"xl"}>
                  {" "}
                  Đang tải, xin vui lòng chờ...{" "}
                </Heading>
              </Box>
            </VStack>
          ) : (
            <SimpleGrid spacing={5} columns={2} justifyItems={"center"}>
              {meals?.map((data, index) => (
                <Flex
                  key={index}
                  cursor="pointer"
                  borderRadius={"lg"}
                  boxShadow={"lg"}
                  h={"150px"}
                  _hover={{
                    transform: "translate(0px, -10px)",
                    boxShadow: "2xl",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                  overflow="hidden"
                >
                  {data.image ? (
                    <Image
                      objectFit={"cover"}
                      src={`${api_image}/storage/${data.image}`}
                      h={"150px"}
                      w={"150px"}
                      alt="recommend"
                      onClick={() => {
                        navigate(`/meal/${data.id}`);
                      }}
                    />
                  ) : (
                    <Center
                      bgColor={"brand.100"}
                      h={"150px"}
                      w={"150px"}
                      onClick={() => {
                        navigate(`/meal/${data.id}`);
                      }}
                    >
                      <Text
                        fontWeight={"bold"}
                        color={"white"}
                        fontFamily={"cursive"}
                      >
                        HFS Meal
                      </Text>
                    </Center>
                  )}
                  <Stack p={2} w={"250px"} bg={"white"}>
                    <Heading
                      color={""}
                      fontSize={"sm"}
                      onClick={() => {
                        navigate(`/meal/${data.id}`);
                      }}
                    >
                      {data.name}
                    </Heading>
                    <Flex>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <IconButton
                            type="button"
                            fontSize={"xs"}
                            size={"10"}
                            variant={"unstyled"}
                            key={index}
                            icon={<StarIcon />}
                            color={
                              index <= data.rate ? "yellow.400" : "gray.200"
                            }
                            onClick={() => {
                              if (userToken) {
                                axiosClient
                                  .get(`/rate/meal/${data.id}`, {
                                    params: {
                                      user_id: currentUser.id,
                                      rating: index,
                                    },
                                  })
                                  .then((res) => {
                                    showToast(
                                      "Success!",
                                      "success",
                                      `Bạn đã đánh giá sản phẩm ${data.name} ${index} sao`
                                    );
                                    setClickRate(clickRate + 1);
                                  });
                              } else {
                                showToast(
                                  "Warning!",
                                  "warning",
                                  `Bạn chưa đăng nhập`
                                );
                              }
                            }}
                            _hover={{
                              color: "red.400",
                            }}
                          />
                        );
                      })}
                      <Text ml={1} color={"gray"} mt={"5px"} fontSize={"xs"}>
                        {data.rate}
                      </Text>
                      <Spacer />
                      <Text color={"gray"} mt={"5px"} fontSize={"xs"}>
                        {data.rating_count} đánh giá
                      </Text>
                    </Flex>
                    <Flex>
                      <BsFire />
                      <Text fontSize={"sm"}>{data.calories} KCal</Text>
                    </Flex>
                    <Progress
                      value={(data.calories / 800) * 100}
                      size="xs"
                      colorScheme="orange"
                    />
                    <Flex>
                      <Text mt={"15px"} fontSize={"sm"}>
                        {data.price?.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}{" "}
                        vnd
                      </Text>
                      <Spacer />
                      <Box mt={"15px"}>
                        <NumberInput
                          size={"xs"}
                          step={1}
                          defaultValue={1}
                          min={1}
                          w={"50px"}
                          onChange={(number) => {
                            handleIncrementClick(data.id, number);
                          }}
                        >
                          <NumberInputField fontSize={"xs"} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                      <Button
                        colorScheme="orange"
                        ml={2}
                        borderRadius={"none"}
                        mt={"15px"}
                        size={"xs"}
                        onClick={() => {
                          onSubmit(data.id);
                        }}
                      >
                        <FaShoppingCart />
                      </Button>
                    </Flex>
                  </Stack>
                </Flex>
              ))}
            </SimpleGrid>
          )}
        </Box>
      ) : (
        <Box>
          <Heading color={"brand.200"} fontSize={"lg"}>
            Hiện tại không có xuất ăn nào
          </Heading>
        </Box>
      )}
    </>
  );
};

export default MealList;
