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

const PopOverMealInfo = (props) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button colorScheme="yellow">
          <InfoIcon mr={2} />
          Chi tiết
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor={"black"} color="white">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={"bold"}>Nutrion Fact!</PopoverHeader>
        <PopoverBody>
          <Stack>
            <Flex>
              <Text>Serving Size</Text>
              <Spacer />
              <Text>{props.data?.serving_size} gram</Text>
            </Flex>
            <Flex>
              <Text>KCal</Text>
              <Spacer />
              <Text>{props.data?.calories}</Text>
            </Flex>
            <Flex>
              <Text>Protein</Text>
              <Spacer />
              <Text>{props.data?.protein} g</Text>
            </Flex>
            <Flex>
              <Text>Total Carb</Text>
              <Spacer />
              <Text>{props.data?.carb} g</Text>
            </Flex>
            <Flex>
              <Text>Total Fat</Text>
              <Spacer />
              <Text>{props.data?.fat} g</Text>
            </Flex>
            <Flex>
              <Text>Sat Fat</Text>
              <Spacer />
              <Text>{props.data?.sat_fat} g</Text>
            </Flex>
            <Flex>
              <Text>Trans Fat</Text>
              <Spacer />
              <Text>{props.data?.trans_fat} g</Text>
            </Flex>
            <Flex>
              <Text>Fiber</Text>
              <Spacer />
              <Text>{props.data?.fiber} g</Text>
            </Flex>
            <Flex>
              <Text>Sugar</Text>
              <Spacer />
              <Text>{props.data?.sugar} g</Text>
            </Flex>
            <Flex>
              <Text>Cholesterol</Text>
              <Spacer />
              <Text>{props.data?.cholesterol} mg</Text>
            </Flex>
            <Flex>
              <Text>Sodium</Text>
              <Spacer />
              <Text>{props.data?.sodium} mg</Text>
            </Flex>
            <Flex>
              <Text>Iron</Text>
              <Spacer />
              <Text>{props.data?.iron} mg</Text>
            </Flex>
            <Flex>
              <Text>Calcium</Text>
              <Spacer />
              <Text>{props.data?.calcium} mg</Text>
            </Flex>
            <Flex>
              <Text>Zinc</Text>
              <Spacer />
              <Text>{props.data?.zinc} mg</Text>
            </Flex>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOverMealInfo;
