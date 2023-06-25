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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";

const TddeCalculator = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState(1);
  const [plan, setPlan] = useState(3);
  const [fat, setFat] = useState("");
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  useEffect(() => {
    if (userToken) {
      axiosClient.get("/me").then(({ data }) => {
        if (data.age) {
          setAge(data.age);
        }
        if (data.weight) {
          setWeight(data.weight);
        }
        if (data.height) {
          setHeight(data.height);
        }
        if (data.gender) {
          setGender(data.gender);
        }
        if (data.activity) {
          setActivity(data.activity);
        }
        if (data.fat) {
          setFat(data?.fat);
        }
      });
    }
  }, []);
  return (
    <Container mb={30} maxW="80%">
      <VStack mt={10} mb={20}>
        <Heading color={"brand.300"} fontSize={"4xl"}>
          Tìm hiểu xem bạn đốt cháy bao nhiêu calo mỗi ngày{" "}
        </Heading>
        <Text>
          Sử dụng máy tính TDEE để tìm hiểu Tổng Chi tiêu Năng lượng Hàng ngày
          của bạn, thước đo lượng calo
        </Text>
        <Text>
          bạn đốt mỗi ngày. Máy tính calo này cũng sẽ hiển thị BMI, BMR, Macro
          và nhiều thống kê hữu ích khác của bạn!
        </Text>
      </VStack>
      <VStack>
        <Stack spacing={10} direction={"row"}>
          <Stack textAlign={"right"}>
            <Heading fontSize={"md"}>Giới tính</Heading>
            <Heading fontSize={"md"}>Tuổi </Heading>
            <Heading pt={0.5} fontSize={"md"}>
              Cân nặng
            </Heading>
            <Heading pt={1.5} fontSize={"md"}>
              Chiều cao
            </Heading>
            <Heading pt={2} fontSize={"md"}>
              Mức độ vận động trong ngày
            </Heading>
            <Box pt={1.5} color={"gray"}>
              <Text>Tỉ lệ mỡ %</Text>
              <Text>(Không bắt buộc)</Text>
            </Box>
          </Stack>
          <Stack>
            <RadioGroup size={"sm"} value={gender}>
              <Stack spacing={5} direction="row">
                <Radio
                  colorScheme="green"
                  value="male"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  Nam
                </Radio>
                <Radio
                  colorScheme="green"
                  value="female"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  Nữ
                </Radio>
              </Stack>
            </RadioGroup>
            <Input
              type="number"
              size={"xs"}
              w={"10"}
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <Input
              type="number"
              size={"xs"}
              w={"10"}
              placeholder="kg"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
            <Input
              type="number"
              size={"xs"}
              w={"10"}
              placeholder="cm"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
            <Select
              value={activity}
              size={"xs"}
              w={"175px"}
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
            <Flex>
              <NumberInput
                size="xs"
                maxW={16}
                value={fat}
                min={1}
                max={100}
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
              <Text color={"gray"} ml={2}>
                %
              </Text>
            </Flex>
          </Stack>
        </Stack>
        <Stack>
          <Button
            colorScheme="brand"
            mt={"20px"}
            size={"lg"}
            onClick={() => {
              navigate("/tdee-calculator/result", {
                state: {
                  gender: gender,
                  age: age,
                  weight: weight,
                  height: height,
                  activity: activity,
                  fat: fat,
                },
              });
            }}
          >
            Tính
          </Button>
        </Stack>
      </VStack>
    </Container>
  );
};

export default TddeCalculator;
