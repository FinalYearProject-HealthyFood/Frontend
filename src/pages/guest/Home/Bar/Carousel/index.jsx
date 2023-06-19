import {
  Center,
  HStack,
  Image,
  Flex,
  Radio,
  RadioGroup,
  Link,
  Box,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const Carousel = (props) => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const [id, setId] = useState(0);
  const [calories, setCalories] = useState(2000);
  const navigate = useNavigate();
  const mifflin_cal = (w, h, a, activity, g) => {
    if (g == "male") {
      return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
    } else {
      return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
    }
  };
  useEffect(() => {
    if (userToken && currentUser.id) {
      if (
        currentUser.weight &&
        currentUser.height &&
        currentUser.age &&
        currentUser.activity &&
        currentUser.gender
      ) {
        setCalories(
          mifflin_cal(
            currentUser.weight,
            currentUser.height,
            currentUser.age,
            currentUser.activity,
            currentUser.gender
          )
        );
      }
    }
  }, [userToken, currentUser]);
  function autoCount() {
    if (id >= props.data.length - 1) {
      setId(0);
    } else {
      setId(id + 1);
    }
  }
  function handleClickRight() {
    if (id < props.data.length - 1) {
      setId(id + 1);
    } else {
      setId(0);
    }
  }
  function handleClickLeft() {
    if (id !== 0) {
      setId(id - 1);
    } else {
      setId(2);
    }
  }
  useEffect(() => {
    let time = setInterval(autoCount, 5000);
    return () => clearInterval(time);
  });
  return (
    <Center bgColor="#00051D">
      <Flex w="5xl" h="lg" overflow="hidden">
        {props.data.map((meal, index) => (
          <Box color={"white"} key={index}>
            <Box position={"relative"}>
              <Box
                cursor={"pointer"}
                _hover={{
                  bgColor: "rgba(0, 0, 0, 0.6)",
                  opacity: "100%",
                  transition: "all 0.2s ease-in-out",
                }}
                // opacity={0}
                transition="1s"
                position={"absolute"}
                ml={`${id * -100}%`}
                bgColor="rgba(0, 0, 0, 0.2)"
                minW="5xl"
                h="lg"
                borderLeft={"1px"}
                borderRight={"1px"}
                p={20}
              >
                <Heading
                  mt={"10%"}
                  fontFamily={"cursive"}
                  fontWeight={"bold"}
                  color={"white"}
                  noOfLines={2}
                  w={"3xl"}
                  fontStyle={"italic"}
                  textShadow={"dark-lg"}
                  dropShadow={"dark-lg"}
                >
                  {meal.title}
                </Heading>
                <Button
                  fontFamily={"cursive"}
                  fontWeight={"bold"}
                  variant={"outline"}
                  color={"white"}
                  colorScheme="brand"
                  mt={5}
                  onClick={() => {
                    navigate(meal.url, {
                      state: {
                        calories: calories,
                      },
                    });
                  }}
                >
                  Click tại đây
                </Button>
              </Box>
              <Image
                src={`${meal.img}`}
                ml={`${id * -100}%`}
                minW="5xl"
                transition="all 0.3s ease-in-out"
                objectFit="cover"
                h="lg"
                borderLeft={"1px"}
                borderRight={"1px"}
              />
            </Box>
          </Box>
        ))}
      </Flex>
      <RadioGroup mt="400px" pos="absolute" color="white" value={id}>
        <HStack>
          {Array.from({ length: props.data.length }).map((_, index) => (
            <Radio
              key={index}
              value={index}
              colorScheme="brand"
              onClick={() => {
                setId(index);
              }}
            />
          ))}
        </HStack>
      </RadioGroup>
      <HStack spacing={900} pos="absolute" color="white">
        <ArrowBackIcon
          onClick={handleClickLeft}
          cursor="pointer"
          boxSize="48px"
        />
        <ArrowForwardIcon
          onClick={handleClickRight}
          cursor="pointer"
          boxSize="48px"
        />
      </HStack>
    </Center>
  );
};

export default Carousel;
