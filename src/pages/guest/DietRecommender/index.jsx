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
  Switch,
  Checkbox,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPieChartFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import sample_2 from "../../../assets/Sample 2.png";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { api, api_ai, api_image } from "../../../api";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import PopOverInfo from "./PopOverInfo";

const DietRecommender = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const location = useLocation();
  const [calories, setCalories] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState(currentUser.id ? currentUser.plan : 3);
  const [recommendList, setRecommendList] = useState([]);
  const [sumCalo, setSumCalo] = useState(0);
  const [sumServ, setSumServ] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumCarb, setSumCarb] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [sumSatFat, setSumSatFat] = useState(0);
  const [sumTrans_fat, setSumTrans_fat] = useState(0);
  const [sumFiber, setSumFiber] = useState(0);
  const [sumSugar, setSumSugar] = useState(0);
  const [sumCholesterol, setSumCholesterol] = useState(0);
  const [sumSodium, setSumSodium] = useState(0);
  const [sumCalcium, setSumCalcium] = useState(0);
  const [sumIron, setSumIron] = useState(0);
  const [sumZinc, setSumZinc] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [filter, setFilter] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [eatenIngredients, setEatenIngredients] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [personal, setPersonal] = useState(false);

  const [unhealthyFatChecked, setUnhealthyFatChecked] = useState(true);
  const [cholesterolChecked, setCholesterolChecked] = useState(true);
  const [sugarChecked, setSugarChecked] = useState(true);
  const [sodiumChecked, setSodiumChecked] = useState(true);
  const [calciumChecked, setCalciumChecked] = useState(true);
  const [ironChecked, setIronChecked] = useState(true);
  const [zincChecked, setZincChecked] = useState(true);
  const [gramOn, setGramOn] = useState(false);
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
  function getTopOccurrences(arr, m) {
    const counter = {};
    for (const item of arr) {
      const key = item.id + "-" + item.name;
      counter[key] = (counter[key] || 0) + 1;
    }

    const sortedOccurrences = Object.entries(counter)
      .filter(([key, count]) => count > 1) // Filter occurrences with count > 1
      .sort((a, b) => b[1] - a[1]);
    const topOccurrences = sortedOccurrences.slice(0, m);

    const result = topOccurrences.map(([key]) => {
      const [id, name] = key.split("-");
      return { id: parseInt(id), name };
    });

    return result;
  }
  useEffect(() => {
    if (userToken) {
      axiosClient
        .post("/order-items/delivery-last-2-days-by-user")
        .then((response) => {
          console.log(
            response.data.flatMap((item) =>
              item.meal.ingredients.map((ingredient) => {
                return { id: ingredient.id, name: ingredient.name };
              })
            )
          );
          // response.data.flatMap(item => item.meals.ingredients.map(ingredient => ingredient))
          setEatenIngredients(
            getTopOccurrences(
              response.data.flatMap((item) =>
                item.meal.ingredients.map((ingredient) => {
                  return { id: ingredient.id, name: ingredient.name };
                })
              ),
              5
            )
          );
          data = response.data.flatMap((item) =>
            item.meal.ingredients.map((ingredient) => ingredient)
          );
          console.log(data);
        })
        .catch((error) => {});
    }
  }, [personal]);
  useEffect(() => {
    console.log(eatenIngredients);
    setCalories(location.state.calories);
    axios.get(`${api}/ingredients/all-filter`).then((response) => {
      setIngredientList(response.data);
    });
    setName("bữa ăn " + calories + " KCal");
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
          index: value.index,
        };
      } else {
        // The rest haven't changed
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: value.quantity,
          index: value.index,
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
    console.log({
      calories: Math.round(calories / plan),
      ingredient: ingredients,
      noIngredient: eatenIngredients.filter((itemB) => {
        return !ingredients.some((itemA) => itemA.id === itemB.id);
      }),
    });
    axios
      .post(
        `${api_ai}/diet-list`,
        {
          calories: Math.round(calories / plan),
          ingredient: ingredients,
          noIngredient: eatenIngredients.filter((itemB) => {
            return !ingredients.some((itemA) => itemA.id === itemB.id);
          }),
          unhealthyfat: unhealthyFatChecked,
          cholesterol: cholesterolChecked,
          sugar: sugarChecked,
          sodium: sodiumChecked,
          calcium: calciumChecked,
          iron: ironChecked,
          zinc: zincChecked,
          gramon: gramOn,
        },
        {
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
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
        setSumFat(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.sat_fat * object.OptimalValue;
          }, 0)
        );
        setSumTrans_fat(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.trans_fat * object.OptimalValue;
          }, 0)
        );
        setSumFiber(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.fiber * object.OptimalValue;
          }, 0)
        );
        setSumSugar(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.sugar * object.OptimalValue;
          }, 0)
        );
        setSumCholesterol(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.cholesterol * object.OptimalValue;
          }, 0)
        );
        setSumSodium(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.sodium * object.OptimalValue;
          }, 0)
        );
        setSumCalcium(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.calcium * object.OptimalValue;
          }, 0)
        );
        setSumIron(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.iron * object.OptimalValue;
          }, 0)
        );
        setSumZinc(
          response.data.reduce((accumulator, object) => {
            return accumulator + object.zinc * object.OptimalValue;
          }, 0)
        );
        showToast("Success!", "success", "Tạo thực đơn thành công!");
      });
    console.log(listOrder);
    // setSumCalo(sum)
  };
  const onSubmit = () => {
    if (userToken) {
      const dataSubmit = {
        name: name,
        for_me: personal ? "yes" : "no",
        description:
          "bữa ăn " + calories + "KCal, Người yêu cầu:" + currentUser.name,
        price: Math.round(sumPrice),
        serving_size: Math.round(sumServ),
        calories: Math.round(sumCalo),
        protein: Math.round(sumProtein),
        carb: Math.round(sumCarb),
        fat: Math.round(sumFat),
        sat_fat: sumSatFat.toFixed(1),
        trans_fat: sumTrans_fat.toFixed(1),
        fiber: sumFiber.toFixed(1),
        sugar: sumSugar.toFixed(1),
        cholesterol: sumCholesterol.toFixed(1),
        sodium: sumSodium.toFixed(1),
        calcium: sumCalcium.toFixed(1),
        iron: sumIron.toFixed(1),
        zinc: sumZinc.toFixed(1),
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
      <Center mt={10} mb={5}>
        <Grid
          borderRadius={"5px"}
          boxShadow={"base"}
          bg={"white"}
          w={"50%"}
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(1, 1fr)"
          columnGap={6}
          p={10}
        >
          <GridItem
            rowSpan={1}
            colSpan={4}
            alignItems={"center"}
            textAlign={"right"}
          >
            {userToken && Object.keys(currentUser).length !== 0 && (
              <Flex flexDirection={"row-reverse"} gap={2} alignItems={"center"}>
                <Switch
                  checked={personal}
                  onChange={(e) => {
                    setPersonal(e.target.checked);
                    console.log(personal);
                  }}
                />
                <Text
                  color={personal ? "blue.500" : "gray"}
                  fontWeight={"bold"}
                >
                  Chỉ riêng tôi:
                </Text>
              </Flex>
            )}
          </GridItem>
          <GridItem rowSpan={1} colSpan={4} mb={2}>
            <Stack textAlign={"center"}>
              <Box>
                <Heading fontSize={"2xl"} color={"orange"}>
                  Máy tính theo yêu cầu:
                </Heading>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2} mt={2}>
            <Stack textAlign={"right"}>
              <Box>
                <Text>Tôi muốn ăn:</Text>
              </Box>
              <Box>
                <Text>Trong 1 ngày tôi ăn:</Text>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2} mt={2}>
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
                  // placeholder="Select option"
                  onChange={(e) => {
                    setPlan(e.target.value);
                  }}
                >
                  <option value={1}>1 bữa</option>
                  <option value={2}>2 bữa</option>
                  <option value={3}>3 bữa</option>
                  <option value={4}>4 bữa</option>
                </Select>
              </Box>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4} mt={2}>
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
                                    serving_size: value.serving_size,
                                    quantity: 1,
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
                  {ingredients.length > 0 && (
                    <Checkbox
                      colorScheme="orange"
                      defaultChecked={gramOn}
                      onChange={(e) => setGramOn(e.target.checked)}
                    >
                      Điều chỉnh lượng gram
                    </Checkbox>
                  )}
                  {ingredients.map((data, index) => {
                    return (
                      <Box key={data.id}>
                        <Flex alignItems={"center"}>
                          <Text>{data.name}</Text>
                          <Spacer />
                          {gramOn && (
                            <>
                              {/* <Input
                                maxW={"80px"}
                                type="number"
                                value={Math.floor(
                                  data.serving_size * data.quantity
                                )}
                                onChange={(e) => {
                                  handleQtyChange(
                                    data.id,
                                    (
                                      e.target.value / data.serving_size
                                    ).toFixed(1)
                                  );
                                }}
                              /> */}
                              <NumberInput
                                maxW="80px"
                                mr="2rem"
                                max={300}
                                min={10}
                                value={Math.floor(
                                  data.serving_size * data.quantity
                                )}
                                onChange={(value) => {
                                  handleQtyChange(
                                    data.id,
                                    (value / data.serving_size).toFixed(1)
                                  );
                                }}
                              >
                                <NumberInputField />
                              </NumberInput>
                              <Text ml={2}>gram</Text>
                            </>
                          )}
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

          <GridItem borderWidth={1} p={5} mb={5} mt={5} rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box mb={2}>
                <Text>
                  Các răng buộc tối ưu về thành phần dinh dưỡng vi lượng:
                </Text>
              </Box>
              <Box>
                <SimpleGrid
                  justifyItems="center"
                  spacing={5}
                  columns={[1, 2, 3]}
                >
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={unhealthyFatChecked}
                    onChange={(e) => setUnhealthyFatChecked(e.target.checked)}
                  >
                    Unhealthy fat
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={cholesterolChecked}
                    onChange={(e) => setCholesterolChecked(e.target.checked)}
                  >
                    Cholesterol
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={sugarChecked}
                    onChange={(e) => setSugarChecked(e.target.checked)}
                  >
                    Sugar
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={sodiumChecked}
                    onChange={(e) => setSodiumChecked(e.target.checked)}
                  >
                    Sodium
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={calciumChecked}
                    onChange={(e) => setCalciumChecked(e.target.checked)}
                  >
                    Calcium
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={ironChecked}
                    onChange={(e) => setIronChecked(e.target.checked)}
                  >
                    Iron
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    defaultChecked={zincChecked}
                    onChange={(e) => setZincChecked(e.target.checked)}
                  >
                    Zinc
                  </Checkbox>
                </SimpleGrid>
              </Box>
            </Stack>
          </GridItem>
          <GridItem mb={5} rowSpan={1} colSpan={4}>
            <Stack textAlign={"center"}>
              <Box
                color={"green"}
                mt={2}
                fontSize={"xl"}
                fontWeight={"extrabold"}
              >
                bữa ăn của bạn sẽ có: {Math.round(calories / plan)} Calories
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
      {personal == true && eatenIngredients.length > 0 && (
        <Center mb={20}>
          <Box
            borderRadius={3}
            color={"white"}
            bgColor={"black"}
            w={"40%"}
            p={10}
            boxShadow={"md"}
          >
            <Stack alignItems={"left"}>
              <Heading fontSize={"lg"} color={"yellow"}>
                <Icon as={InfoIcon} /> Dựa theo 2 ngày kể từ bây giờ, Đây là
                danh sách những thành phần bạn đã ăn quá 2 lần:
              </Heading>
              {eatenIngredients
                .filter((itemB) => {
                  return !ingredients.some((itemA) => itemA.id === itemB.id);
                })
                .map((data, index) => {
                  return (
                    <Box key={data.id}>
                      <Flex alignItems={"center"}>
                        <Text>{data.name}</Text>
                        <Spacer />
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setEatenIngredients(
                              eatenIngredients.filter((a) => a.id !== data.id)
                            );
                            console.log(eatenIngredients);
                          }}
                        >
                          X
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              <Text color={"green.200"}>
                Chúng tôi sẽ không đề xuất các thành phần trong danh sách này
                cho bạn nữa.
              </Text>
            </Stack>
          </Box>
        </Center>
      )}
      {recommendList.length > 0 && (
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
              <Box p={5} boxShadow={"md"}>
                <Flex alignItems={"center"}>
                  <Flex gap={2}>
                    <Box>
                      <Text fontWeight={"medium"} fontSize={"xl"}>
                        Buổi ăn
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
                          sat_fat: sumSatFat.toFixed(1),
                          trans_fat: sumTrans_fat.toFixed(1),
                          fiber: sumFiber.toFixed(1),
                          sugar: sumSugar.toFixed(1),
                          cholesterol: sumCholesterol.toFixed(1),
                          sodium: sumSodium.toFixed(1),
                          calcium: sumCalcium.toFixed(1),
                          iron: sumIron.toFixed(1),
                          zinc: sumZinc.toFixed(1),
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
                <Grid my={3} gap={5} templateColumns="repeat(4, 1fr)">
                  <GridItem textAlign={"right"} colSpan={1}>
                    <Text fontWeight={"medium"} fontSize={"xl"}>
                      Đặt tên:
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Input size={"md"} fontWeight={"medium"} fontSize={"xl"} value={name} onChange={(e)=> {setName(e.target.value)}} />
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(4, 1fr)">
                  <GridItem colSpan={2}>
                    <Stack mt={2} mx={"25px"} spacing={2}>
                      {recommendList?.map((value, index) => {
                        return (
                          <Box
                            key={index}
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
                        <Box>Serving size: {Math.round(sumServ)} gram</Box>
                        <Box>Protein: {Math.round(sumProtein)} g</Box>
                        <Box>Fat: {Math.round(sumFat)} g</Box>
                        <Box>Carbohydrate: {Math.round(sumCarb)} g</Box>
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
            </Stack>
          </Stack>
        </Center>
      )}
    </Container>
  );
};

export default DietRecommender;
