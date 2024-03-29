import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
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
import { FaShoppingCart, FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../../../axios";
import { api, api_image } from "../../../../api";
import { useStateContext } from "../../../../contexts/ContextProvider";

const IngredientListR = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [dislikeingredients, setDislikeingredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [quantities2, setQuantities2] = useState([]);
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
    axios
      .get(`${api}/ingredients/get-high-star-list/${currentUser.id}`)
      .then((response) => {
        setLoading(false);
        setIngredients(response.data.likedlist);
        setDislikeingredients(response.data.dislikedlist);
        //   setTotalPage(response.data.total);
        console.log(response.data);
        setQuantities(
          response.data.likedlist.map((value, index) => {
            return { id: value.id, quantity: 1 };
          })
        );
        setQuantities2(
          response.data.dislikedlist.map((value, index) => {
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
  function handleIncrementClick2(index, qty) {
    const nextCounters = quantities2.map((value, i) => {
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
    setQuantities2(nextCounters);
    console.log(quantities2);
  }
  const onSubmit = (id) => {
    if (userToken) {
      var qty = quantities.find((item) => item.id === id);
      const data = {
        quantity: qty.quantity,
        ingredient_id: id,
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
  const onSubmit2 = (id) => {
    if (userToken) {
      var qty = quantities2.find((item) => item.id === id);
      const data = {
        quantity: qty.quantity,
        ingredient_id: id,
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
    <Flex gap={5}>
      {ingredients.length > 0 && (
        <Box>
          <Box mb={5}>
            <Heading color={"brand.200"} fontFamily={"cursive"} fontSize={"lg"}>
              Danh sách thành phần được đánh giá cao gần đây
            </Heading>
          </Box>
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
              {ingredients?.map((data, index) => (
                <Box
                  key={index}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                  overflow="hidden"
                >
                  <Box px={5} w={"200px"} bg={"white"}>
                    <Stack>
                      <Box>
                        {data.image ? (
                          <Image
                            mt={"10px"}
                            borderRadius={"5px"}
                            objectFit={"cover"}
                            src={`${api_image}/storage/${data.image}`}
                            alt="recommend"
                            onClick={() => {
                              navigate(`/nutrient/${data.id}`);
                            }}
                          />
                        ) : (
                          <Center
                            mt={"10px"}
                            bgColor={"brand.100"}
                            h={"150px"}
                            w={"150px"}
                          >
                            <Text
                              fontWeight={"bold"}
                              color={"white"}
                              fontFamily={"cursive"}
                            >
                              HFS Ingredient
                            </Text>
                          </Center>
                        )}
                        <Heading
                          fontSize={"sm"}
                          _hover={{
                            color: "orange",
                          }}
                          onClick={() => {
                            navigate(`/nutrient/${data.id}`);
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
                                  axiosClient
                                    .get(`/rate/ingredient/${data.id}`, {
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
                                }}
                                _hover={{
                                  color: "red.400",
                                }}
                              />
                            );
                          })}
                          <Text
                            ml={1}
                            color={"gray"}
                            mt={"5px"}
                            fontSize={"xs"}
                          >
                            {data.rate}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text color={"gray"} fontSize={"xs"}>
                            {data.rating_count} đánh giá
                          </Text>
                        </Flex>
                        <Flex mt={"10px"}>
                          <FaWeightHanging />
                          <Text ml={2} fontSize={"sm"}>
                            {data.serving_size} gram
                          </Text>
                        </Flex>
                        <Flex>
                          <Text
                            fontWeight={"bold"}
                            mr={"3"}
                            mt={"10px"}
                            fontSize={"sm"}
                          >
                            Giá:
                          </Text>
                          <Text mt={"10px"} fontSize={"sm"}>
                            {data.price?.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            })}{" "}
                            vnd
                          </Text>
                        </Flex>
                        <Box my={"14px"}>
                          <Flex>
                            <Box>
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
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </Box>
                            <Spacer />
                            <Box>
                              <Button
                                colorScheme="orange"
                                ml={2}
                                borderRadius={"none"}
                                size={"xs"}
                                onClick={() => {
                                  onSubmit(data.id);
                                }}
                              >
                                <FaShoppingCart />
                              </Button>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
      <Spacer/>
      {dislikeingredients.length > 0 && (
        <Box>
          <Box mb={5}>
            <Heading color={"red.300"} fontFamily={"cursive"} fontSize={"lg"}>
              Danh sách thành phần được đánh giá thấp gần đây
            </Heading>
          </Box>
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
              {dislikeingredients?.map((data, index) => (
                <Box
                  key={index}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                  overflow="hidden"
                >
                  <Box px={5} w={"200px"} bg={"white"}>
                    <Stack>
                      <Box>
                        {data.image ? (
                          <Image
                            mt={"10px"}
                            borderRadius={"5px"}
                            objectFit={"cover"}
                            src={`${api_image}/storage/${data.image}`}
                            alt="recommend"
                            onClick={() => {
                              navigate(`/nutrient/${data.id}`);
                            }}
                          />
                        ) : (
                          <Center
                            mt={"10px"}
                            bgColor={"brand.100"}
                            h={"150px"}
                            w={"150px"}
                          >
                            <Text
                              fontWeight={"bold"}
                              color={"white"}
                              fontFamily={"cursive"}
                            >
                              HFS Ingredient
                            </Text>
                          </Center>
                        )}
                        <Heading
                          fontSize={"sm"}
                          _hover={{
                            color: "orange",
                          }}
                          onClick={() => {
                            navigate(`/nutrient/${data.id}`);
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
                                  axiosClient
                                    .get(`/rate/ingredient/${data.id}`, {
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
                                }}
                                _hover={{
                                  color: "red.400",
                                }}
                              />
                            );
                          })}
                          <Text
                            ml={1}
                            color={"gray"}
                            mt={"5px"}
                            fontSize={"xs"}
                          >
                            {data.rate}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text color={"gray"} fontSize={"xs"}>
                            {data.rating_count} đánh giá
                          </Text>
                        </Flex>
                        <Flex mt={"10px"}>
                          <FaWeightHanging />
                          <Text ml={2} fontSize={"sm"}>
                            {data.serving_size} gram
                          </Text>
                        </Flex>
                        <Flex>
                          <Text
                            fontWeight={"bold"}
                            mr={"3"}
                            mt={"10px"}
                            fontSize={"sm"}
                          >
                            Giá:
                          </Text>
                          <Text mt={"10px"} fontSize={"sm"}>
                            {data.price?.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            })}{" "}
                            vnd
                          </Text>
                        </Flex>
                        <Box my={"14px"}>
                          <Flex>
                            <Box>
                              <NumberInput
                                size={"xs"}
                                step={1}
                                defaultValue={1}
                                min={1}
                                w={"50px"}
                                onChange={(number) => {
                                  handleIncrementClick2(data.id, number);
                                }}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </Box>
                            <Spacer />
                            <Box>
                              <Button
                                colorScheme="orange"
                                ml={2}
                                borderRadius={"none"}
                                size={"xs"}
                                onClick={() => {
                                  onSubmit2(data.id);
                                }}
                              >
                                <FaShoppingCart />
                              </Button>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default IngredientListR;
