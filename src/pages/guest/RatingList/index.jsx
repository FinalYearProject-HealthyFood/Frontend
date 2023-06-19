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
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import food_14 from "../../../assets/food14.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { StarIcon } from "@chakra-ui/icons";
import IngredientListR from "./IngredientListR";
import MealListR from "./MealListR";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { api } from "../../../api";

const RatingList = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [dislikeingredients, setDislikeingredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [dislikemeals, setDislikemeals] = useState([]);
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
    axios
      .get(`${api}/meals/get-high-star-list/${currentUser.id}`)
      .then((response) => {
        setMeals(response.data.likedlist);
        setDislikemeals(response.data.dislikedlist);
      });
    axios
      .get(`${api}/ingredients/get-high-star-list/${currentUser.id}`)
      .then((response) => {
        setIngredients(response.data.likedlist);
        setDislikeingredients(response.data.dislikedlist);
      });
  }, []);

  return (
    <>
      {Object.keys(currentUser).length == 0 ? (
        navigate("/")
      ) : (
        <Container maxW={"100%"}>
          <Box my={5}>
            <Flex alignItems={"center"}>
              <Heading color={"brand.500"} fontSize={"4xl"}>
                <StarIcon />
              </Heading>
              <Heading ml={5} color={"brand.500"} fontSize={"4xl"}>
                Đánh giá gần đây của bạn
              </Heading>
            </Flex>
          </Box>
          <Stack maxW="100%" alignItems={"center"}>
            {ingredients.length > 0 ||
            dislikeingredients.length > 0 ||
            meals.length > 0 ||
            dislikemeals.length > 0 ? (
              <>
                <Stack gap={5} maxW="80%" my={"20px"}>
                  <IngredientListR />
                </Stack>
                <Stack gap={5} maxW="80%" my={"20px"}>
                  <MealListR />
                </Stack>
              </>
            ) : (
              <Center py={40} flexDirection={"column"}>
                <Icon color={"brand.500"} boxSize={"150px"} as={StarIcon} />
                <Heading fontFamily={"cursive"} color={"brand.500"}>
                  Không có đánh giá gần đây
                </Heading>
              </Center>
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default RatingList;
