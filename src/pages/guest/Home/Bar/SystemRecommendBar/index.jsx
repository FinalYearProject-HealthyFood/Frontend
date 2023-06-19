import React from "react";
import {
  Box,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Center,
  Image,
  Button,
  Flex,
  IconButton,
  Spacer,
  Progress,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import food_14 from "../../../../../assets/food14.png";
import { StarIcon } from "@chakra-ui/icons";
import { BsFire } from "react-icons/bs";
import { FaShoppingCart, FaHeart } from "react-icons/fa"
import MealList from "./MealList";
import IngredientList from "./IngredientList";


const SystemRecommendBar = (props) => {
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        spacing={0}
      >
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
        <Box
          as={"button"}
          borderRadius={"sm"}
          borderWidth={"1px"}
          borderColor={"brand.400"}
          pointerEvents={"none"}
          w={"450px"}
          fontWeight={"medium"}
        >
          <Text color={"brand.400"} shadow={"lg"} fontSize={"xl"}>
            Gợi ý của chúng tôi
          </Text>
        </Box>
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
      </Stack>
      <Stack alignItems={"center"} maxW="100%" my={"40px"}>
        <IngredientList/>
        <MealList/>
      </Stack>
    </>
  );
};

export default SystemRecommendBar;
