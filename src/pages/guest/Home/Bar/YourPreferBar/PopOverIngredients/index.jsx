import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  IconButton,
  Stack,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoNutrition } from "react-icons/io5";
import { GiMeat } from "react-icons/gi";

const PopOverIngredients = (props) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton
          color="gray"
          mr={2}
          size={"xs"}
          fontSize={"20px"}
          variant="unstyled"
          icon={<GiMeat />}
        />
      </PopoverTrigger>
      <PopoverContent bgColor={"black"} color="white">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={"bold"}>Danh sách thành phần:</PopoverHeader>
        <PopoverBody>
          <Stack>
            {props?.data?.map((value, index) => {
              return (
                <Flex key={index}>
                  <Text>{value.name}</Text>
                  <Spacer />
                  <Text>
                    {Math.round(value.serving_size * value.OptimalValue)} grams
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOverIngredients;
