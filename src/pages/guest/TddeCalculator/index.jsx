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
import React from "react";
import { useNavigate } from "react-router-dom";

const TddeCalculator = () => {
    const navigate = useNavigate()
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
            <RadioGroup size={"sm"} defaultValue="1">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="green" value="1">
                  Nam
                </Radio>
                <Radio colorScheme="green" value="2">
                  Nữ
                </Radio>
              </Stack>
            </RadioGroup>
            {/* <NumberInput size="xs" maxW={16} defaultValue={22} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
            <Input type="number" size={"xs"} w={"10"} />

            {/* <NumberInput size="xs" maxW={16} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
            <Input type="number" size={"xs"} w={"10"} placeholder="kg" />
            {/* <NumberInput size="xs" maxW={16} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
            <Input type="number" size={"xs"} w={"10"} placeholder="cm" />

            <Select
              defaultValue={"4"}
              size={"xs"}
              w={"175px"}
              placeholder="Select option"
            >
              <option value="1">không mấy khi vận động</option>
              <option value="2">vận động ít</option>
              <option value="3">vận động nhẹ</option>
              <option value="4">vận động trung bình</option>
              <option value="5">vận động nặng</option>
              <option value="6">vận động viên</option>
            </Select>
            <Flex>
              <NumberInput size="xs" maxW={16} defaultValue={22} min={1}>
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
          <Button colorScheme="brand" mt={"20px"} size={"lg"}
            onClick={()=>{
                navigate("/tdde-index")
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
