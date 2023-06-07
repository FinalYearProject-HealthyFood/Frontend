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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Left from "./Left";
import Right from "./Right";
import { useLocation } from "react-router-dom";

const Tdde = () => {
  const location = useLocation();
  const [gender, setGender] = useState("1");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [fat, setFat] = useState("");

  const mifflin_cal = (w, h, a, activity, g) => {
    if (g == "male") {
      return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
    } else {
      return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
    }
  };

  const ideal_weight = () => {
    return;
  };

  useEffect(() => {
    setGender(location.state.gender);
    setAge(location.state.age);
    setWeight(location.state.weight);
    setHeight(location.state.height);
    setActivity(location.state.activity);
    setFat(location.state.fat);
  }, []);
  return (
    <Container mb={30} maxW="80%">
      <Center mt={10} mb={20}>
        <Heading color={"brand.300"} fontSize={"4xl"}>
          Thông tin TDEE
        </Heading>
      </Center>
      <Center fontSize={"xs"} my={5}>
        <Text mx={2}>Bạn hiện tại là</Text>
        <NumberInput
          size="xs"
          maxW={16}
          min={1}
          value={age}
          onChange={(value) => {
            setAge(value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>tuổi,</Text>
        <Text mr={2}>cao</Text>
        <NumberInput
          size="xs"
          maxW={16}
          min={1}
          value={height}
          onChange={(value) => {
            setHeight(value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>cm,</Text>
        <Text mr={2}>nặng</Text>
        <NumberInput
          size="xs"
          maxW={16}
          min={1}
          value={weight}
          onChange={(value) => {
            setWeight(value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mx={2}>kg,</Text>
        <Text mr={2}>với mức độ vận động</Text>
        <Select
          size={"xs"}
          w={"180px"}
          placeholder="Select option"
          value={activity}
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        >
          <option value={1}>không mấy khi vận động</option>
          <option value={1.2}>vận động ít</option>
          <option value={1.375}>vận động nhẹ</option>
          <option value={1.55}>vận động trung bình</option>
          <option value={1.725}>vận động nặng</option>
          <option value={1.9}>vận động viên</option>
        </Select>
        <Text mx={2}>và tỉ lệ mỡ là</Text>
        <NumberInput
          size="xs"
          maxW={16}
          min={1}
          value={fat}
          onChange={(value) => {
            setFat(value);
          }}
        >
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
          <Left state = {location.state} />
        </Box>
        <Box w={"65%"}>
          <Right state = {location.state} />
        </Box>
      </Flex>
    </Container>
  );
};

export default Tdde;
