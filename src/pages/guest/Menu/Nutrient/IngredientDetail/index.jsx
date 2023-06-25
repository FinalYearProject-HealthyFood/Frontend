import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  GridItem,
  Grid,
  Box,
  VStack,
  Image,
  Heading,
  Flex,
  IconButton,
  Text,
  Divider,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import food_14 from "../../../../../assets/food14.png";
import { StarIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api, api_image } from "../../../../../api";
import axiosClient from "../../../../../axios";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const IngredientDetail = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const param = useParams();
  const [ingredient, setIngredient] = useState({});
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [clickRate, setClickRate] = useState(0);

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
    axios.get(`${api}/ingredients/${param.id}`).then((response) => {
      setIngredient(response.data);
      setLoading(false);
    });
  }, [param.id, clickRate]);
  const onSubmit = () => {
    if (userToken) {
      const data = {
        quantity: quantity,
        ingredient_id: param.id,
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
      {loading ? (
        <Container maxW="70%">
          <Breadcrumb fontWeight={"semibold"} fontSize={"lg"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Menu</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => {
                  navigate(`/nutrient`);
                }}
                href="#"
              >
                Tự chọn khẩu phần ăn
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                onClick={() => {
                  navigate(`/nutrient/${data.id}`);
                }}
                href="#"
              >
                {ingredient.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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
        </Container>
      ) : (
        <Container maxW="70%">
          <Breadcrumb fontWeight={"semibold"} fontSize={"lg"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Menu</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => {
                  navigate(`/nutrient`);
                }}
                href="#"
              >
                Tự chọn khẩu phần ăn
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                onClick={() => {
                  navigate(`/nutrient/${data.id}`);
                }}
                href="#"
              >
                {ingredient.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack mt={"50px"} alignItems={"center"}>
            <Grid w={"80%"} templateColumns="repeat(4, 1fr)" gap={2}>
              <GridItem colSpan={2}>
                <Center
                // borderWidth={"1px"}
                // borderColor={"black.200"}
                // borderRadius={"10px"}
                // py={"10px"}
                // bg="gray.100"
                >
                  {ingredient.image ? (
                    <Image
                      boxShadow={"lg"}
                      boxSize={"250px"}
                      src={`${api_image}/storage/${ingredient.image}`}
                    />
                  ) : (
                    <Center bgColor={"brand.100"} h={"250px"} w={"250px"}>
                      <Text
                        fontWeight={"bold"}
                        color={"white"}
                        fontFamily={"cursive"}
                      >
                        HFS Meal
                      </Text>
                    </Center>
                  )}
                </Center>
              </GridItem>
              <GridItem colSpan={2} bg="white">
                <Box my={2} mx={5}>
                  <Heading ml={"8px"} fontSize={"3xl"}>
                    {ingredient.name}
                  </Heading>
                  <Flex>
                    <Heading
                      ml={"8px"}
                      mt={"10px"}
                      fontWeight={"md"}
                      fontSize={"lg"}
                    >
                      Đánh giá:
                    </Heading>
                    <Spacer />
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <IconButton
                          type="button"
                          variant={"unstyled"}
                          key={index}
                          icon={<StarIcon boxSize={"20px"} />}
                          color={
                            index <= ingredient.rate ? "yellow.400" : "gray.200"
                          }
                          onClick={() => {
                            if (userToken) {
                              axiosClient
                                .get(`/rate/ingredient/${ingredient.id}`, {
                                  params: {
                                    user_id: currentUser.id,
                                    rating: index,
                                  },
                                })
                                .then((res) => {
                                  showToast(
                                    "Success!",
                                    "success",
                                    `Bạn đã đánh giá sản phẩm ${ingredient.name} ${index} sao`
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
                    <Text
                      ml={1}
                      color={"black"}
                      mt={"11px"}
                      fontWeight={"md"}
                      fontSize={"bg"}
                    >
                      {ingredient.rate}
                    </Text>
                  </Flex>
                  <Flex mt={5} ml={"8px"} alignItems={"center"}>
                    <Heading fontSize={"2xl"}>Giá:</Heading>
                    <Spacer />
                    <Heading fontSize={"2xl"}>
                      {ingredient.price?.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}{" "}
                      vnđ
                    </Heading>
                  </Flex>
                  <Flex mt={5} ml={"8px"} alignItems={"center"}>
                    <Heading fontSize={"2xl"}>Thêm vào giỏ:</Heading>
                    <Spacer />
                    <Box my={"14px"}>
                      <Flex>
                        <Box>
                          <NumberInput
                            size={"md"}
                            step={1}
                            value={quantity}
                            onChange={(number) => {
                              setQuantity(number);
                            }}
                            min={1}
                            w={"80px"}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>
                        <Box>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"md"}
                            onClick={onSubmit}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                  <Box
                    borderColor={"black"}
                    borderWidth={"2px"}
                    mt={5}
                    px={"3px"}
                    ml={"8px"}
                  >
                    <Center>
                      <Heading>Nutrition Facts</Heading>
                    </Center>
                    <Box borderWidth={"1px"} borderColor={"black"} />
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Serving size</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>
                        {ingredient.serving_size} g
                      </Heading>
                    </Flex>
                    <Box borderColor={"black"} borderWidth={"10px"} mt={2} />
                    <Flex mx={2}>
                      <Heading fontSize={"3xl"}>Calories</Heading>
                      <Spacer />
                      <Heading fontSize={"3xl"}>{ingredient.calories}</Heading>
                    </Flex>
                    <Divider />
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Protein</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>{ingredient.protein} g</Heading>
                    </Flex>
                    <Divider />
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Total Fat</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>{ingredient.fat} g</Heading>
                    </Flex>
                    <Flex mx={2}>
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        Saturated Fat
                      </Heading>
                      <Spacer />
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        {ingredient.sat_fat} g
                      </Heading>
                    </Flex>
                    <Flex mx={2}>
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        Trans Fat
                      </Heading>
                      <Spacer />
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        {ingredient.trans_fat} g
                      </Heading>
                    </Flex>
                    <Divider />
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Total Carb.</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>{ingredient.carb} g</Heading>
                    </Flex>
                    <Flex mx={2}>
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        Dietary Fiber
                      </Heading>
                      <Spacer />
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        {ingredient.fiber} g
                      </Heading>
                    </Flex>
                    <Flex mx={2}>
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        Total Sugar
                      </Heading>
                      <Spacer />
                      <Heading ml={5} fontWeight={"normal"} fontSize={"2xl"}>
                        {ingredient.sugar} g
                      </Heading>
                    </Flex>
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Cholesterol</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>
                        {ingredient.cholesterol} mg
                      </Heading>
                    </Flex>
                    <Divider />
                    <Flex mx={2}>
                      <Heading fontSize={"2xl"}>Sodium</Heading>
                      <Spacer />
                      <Heading fontSize={"2xl"}>{ingredient.sodium} mg</Heading>
                    </Flex>
                    <Box borderWidth={"2px"} borderColor={"black"} />
                    <Flex mx={2}>
                      <Grid w={"100%"} templateColumns={"repeat(4, 1fr)"}>
                        <GridItem
                          colSpan={2}
                          pr={"8px"}
                          borderColor={"black"}
                          borderRight={"1px"}
                        >
                          <Flex>
                            <Text>calium</Text>
                            <Spacer />
                            <Text>{ingredient.calcium} mg</Text>
                          </Flex>
                        </GridItem>
                        <GridItem colSpan={2} pl={"8px"}>
                          <Flex>
                            <Text>iron</Text>
                            <Spacer />
                            <Text>{ingredient.iron} mg</Text>
                          </Flex>
                        </GridItem>
                      </Grid>
                    </Flex>
                    <Flex mx={2}>
                      <Grid w={"100%"} templateColumns={"repeat(4, 1fr)"}>
                        <GridItem
                          colSpan={2}
                          pr={"8px"}
                          borderColor={"black"}
                          borderRight={"1px"}
                        >
                          <Flex>
                            <Text>zinc</Text>
                            <Spacer />
                            <Text>{ingredient.zinc} mg</Text>
                          </Flex>
                        </GridItem>
                      </Grid>
                    </Flex>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default IngredientDetail;
