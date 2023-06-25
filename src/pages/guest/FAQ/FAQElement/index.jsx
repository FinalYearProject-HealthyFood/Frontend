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
  Stack,
  Radio,
  RadioGroup,
  HStack,
  VStack,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const FAQElement = (props) => {
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text color={"brand.700"} fontWeight={"bold"} fontSize={"lg"}>
                {props.data.question}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel textAlign="left" pb={4}>
          <Text fontSize={"lg"}>{props.data.answer}</Text>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default FAQElement;
