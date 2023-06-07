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

const PopOverInfo = (props) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton
          color="gray"
          mr={2}
          size={"sx"}
          fontSize={"14px"}
          variant="unstyled"
          icon={<InfoIcon />}
        />
      </PopoverTrigger>
      <PopoverContent bgColor={"black"} color="white" >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={"bold"}>Nutrion Fact!</PopoverHeader>
        <PopoverBody>
          <Stack>
            <Flex>
              <Text>Serving Size</Text>
              <Spacer />
              <Text>{props.data?.serving} gram</Text>
            </Flex>
            <Flex>
              <Text>KCal</Text>
              <Spacer />
              <Text>{props.data?.calo}</Text>
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
              <Text>{props.data?.cholesterol} g</Text>
            </Flex>
            <Flex>
              <Text>Sodium</Text>
              <Spacer />
              <Text>{props.data?.sodium} g</Text>
            </Flex>
            <Flex>
              <Text>Iron</Text>
              <Spacer />
              <Text>{props.data?.iron} g</Text>
            </Flex>
            <Flex>
              <Text>Calcium</Text>
              <Spacer />
              <Text>{props.data?.calcium} g</Text>
            </Flex>
            <Flex>
              <Text>Zinc</Text>
              <Spacer />
              <Text>{props.data?.zinc} g</Text>
            </Flex>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOverInfo;
