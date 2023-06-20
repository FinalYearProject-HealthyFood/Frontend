import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  WrapItem,
  useToast,
} from "@chakra-ui/react";

import food_14 from "../../../../../assets/food14.png";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import axios from "axios";
import { api, api_ai } from "../../../../../api";
import axiosClient from "../../../../../axios";
import { GiCheckMark, GiHotMeal, GiMeal } from "react-icons/gi";
import { StarIcon } from "@chakra-ui/icons";
import { BsEmojiDizzyFill, BsFillEmojiWinkFill, BsFire } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import PopOverInfo from "./PopOverInfo";
import PopOverIngredients from "./PopOverIngredients";
import { MdEmojiEvents } from "react-icons/md";

const YourPreferBar = (props) => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const [id, setId] = useState(0);
  const [calories, setCalories] = useState(props?.calories);
  const [eatenCalories, seteatenCalories] = useState(props?.eatenCalories);
  const [willEatCalories, setWillEatCalories] = useState(
    props?.willEatCalories
  );
  const [plan, setPlan] = useState(props?.plan);
  const [twoday, setTwoday] = useState(props?.twoday);
  const [today, setToday] = useState(props?.today);
  const [likeList, setLikeList] = useState(props?.likeList);
  const [dislikeList, setDislikeList] = useState(props?.dislikeList);
  const [countDiet, setCountDiet] = useState(props?.countDiet);
  const [recommend, setRecommend] = useState([]);
  const [recommend2, setRecommend2] = useState([]);
  const [recommend3, setRecommend3] = useState([]);
  const [recommend4, setRecommend4] = useState([]);
  const navigate = useNavigate();
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
  // const mifflin_cal = (w, h, a, activity, g) => {
  //   if (g == "male") {
  //     return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
  //   } else {
  //     return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
  //   }
  // };
  useEffect(() => {
    seteatenCalories(props?.eatenCalories);
    setWillEatCalories(props?.willEatCalories);
    setTwoday(props?.twoday);
    setToday(props?.today);
    setLikeList(props?.likeList);
    setDislikeList(props?.dislikeList);
    setCountDiet(props?.countDiet);
    setCalories(props?.calories);
    setPlan(props?.plan);
    console.log(props?.countDiet, "and ", props?.plan);
  }, [
    props.eatenCalories,
    props.twoday,
    props.today,
    props.likeList,
    props.dislikeList,
    props.countDiet,
    props.willEatCalories,
    props.plan,
    props.calories,
  ]);
  useEffect(() => {
    let timer;
    const fetchData = () => {
      if (userToken && currentUser.id) {
        if (likeList.length > 0 || dislikeList.length > 0) {
          axios
            .post(
              `${api_ai}/diet-list`,
              {
                calories: willEatCalories,
                ingredient: likeList,
                noIngredient: dislikeList.filter((itemB) => {
                  return !likeList.some((itemA) => itemA.id === itemB.id);
                }),
                unhealthyfat: true,
                cholesterol: true,
                sugar: true,
                sodium: true,
                calcium: true,
                iron: true,
                zinc: true,
                gender: currentUser.gender,
              },
              {
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
              }
            )
            .then((response) => {
              setRecommend(response.data);
            });
        } else {
          axios
            .post(
              `${api_ai}/diet-list`,
              {
                calories: willEatCalories,
                ingredient: [],
                noIngredient: [],
                unhealthyfat: true,
                cholesterol: true,
                sugar: false,
                sodium: false,
                calcium: false,
                iron: false,
                zinc: false,
                gender: currentUser.gender,
              },
              {
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
              }
            )
            .then((response) => {
              setRecommend(response.data);
            });
        }

        if (twoday.length > 0) {
          axios
            .post(
              `${api_ai}/diet-list`,
              {
                calories: willEatCalories,
                ingredient: [],
                noIngredient: twoday,
                unhealthyfat: true,
                cholesterol: true,
                sugar: false,
                sodium: false,
                calcium: false,
                iron: false,
                zinc: false,
                gender: currentUser.gender,
              },
              {
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
              }
            )
            .then((response) => {
              setRecommend2(response.data);
            });
        } else {
          axios
            .post(
              `${api_ai}/diet-list`,
              {
                calories: willEatCalories,
                ingredient: [],
                noIngredient: [],
                unhealthyfat: false,
                cholesterol: false,
                sugar: false,
                sodium: false,
                calcium: false,
                iron: false,
                zinc: false,
                gender: currentUser.gender,
              },
              {
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
              }
            )
            .then((response) => {
              setRecommend2(response.data);
            });
        }

        if (today.length > 0) {
          axios
            .post(
              `${api_ai}/diet-list`,
              {
                calories: willEatCalories,
                ingredient: [],
                noIngredient: today,
                unhealthyfat: true,
                cholesterol: true,
                sugar: true,
                sodium: true,
                calcium: true,
                iron: true,
                zinc: true,
                gender: currentUser.gender,
              },
              {
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
              }
            )
            .then((response) => {
              setRecommend3(response.data);
            });
        }
        axios
          .post(
            `${api_ai}/diet-list`,
            {
              calories: willEatCalories,
              ingredient: [],
              noIngredient: [],
              unhealthyfat: true,
              cholesterol: true,
              sugar: true,
              sodium: true,
              calcium: true,
              iron: true,
              zinc: true,
              gender: currentUser.gender,
            },
            {
              headers: { "Content-Type": "application/json" },
              mode: "no-cors",
            }
          )
          .then((response) => {
            setRecommend4(response.data);
          });
      } else {
        axios
          .post(
            `${api_ai}/diet-list`,
            {
              calories: 400,
              ingredient: [],
              noIngredient: [],
              unhealthyfat: true,
              cholesterol: true,
              sugar: true,
              sodium: true,
              calcium: true,
              iron: true,
              zinc: true,
              gender: currentUser.gender,
            },
            {
              headers: { "Content-Type": "application/json" },
              mode: "no-cors",
            }
          )
          .then((response) => {
            setRecommend(response.data);
          });
        axios
          .post(
            `${api_ai}/diet-list`,
            {
              calories: 500,
              ingredient: [],
              noIngredient: [],
              unhealthyfat: true,
              cholesterol: true,
              sugar: true,
              sodium: true,
              calcium: true,
              iron: true,
              zinc: true,
              gender: currentUser.gender,
            },
            {
              headers: { "Content-Type": "application/json" },
              mode: "no-cors",
            }
          )
          .then((response) => {
            setRecommend2(response.data);
          });
        axios
          .post(
            `${api_ai}/diet-list`,
            {
              calories: 600,
              ingredient: [],
              noIngredient: [],
              unhealthyfat: true,
              cholesterol: true,
              sugar: true,
              sodium: true,
              calcium: true,
              iron: true,
              zinc: true,
              gender: currentUser.gender,
            },
            {
              headers: { "Content-Type": "application/json" },
              mode: "no-cors",
            }
          )
          .then((response) => {
            setRecommend3(response.data);
          });
        axios
          .post(
            `${api_ai}/diet-list`,
            {
              calories: 700,
              ingredient: [],
              noIngredient: [],
              unhealthyfat: true,
              cholesterol: true,
              sugar: true,
              sodium: true,
              calcium: true,
              iron: true,
              zinc: true,
              gender: currentUser.gender,
            },
            {
              headers: { "Content-Type": "application/json" },
              mode: "no-cors",
            }
          )
          .then((response) => {
            setRecommend4(response.data);
          });
      }
    };

    const delayedFetchData = () => {
      clearTimeout(timer);
      timer = setTimeout(fetchData, 500); // Adjust the delay as needed (in milliseconds)
    };
    delayedFetchData();
    return () => {
      clearTimeout(timer);
    };
  }, [
    // userToken,
    // currentUser.id,
    eatenCalories,
    twoday,
    today,
    likeList,
    dislikeList,
    countDiet,
    willEatCalories,
    plan,
    calories,
  ]);
  const onSubmit = (
    for_me,
    price,
    serving_size,
    calories,
    protein,
    carb,
    fat,
    sat_fat,
    trans_fat,
    fiber,
    sugar,
    cholesterol,
    sodium,
    calcium,
    iron,
    zinc,
    ingredients
  ) => {
    if (userToken) {
      const dataSubmit = {
        name: "Bửa ăn " + calories + "KCal",
        for_me: for_me,
        description:
          "Bửa ăn " + calories + "KCal, Người yêu cầu: " + currentUser.name,
        price: price,
        serving_size: serving_size,
        calories: calories,
        protein: protein,
        carb: carb,
        fat: fat,
        sat_fat: sat_fat,
        trans_fat: trans_fat,
        fiber: fiber,
        sugar: sugar,
        cholesterol: cholesterol,
        sodium: sodium,
        calcium: calcium,
        iron: iron,
        zinc: zinc,
        ingredients: ingredients.map((value, index) => {
          return {
            id: value.id,
            quantity: value.OptimalValue,
          };
        }),
      };
      axiosClient
        .post(`${api}/order-items/fromai`, dataSubmit)
        .then(({ data }) => {
          showToast("Success!", "warning", "Đã thêm vào giỏ!");
        })
        .catch((error) => {
          showToast("Error!", "error", "Lỗi xảy ra khi thêm vào giỏ!");
        });
    } else {
      showToast("Error!", "error", "Bạn chưa đăng nhập!");
    }
  };

  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        spacing={0}
        mb={"50px"}
      >
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
        <Box
          as={"button"}
          borderRadius={"sm"}
          borderWidth={"1px"}
          borderColor={"brand.400"}
          pointerEvents={"none"}
          w={"420px"}
          fontWeight={"medium"}
        >
          <Text color={"brand.400"} shadow={"lg"} fontSize={"xl"}>
            Lựa chọn của bạn
          </Text>
        </Box>
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
      </Stack>
      <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"xl"}>
        {!userToken && (
          <>
            <Text>
              HFS cung cấp 4 khẩu phần ăn có năng lượng là 300 Kcal, 400 Kcal,
              500 Kcal và 600 Kcal.
            </Text>
            <Text>
              Quý khách có thể lựa chọn khẩu phần ăn phù hợp với nhu cầu của cơ
              thể.
            </Text>
            <Text mb={5}>Liên hệ với HFS để được tư vấn chi tiết nhất</Text>
          </>
        )}
        {plan > countDiet ? (
          userToken &&
          (countDiet > 0 ? (
            <>
              {currentUser.weight &&
              currentUser.height &&
              currentUser.age &&
              currentUser.activity &&
              currentUser.gender ? (
                <Text>
                  Theo thông tin của quý khách, quý khách cần nạp khoảng{" "}
                  {calories} calories trong ngày hôm nay.
                </Text>
              ) : (
                <>
                  <Text color={"orange"}>
                    Có vẻ như quý khách vẫn chưa cập nhập đầy đủ chỉ số sức
                    khỏe.
                  </Text>
                  <Text color={"orange"}>
                    Nên chúng tôi sẽ dựa trên 1500 KCal/ 3 bửa ăn trong 1 ngày
                    để đề xuất cho quý khách.
                  </Text>
                  <Text color={"orange"}>
                    Để chúng tôi hiểu thêm về quỳ khách, vui lòng cập thông tin
                    chỉ số sức khỏe tại thông tin tài khoản.
                  </Text>
                </>
              )}
              <Text mt={5}>
                Theo trong hôm nay quý đã ăn {eatenCalories}/{calories} Kcal.
                Chúng tôi sẽ đề xuất bửa ăn tiếp theo gần với {willEatCalories}{" "}
                calories
              </Text>
            </>
          ) : (
            <>
              {currentUser.weight &&
              currentUser.height &&
              currentUser.age &&
              currentUser.activity &&
              currentUser.gender ? (
                <Text>
                  Theo thông tin của quý khách, quý khách cần nạp khoảng{" "}
                  {calories} calories trong ngày hôm nay.
                </Text>
              ) : (
                <>
                  <Text color={"orange"}>
                    Có vẻ như quý khách vẫn chưa cập nhập đầy đủ chỉ số sức
                    khỏe.
                  </Text>
                  <Text color={"orange"}>
                    Nên chúng tôi sẽ dựa trên 1500 KCal/ 3 bửa ăn trong 1 ngày
                    để đề xuất cho quý khách.
                  </Text>
                  <Text color={"orange"}>
                    Để chúng tôi hiểu thêm về quỳ khách, vui lòng cập thông tin
                    chỉ số sức khỏe tại thông tin tài khoản.
                  </Text>
                </>
              )}
              <Text mt={5}>
                Theo trong kế hoạch ăn ngày {currentUser.plan} bửa. Chúng tôi sẽ
                đề xuất những bửa ăn gần với {willEatCalories} calories
              </Text>
            </>
          ))
        ) : (
          <>
            <Text fontWeight={"bold"} color={"brand.500"} fontFamily={"cursive"}>
              Hôm nay bạn đã ăn đủ ngày {plan} bửa với {eatenCalories} / {calories} calories trong
              ngày hôm nay.
            </Text>
            <Heading color={"yellow.500"}>
              <Icon boxSize={"2xs"} as={MdEmojiEvents}/>
            </Heading>
            <Text fontWeight={"bold"} color={"brand.500"} fontFamily={"cursive"}>
              Hẹn bạn lần sau.
            </Text>
          </>
        )}
      </Center>
      {plan > countDiet && (
        <Stack alignItems={"center"} maxW="100%" mt={"50px"}>
          <Flex gap={5}>
            <Stack spacing={5}>
              {recommend?.length > 0 && (
                <Box
                  w={"lg"}
                  h={"2xs"}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Flex>
                    <Box
                      p={5}
                      color={"white"}
                      bgColor={"red.400"}
                      w={"50%"}
                      h={"2xs"}
                    >
                      {userToken ? (
                        likeList.length > 0 || dislikeList.length > 0 ? (
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              Dựa theo lịch sử đánh giá gần đây của bạn,
                            </Heading>
                            <Heading
                              mt={2}
                              fontFamily={"cursive"}
                              color={"yellow"}
                              fontSize={"md"}
                            >
                              * Có vẻ bạn thích:{" "}
                              {likeList.map((data, index) => {
                                if (index == likeList.length - 1) {
                                  return data.name + ". ";
                                } else {
                                  return data.name + ", ";
                                }
                              })}
                            </Heading>
                            <Heading
                              mt={2}
                              fontFamily={"cursive"}
                              color={"black"}
                              fontSize={"md"}
                            >
                              * và không thích:{" "}
                              {dislikeList.map((data, index) => {
                                if (index == dislikeList.length - 1) {
                                  return data.name + ". ";
                                } else {
                                  return data.name + ", ";
                                }
                              })}
                            </Heading>
                            <Center flexDir={"column"}>
                              <Icon mt={2} boxSize={"50px"} as={GiHotMeal} />
                              <Flex mt={0} gap={3}>
                                <Icon as={StarIcon} />
                                <Icon mt={3} as={StarIcon} />
                                <Icon mt={4} as={StarIcon} />
                                <Icon mt={3} as={StarIcon} />
                                <Icon as={StarIcon} />
                              </Flex>
                            </Center>
                          </>
                        ) : (
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              HFS cung cấp bửa ăn
                            </Heading>
                            <Center mt={8} flexDir={"column"}>
                              <Icon mt={2} boxSize={"50px"} as={BsFire} />
                              <Heading fontFamily={"cursive"}>
                                {Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                )}{" "}
                                Kcal
                              </Heading>
                            </Center>
                          </>
                        )
                      ) : (
                        <>
                          <Heading fontFamily={"cursive"} fontSize={"md"}>
                            HFS cung cấp bửa ăn
                          </Heading>
                          <Center mt={8} flexDir={"column"}>
                            <Icon mt={2} boxSize={"50px"} as={BsFire} />
                            <Heading fontFamily={"cursive"}>
                              {Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calories * object.OptimalValue
                                  );
                                }, 0)
                              )}{" "}
                              Kcal
                            </Heading>
                          </Center>
                        </>
                      )}
                    </Box>
                    <Box p={5} bgColor={"white"} w={"50%"} h={"2xs"}>
                      <Center>
                        <Heading
                          mr={"5"}
                          fontFamily={"cursive"}
                          fontSize={"md"}
                        >
                          {userToken
                            ? likeList.length > 0 || dislikeList.length > 0
                              ? "Theo sở thích"
                              : "HFS Meal"
                            : "HFS Meal"}
                        </Heading>
                        <WrapItem alignItems={"center"}>
                          <PopOverInfo
                            data={{
                              calo: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calories * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              protein: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.protein * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              carb: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.carb * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fat: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sat_fat: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sat_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              trans_fat: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.trans_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fiber: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fiber * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sugar: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sugar * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              cholesterol: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.cholesterol * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sodium: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sodium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              calcium: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calcium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              iron: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.iron * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              zinc: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.zinc * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              serving: Math.round(
                                recommend.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.serving_size * object.OptimalValue
                                  );
                                }, 0)
                              ),
                            }}
                          />
                          <PopOverIngredients data={recommend} />
                        </WrapItem>
                      </Center>
                      <Stack mt={5} gap={0}>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Kcal:{" "}
                          {Math.round(
                            recommend.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.calories * object.OptimalValue
                              );
                            }, 0)
                          )}
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Serving:{" "}
                          {Math.round(
                            recommend.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.serving_size * object.OptimalValue
                              );
                            }, 0)
                          )}{" "}
                          grams
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Giá:{" "}
                          {Math.round(
                            recommend.reduce((accumulator, object) => {
                              return (
                                accumulator + object.price * object.OptimalValue
                              );
                            }, 0)
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}{" "}
                          vnđ
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"xs"}>
                          <Icon as={GiCheckMark} /> Căn bằng: unhealthyfat,
                          Cholesterol, đường, sodium, calcium, iron, zinc.
                        </Text>
                        <Flex>
                          <Spacer />
                          <Text>Thêm vào giỏ:</Text>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"xs"}
                            onClick={() => {
                              onSubmit(
                                "yes",
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.price * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.serving_size * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.protein * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.carb * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sat_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.trans_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fiber * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sugar * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.cholesterol * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sodium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calcium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.iron * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.zinc * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                recommend
                              );
                            }}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
              )}
              {recommend2?.length > 0 && (
                <Box
                  w={"lg"}
                  h={"2xs"}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Flex>
                    <Box
                      p={5}
                      color={"white"}
                      bgColor={"red.400"}
                      w={"50%"}
                      h={"2xs"}
                    >
                      {userToken ? (
                        twoday.length > 0 ? (
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              Theo những gì bạn đã ăn những ngày này có thể bạn
                              đã ngán:
                            </Heading>
                            <Heading
                              color={"black"}
                              fontFamily={"cursive"}
                              fontSize={"md"}
                            >
                              {twoday.map((data, index) => {
                                if (index == twoday.length - 1) {
                                  return data.name + ". ";
                                } else {
                                  return data.name + ", ";
                                }
                              })}
                            </Heading>
                            <Center gap={2}>
                              <Icon
                                mt={8}
                                boxSize={"50px"}
                                as={BsEmojiDizzyFill}
                              />
                              <Icon mt={8} boxSize={"50px"} as={GiMeal} />
                            </Center>
                          </>
                        ) : (
                          <>
                            <>
                              <Heading fontFamily={"cursive"} fontSize={"md"}>
                                HFS cung cấp bửa ăn
                              </Heading>
                              <Center mt={8} flexDir={"column"}>
                                <Icon mt={2} boxSize={"50px"} as={BsFire} />
                                <Heading fontFamily={"cursive"}>
                                  {Math.round(
                                    recommend2.reduce((accumulator, object) => {
                                      return (
                                        accumulator +
                                        object.calories * object.OptimalValue
                                      );
                                    }, 0)
                                  )}{" "}
                                  Kcal
                                </Heading>
                              </Center>
                            </>
                          </>
                        )
                      ) : (
                        <>
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              HFS cung cấp bửa ăn
                            </Heading>
                            <Center mt={8} flexDir={"column"}>
                              <Icon mt={2} boxSize={"50px"} as={BsFire} />
                              <Heading fontFamily={"cursive"}>
                                {Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                )}{" "}
                                Kcal
                              </Heading>
                            </Center>
                          </>
                        </>
                      )}
                    </Box>
                    <Box p={5} bgColor={"white"} w={"50%"} h={"2xs"}>
                      <Center>
                        <Heading mr={5} fontFamily={"cursive"} fontSize={"md"}>
                          {userToken
                            ? twoday.length > 0
                              ? "Quá ngán"
                              : "HFS Meal"
                            : "HFS Meal"}
                        </Heading>
                        <WrapItem alignItems={"center"}>
                          <PopOverInfo
                            data={{
                              calo: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calories * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              protein: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.protein * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              carb: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.carb * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fat: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sat_fat: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sat_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              trans_fat: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.trans_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fiber: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fiber * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sugar: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sugar * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              cholesterol: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.cholesterol * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sodium: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sodium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              calcium: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calcium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              iron: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.iron * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              zinc: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.zinc * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              serving: Math.round(
                                recommend2.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.serving_size * object.OptimalValue
                                  );
                                }, 0)
                              ),
                            }}
                          />
                          <PopOverIngredients data={recommend2} />
                        </WrapItem>
                      </Center>
                      <Stack mt={5} gap={0}>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Kcal:{" "}
                          {Math.round(
                            recommend2.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.calories * object.OptimalValue
                              );
                            }, 0)
                          )}
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Serving:{" "}
                          {Math.round(
                            recommend2.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.serving_size * object.OptimalValue
                              );
                            }, 0)
                          )}{" "}
                          grams
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Giá:{" "}
                          {Math.round(
                            recommend2.reduce((accumulator, object) => {
                              return (
                                accumulator + object.price * object.OptimalValue
                              );
                            }, 0)
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}{" "}
                          vnđ
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"xs"}>
                          <Icon as={GiCheckMark} /> Căn bằng: unhealthyfat,
                          Cholesterol, đường, sodium, calcium, iron, zinc.
                        </Text>
                        <Flex>
                          <Spacer />
                          <Text>Thêm vào giỏ:</Text>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"xs"}
                            onClick={() => {
                              onSubmit(
                                "yes",
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.price * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.serving_size * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.protein * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.carb * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sat_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.trans_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fiber * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sugar * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.cholesterol * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sodium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calcium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.iron * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend2.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.zinc * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                recommend2
                              );
                            }}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
              )}
            </Stack>
            <Stack spacing={5}>
              {recommend3?.length > 0 && (
                <Box
                  w={"lg"}
                  h={"2xs"}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Flex>
                    <Box
                      p={5}
                      color={"white"}
                      bgColor={"red.400"}
                      w={"50%"}
                      h={"2xs"}
                    >
                      {userToken && today?.length ? (
                        <>
                          <Heading fontFamily={"cursive"} fontSize={"md"}>
                            Dựa theo hôm nay, có vẻ bạn đã ăn:
                          </Heading>
                          <Heading
                            color={"black"}
                            fontFamily={"cursive"}
                            fontSize={"md"}
                          >
                            {today.map((data, index) => {
                              if (index == today.length - 1) {
                                return data.name + ". ";
                              } else {
                                return data.name + ", ";
                              }
                            })}
                          </Heading>
                          <Center gap={3}>
                            <Icon
                              mt={5}
                              boxSize={"50px"}
                              as={BsFillEmojiWinkFill}
                            />
                            <Icon mt={5} boxSize={"50px"} as={GiMeal} />
                          </Center>
                          <Heading
                            mt={3}
                            fontFamily={"cursive"}
                            fontSize={"md"}
                          >
                            Hãy để chúng tôi chọn cho bạn cái khác.
                          </Heading>
                        </>
                      ) : (
                        <>
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              HFS cung cấp bửa ăn
                            </Heading>
                            <Center mt={8} flexDir={"column"}>
                              <Icon mt={2} boxSize={"50px"} as={BsFire} />
                              <Heading fontFamily={"cursive"}>
                                {Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                )}{" "}
                                Kcal
                              </Heading>
                            </Center>
                          </>
                        </>
                      )}
                    </Box>
                    <Box p={5} bgColor={"white"} w={"50%"} h={"2xs"}>
                      <Center>
                        <Heading mr={5} fontFamily={"cursive"} fontSize={"md"}>
                          {userToken && today?.length > 0
                            ? "Bửa ăn đa dạng"
                            : "HFS Meal"}
                        </Heading>
                        <WrapItem alignItems={"center"}>
                          <PopOverInfo
                            data={{
                              calo: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calories * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              protein: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.protein * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              carb: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.carb * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fat: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sat_fat: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sat_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              trans_fat: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.trans_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fiber: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fiber * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sugar: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sugar * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              cholesterol: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.cholesterol * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sodium: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sodium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              calcium: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calcium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              iron: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.iron * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              zinc: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.zinc * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              serving: Math.round(
                                recommend3.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.serving_size * object.OptimalValue
                                  );
                                }, 0)
                              ),
                            }}
                          />
                          <PopOverIngredients data={recommend3} />
                        </WrapItem>
                      </Center>
                      <Stack mt={5} gap={0}>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Kcal:{" "}
                          {Math.round(
                            recommend3.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.calories * object.OptimalValue
                              );
                            }, 0)
                          )}
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Serving:{" "}
                          {Math.round(
                            recommend3.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.serving_size * object.OptimalValue
                              );
                            }, 0)
                          )}{" "}
                          grams
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Giá:{" "}
                          {Math.round(
                            recommend3.reduce((accumulator, object) => {
                              return (
                                accumulator + object.price * object.OptimalValue
                              );
                            }, 0)
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}{" "}
                          vnđ
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"xs"}>
                          <Icon as={GiCheckMark} /> Căn bằng: unhealthyfat,
                          Cholesterol, đường, sodium, calcium, iron, zinc.
                        </Text>
                        <Flex>
                          <Spacer />
                          <Text>Thêm vào giỏ:</Text>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"xs"}
                            onClick={() => {
                              onSubmit(
                                "yes",
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.price * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.serving_size * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.protein * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.carb * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sat_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.trans_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fiber * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sugar * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.cholesterol * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sodium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calcium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.iron * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend3.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.zinc * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                recommend3
                              );
                            }}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
              )}
              {recommend4?.length > 0 && (
                <Box
                  w={"lg"}
                  h={"2xs"}
                  cursor="pointer"
                  borderRadius={"xl"}
                  boxShadow={"2xl"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Flex>
                    <Box
                      p={5}
                      color={"white"}
                      bgColor={"red.400"}
                      w={"50%"}
                      h={"2xs"}
                    >
                      {userToken ? (
                        <>
                          <Heading fontFamily={"cursive"} fontSize={"md"}>
                            Order như thông thường và không có yêu cầu gì cả,
                            HFS đề xuất cho bạn khẩu phần ăn này
                          </Heading>
                          <Center flexDir={"column"}>
                            <Icon mt={2} boxSize={"50px"} as={GiHotMeal} />
                            <Flex mt={0} gap={3}>
                              <Text
                                fontSize={"lg"}
                                fontWeight={"bold"}
                                fontFamily={"cursive"}
                              >
                                HFS
                              </Text>
                            </Flex>
                          </Center>
                        </>
                      ) : (
                        <>
                          <>
                            <Heading fontFamily={"cursive"} fontSize={"md"}>
                              HFS cung cấp bửa ăn
                            </Heading>
                            <Center mt={8} flexDir={"column"}>
                              <Icon mt={2} boxSize={"50px"} as={BsFire} />
                              <Heading fontFamily={"cursive"}>
                                {Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                )}{" "}
                                Kcal
                              </Heading>
                            </Center>
                          </>
                        </>
                      )}
                    </Box>
                    <Box p={5} bgColor={"white"} w={"50%"} h={"2xs"}>
                      <Center>
                        <Heading mr={5} fontFamily={"cursive"} fontSize={"md"}>
                          {userToken ? "Thông thường" : "HFS Meal"}
                        </Heading>
                        <WrapItem alignItems={"center"}>
                          <PopOverInfo
                            data={{
                              calo: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calories * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              protein: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.protein * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              carb: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.carb * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fat: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sat_fat: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sat_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              trans_fat: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.trans_fat * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              fiber: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.fiber * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sugar: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sugar * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              cholesterol: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.cholesterol * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              sodium: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.sodium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              calcium: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.calcium * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              iron: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.iron * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              zinc: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.zinc * object.OptimalValue
                                  );
                                }, 0)
                              ),
                              serving: Math.round(
                                recommend4.reduce((accumulator, object) => {
                                  return (
                                    accumulator +
                                    object.serving_size * object.OptimalValue
                                  );
                                }, 0)
                              ),
                            }}
                          />
                          <PopOverIngredients data={recommend4} />
                        </WrapItem>
                      </Center>
                      <Stack mt={5} gap={0}>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Kcal:{" "}
                          {Math.round(
                            recommend4.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.calories * object.OptimalValue
                              );
                            }, 0)
                          )}
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Serving:{" "}
                          {Math.round(
                            recommend4.reduce((accumulator, object) => {
                              return (
                                accumulator +
                                object.serving_size * object.OptimalValue
                              );
                            }, 0)
                          )}{" "}
                          grams
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"md"}>
                          Giá:{" "}
                          {Math.round(
                            recommend4.reduce((accumulator, object) => {
                              return (
                                accumulator + object.price * object.OptimalValue
                              );
                            }, 0)
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })}{" "}
                          vnđ
                        </Text>
                        <Text fontFamily={"cursive"} fontSize={"xs"}>
                          <Icon as={GiCheckMark} /> Căn bằng: unhealthyfat,
                          Cholesterol, đường, sodium, calcium, iron, zinc.
                        </Text>
                        <Flex>
                          <Spacer />
                          <Text>Thêm vào giỏ:</Text>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"xs"}
                            onClick={() => {
                              onSubmit(
                                "yes",
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.price * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.serving_size * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calories * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.protein * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.carb * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sat_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.trans_fat * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.fiber * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sugar * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.cholesterol * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.sodium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.calcium * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.iron * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                Math.round(
                                  recommend4.reduce((accumulator, object) => {
                                    return (
                                      accumulator +
                                      object.zinc * object.OptimalValue
                                    );
                                  }, 0)
                                ),
                                recommend4
                              );
                            }}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                </Box>
              )}
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
};

export default YourPreferBar;
