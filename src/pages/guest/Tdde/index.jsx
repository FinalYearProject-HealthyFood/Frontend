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
  Select 
} from "@chakra-ui/react";
import React from "react";
import Left from "./Left";
import Right from "./Right";

const Tdde = () => {
  return (
    <Container mb={30} maxW="80%">
      <Center mt={10} mb={20}>
        <Heading color={"brand.300"} fontSize={"4xl"}>
          Thông tin TDEE
        </Heading>
      </Center>
      <Center fontSize={"xs"} my={5}>
        <Text mx={2}>Bạn hiện tại là</Text>
        <NumberInput size="xs" maxW={16} defaultValue={22} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>tuổi,</Text>
        <Text mr={2}>cao</Text>
        <NumberInput size="xs" maxW={16} defaultValue={22} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>cm,</Text>
        <Text mr={2}>nặng</Text>
        <NumberInput size="xs" maxW={16} defaultValue={73} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>kg,</Text>
        <Text mr={2}>với mức độ vận động</Text>
        <Select defaultValue={"4"} size={"xs"} w={"180px"} placeholder="Select option">
          <option value="1">không mấy khi vận động</option>
          <option value="2">vận động ít</option>
          <option value="3">vận động nhẹ</option>
          <option value="4">vận động trung bình</option>
          <option value="5">vận động nặng</option>
          <option value="6">vận động viên</option>
        </Select>
        <Text mx={2}>và tỉ lệ mỡ là</Text>
        <NumberInput size="xs" maxW={16} defaultValue={18} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>%</Text>
      </Center>
      <Divider
        boxShadow={"2xl"}
        borderRadius={"full"}
        borderColor="brand.800"
        borderWidth={"2px"}
      />
      <Center my={10}>
        <Heading color={"brand.500"} fontSize={"3xl"}>
          Mức năng lượng (calories) duy trì của bạn là
        </Heading>
      </Center>
      <Flex>
        <Box w={"35%"}>
            <Left/>
        </Box>
        <Box w={"65%"}>
            <Right/>
        </Box>
      </Flex>
    </Container>
  );
};

export default Tdde;
