import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Grid,
  GridItem,
  VStack,
  Stack,
  Button,
  Icon,
  IconButton,
  Image,
  Spacer,
  WrapItem,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPieChartFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import sample_2 from "../../../assets/Sample 2.png";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { api, api_image } from "../../../api";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import PopOverInfo from "./PopOverInfo";

const DietRecommender = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const location = useLocation();
  const [calories, setCalories] = useState("");
  const [plan, setPlan] = useState(1);
  const [recommendList, setRecommendList] = useState([]);
  const [sumCalo, setSumCalo] = useState(0);
  const [sumServ, setSumServ] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumCarb, setSumCarb] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [filter, setFilter] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [nextId, setNextId] = useState(0);
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
    setCalories(location.state.calories);
    axios.get(`${api}/ingredients/all-filter`).then((response) => {
      setIngredientList(response.data);
    });
    console.log(ingredientList);
    console.log(location.state.calories);
    console.log(recommendList);
  }, []);
  function handleQtyChange(index, qty) {
    const nextChange = ingredients.map((value, i) => {
      if (value.id === index) {
        // Increment the clicked counter
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: parseFloat(qty),
        };
      } else {
        // The rest haven't changed
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: value.quantity,
        };
      }
      //   return {
      //     id: value.id,
      //     name: value.name,
      //     serving_size: value.serving_size,
      //     quantity: parseFloat(qty),
      //   };
      // } else {
      //   // The rest haven't changed
      //   return {
      //     id: value.id,
      //     name: value.name,
      //     serving_size: value.serving_size,
      //     quantity: value.quantity,
      //   };
      // }
    });
    setIngredients(nextChange);
    console.log(ingredients);
  }
  const handleSearchOver = () => {
    let timer;
    const reset = () => {
      setFilter("");
    };
    clearTimeout(timer);
    timer = setTimeout(reset, 200);
    return () => {
      clearTimeout(timer);
    };
  };
  const generate = () => {
    axios
      .post(
        `http://127.0.0.1:5000/diet-list`,
        {
          calories: Math.round(calories / plan),
          ingredient: ingredients,
        },
        {
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          // params: {
          //   calories: Math.round(calories / plan),
          //   ingredients: (ingredients)
          // },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRecommendList(response.data);
        setListOrder(
          response.data.map((value, index) => {
            return {
              id: value.id,
              quantity: value.OptimalValue,
            };
          })
        );
        setSumCalo(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.calories * object.OptimalValue;
          }, 0)
        );
        setSumPrice(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.price * object.OptimalValue;
          }, 0)
        );
        setSumServ(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.serving_size * object.OptimalValue;
          }, 0)
        );
        setSumProtein(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.protein * object.OptimalValue;
          }, 0)
        );
        setSumFat(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.fat * object.OptimalValue;
          }, 0)
        );
        setSumCarb(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.carb * object.OptimalValue;
          }, 0)
        );
      });
    console.log(listOrder);
    // setSumCalo(sum)
  };
  const onSubmit = () => {
    if (userToken) {
      const dataSubmit = {
        name: calories + "_diet",
        description: "none",
        price: Math.round(sumPrice),
        serving_size: Math.round(sumServ),
        calories: Math.round(sumCalo),
        protein: Math.round(sumProtein),
        carb: Math.round(sumCarb),
        fat: Math.round(sumFat),
        ingredients: listOrder,
      };
      console.log(dataSubmit);
      axiosClient
        .post(`${api}/order-items/fromai`, dataSubmit)
        .then(({ data }) => {
          showToast("Success!", "warning", "Đã thêm vào giỏ!");
        })
        .catch((error) => {
          console.log(error);
          showToast("Error!", "error", "Lỗi xảy ra khi thêm vào giỏ!");
        });
    } else {
      showToast("Error!", "error", "Bạn chưa đăng nhập!");
    }
  };

  return (
    <Container mb={30} maxW="80%">
      <Center mt={10} mb={10}>
        <Heading color={"brand.300"} fontSize={"4xl"}>
          Tạo kế hoạch bữa ăn của bạn ngay tại đây trong vài giây.
        </Heading>
      </Center>
      <Center mt={10} mb={20}>
        <Grid
          borderRadius={"5px"}
          boxShadow={"dark-lg"}
          bg={"white"}
          w={"50%"}
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(4, 1fr)"
          columnGap={6}
          p={10}
        >
          <GridItem rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box>
                <Heading fontSize={"2xl"} color={"orange"}>
                  Máy tính theo yêu cầu:
                </Heading>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2}>
            <Stack textAlign={"right"}>
              <Box>
                <Text>Tôi muốn ăn:</Text>
              </Box>
              <Box>
                <Text>Trong 1 ngày tôi ăn:</Text>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2}>
            <Stack textAlign={"left"}>
              <Box>
                <Input
                  type="number"
                  size={"xs"}
                  w={"100px"}
                  value={calories}
                  onChange={(e) => {
                    setCalories(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Select
                  value={plan}
                  size={"xs"}
                  w={"100px"}
                  placeholder="Select option"
                  onChange={(e) => {
                    setPlan(e.target.value);
                  }}
                >
                  <option value={1}>1 bửa</option>
                  <option value={2}>2 bửa</option>
                  <option value={3}>3 bửa</option>
                  <option value={4}>4 bửa</option>
                </Select>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box>
                Bửa ăn của bạn sẽ có: {Math.round(calories / plan)} calories
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box mt={3} position={"relative"}>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Thành phần ăn mà tôi muốn có:
                </Text>
                <Input
                  value={filter}
                  onBlur={handleSearchOver}
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                />
                <Stack
                  zIndex={"100"}
                  boxShadow={ingredientList.length > 0 && "dark-lg"}
                  bgColor={"white"}
                  w={"100%"}
                  position={"absolute"}
                  spacing={0}
                  gap={0}
                  overflowY="auto"
                  maxHeight="300px"
                >
                  {ingredientList
                    .filter((val) => {
                      if (filter == "") {
                        return "";
                      } else if (
                        val.name
                          .toLowerCase()
                          .includes(filter.toLocaleLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((value, index) => {
                      return (
                        <Box
                          borderColor={"black.500"}
                          borderBottomWidth={1}
                          h={"60px"}
                          key={value.id}
                          p={2}
                        >
                          <Flex alignItems={"center"}>
                            <Text>{value.name}</Text>
                            <Spacer />
                            <Button
                              fontSize={"md"}
                              onClick={() => {
                                setIngredients([
                                  ...ingredients,
                                  {
                                    id: value.id,
                                    name: value.name,
                                    quantity: 1,
                                    serving_size: value.serving_size,
                                    index: nextId,
                                  },
                                  // value.name
                                ]);
                                setNextId(nextId + 1);
                              }}
                            >
                              Add
                            </Button>
                          </Flex>
                        </Box>
                      );
                    })}
                </Stack>
                <Stack mt={2}>
                  {ingredients.map((data, index) => {
                    return (
                      <Box>
                        <Flex alignItems={"center"}>
                          <Text>{data.name}</Text>
                          <Spacer />
                          {/* <Input
                            maxW={"80px"}
                            type="number"
                            value={Math.floor(
                              data.serving_size * data.quantity
                            )}
                            onChange={(e) => {
                              handleQtyChange(
                                data.id,
                                (e.target.value / data.serving_size).toFixed(1)
                              );
                            }}
                          /> */}
                          <Text ml={2}>gram</Text>
                          <Button
                            variant={"ghost"}
                            onClick={() => {
                              setIngredients(
                                ingredients.filter(
                                  (a) => a.index !== data.index
                                )
                              );
                              console.log(ingredients);
                            }}
                          >
                            X
                          </Button>
                        </Flex>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box>
                <Button
                  onClick={generate}
                  fontSize={"lg"}
                  colorScheme={"orange"}
                >
                  Tạo thực đơn
                </Button>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Center>
      <Center>
        <Stack w={"70%"}>
          <Heading fontWeight={"medium"} fontSize={"2xl"}>
            Today's Meal Plan
          </Heading>
          <Flex
            borderRadius={"5px"}
            borderColor={"black"}
            p={2}
            borderWidth={"1px"}
          >
            <Icon color={"orange"} boxSize={"24px"} as={BsPieChartFill} />{" "}
            <Text fontWeight={"bold"} fontSize={"md"} ml={2}>
              Kết quả: {Math.round(sumCalo)} Calories.
            </Text>
            <Text fontSize={"md"} ml={2}>
              Yêu cầu: {Math.round(calories / plan)} Calories
            </Text>
            <IconButton
              color="gray"
              ml={2}
              size={"sx"}
              fontSize={"14px"}
              variant="unstyled"
              icon={<InfoIcon />}
            />
          </Flex>
          <Stack>
            {[0].map((value, index) => {
              return (
                <Box p={5} boxShadow={"md"}>
                  <Flex alignItems={"center"}>
                    <Flex>
                      <Box>
                        <Text fontWeight={"medium"} fontSize={"xl"}>
                          {index == 0
                            ? "buổi ăn"
                            : index == 1
                            ? "buổi trưa"
                            : "buổi tối"}
                        </Text>
                        <Text>{Math.round(sumCalo)} calories</Text>
                      </Box>
                      <WrapItem>
                        <PopOverInfo
                          data={{
                            protein: Math.round(sumProtein),
                            carb: Math.round(sumCarb),
                            fat: Math.round(sumFat),
                            calo: Math.round(sumCalo),
                            serving: Math.round(sumServ),
                          }}
                        />
                      </WrapItem>
                    </Flex>
                    <Spacer />
                    <Flex>
                      <Text>Thêm vào giỏ:</Text>
                      <Button
                        colorScheme="orange"
                        ml={2}
                        borderRadius={"none"}
                        size={"xs"}
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        <FaShoppingCart />
                      </Button>
                    </Flex>
                  </Flex>
                  <Grid templateColumns="repeat(4, 1fr)">
                    <GridItem colSpan={2}>
                      <Stack mt={2} mx={"25px"} spacing={2}>
                        {recommendList?.map((value, index) => {
                          return (
                            <Box
                              _hover={{
                                transform: "scale(1.00)",
                                transition: "all 0.2s ease-in-out",
                                boxShadow: "base",
                                borderRadius: "5px",
                              }}
                              transition="all 0.2s ease-in-out"
                            >
                              <Flex alignItems={"center"}>
                                <Image
                                  borderRadius={"10px"}
                                  w={"100px"}
                                  src={`${api_image}/storage/${value.image}`}
                                />
                                <Box ml={"15px"}>
                                  <Text fontSize={"lg"} fontWeight={"medium"}>
                                    {value.name}
                                  </Text>
                                  <Text>
                                    {Math.round(
                                      value.serving_size * value.OptimalValue
                                    )}{" "}
                                    grams
                                  </Text>
                                </Box>
                                <Spacer />
                                <PopOverInfo
                                  data={{
                                    protein: Math.round(
                                      value.protein * value.OptimalValue
                                    ),
                                    carb: Math.round(
                                      value.carb * value.OptimalValue
                                    ),
                                    fat: Math.round(
                                      value.fat * value.OptimalValue
                                    ),
                                    calo: Math.round(
                                      value.calories * value.OptimalValue
                                    ),
                                    serving: Math.round(
                                      value.serving_size * value.OptimalValue
                                    ),
                                    sat_fat: (
                                      value.sat_fat * value.OptimalValue
                                    ).toFixed(1),
                                    trans_fat: (
                                      value.trans_fat * value.OptimalValue
                                    ).toFixed(1),
                                    fiber: (
                                      value.fiber * value.OptimalValue
                                    ).toFixed(1),
                                    sugar: (
                                      value.sugar * value.OptimalValue
                                    ).toFixed(1),
                                    cholesterol: (
                                      value.cholesterol * value.OptimalValue
                                    ).toFixed(1),
                                    sodium: (
                                      value.sodium * value.OptimalValue
                                    ).toFixed(1),
                                    calcium: (
                                      value.calcium * value.OptimalValue
                                    ).toFixed(1),
                                    iron: (
                                      value.iron * value.OptimalValue
                                    ).toFixed(1),
                                    zinc: (
                                      value.zinc * value.OptimalValue
                                    ).toFixed(1),
                                  }}
                                />
                              </Flex>
                            </Box>
                          );
                        })}
                      </Stack>
                    </GridItem>
                    <GridItem colSpan={2}>
                      {recommendList.length > 0 && (
                        <>
                          <Box>Serving size: {Math.round(sumServ)}</Box>
                          <Box>Protein: {Math.round(sumProtein)}</Box>
                          <Box>Fat: {Math.round(sumFat)}</Box>
                          <Box>Carbohydrate: {Math.round(sumCarb)}</Box>
                          <Box fontWeight={"bold"}>
                            Giá:{" "}
                            {Math.round(sumPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            })}{" "}
                            vnđ
                          </Box>
                        </>
                      )}
                    </GridItem>
                  </Grid>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
};

export default DietRecommender;
