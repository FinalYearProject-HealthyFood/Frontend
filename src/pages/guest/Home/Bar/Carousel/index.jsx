import {
  Center,
  HStack,
  Image,
  Flex,
  Radio,
  RadioGroup,
  Link,
} from "@chakra-ui/react";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const Carousel = (props) => {
  const [id, setId] = useState(0);
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
    let time = setInterval(autoCount, 4000);
    return () => clearInterval(time);
  });
  return (
    <Center bgColor="#00051D">
      <Flex w="3xl" h="md" overflow="hidden">
        {props.data.map((meal, index) => (
          <Link key={index} >
            <Image
              src={`${meal.img}`}
              ml={`${id * -100}%`}
              minW="3xl"
              objectFit="cover"
              h="md"
              transition="1s"
              key={meal.id}
              borderLeft={"1px"}
              borderRight={"1px"}
            />
          </Link>
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
      <HStack spacing={950} pos="absolute" color="white">
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
