import {
  Box,
  Center,
  Divider,
  Heading,
  Spacer,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

const Right = (props) => {
  const mifflin_cal = (w, h, a, activity, g) => {
    if (g == "male") {
      return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
    } else {
      return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
    }
  };

  const BMI_Score = (w, h) => {
    return (w / (h / 100) ** 2).toFixed(2);
  };

  const Rank_BMI = (score) => {
    if (score <= 18.5) {
      return "Thiếu cân";
    } else if (score > 18.5 && score <= 24.99) {
      return "Cân nặng bình thường";
    } else if (score >= 25 && score <= 24.99) {
      return "Quá cân";
    } else {
      return "Béo phì";
    }
  };

  return (
    <>
      <Center flexDirection={"column"}>
        <Stack mt={10} borderRadius={"2xl"} justifyContent="center">
          <Box mb={10}>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              Dựa trên số liệu thống kê của bạn, ước tính tốt nhất cho lượng
              calo duy trì của bạn là{" "}
              {mifflin_cal(
                props.state.weight,
                props.state.height,
                props.state.age,
                props.state.activity,
                props.state.gender
              )}{" "}
              calo mỗi ngày dựa trên Công thức Mifflin-St. Jeor, được biết đến rộng
              rãi là khá chính xác khi cung cấp giới tính, độ tuổi, chiều cao, cân nặng.
            </Text>
            <Text fontWeight={"medium"} fontSize={"sm"} my={5}>
              Bảng dưới đây cho thấy sự khác biệt nếu bạn đã chọn một cấp độ
              hoạt động khác:
            </Text>
            <TableContainer>
              <Table size={"sm"}>
                <Tbody fontSize={"xs"} fontWeight={"medium"}>
                  <Tr
                    color={props.state.activity == 1 && "brand.500"}
                    fontWeight={props.state.activity == 1 && "bold"}
                  >
                    <Td>Không mấy khi vận động</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr
                    color={props.state.activity == 1.2 && "brand.500"}
                    fontWeight={props.state.activity == 1.2 && "bold"}
                  >
                    <Td>Vận động ít</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1.2,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr
                    color={props.state.activity == 1.375 && "brand.500"}
                    fontWeight={props.state.activity == 1.375 && "bold"}
                  >
                    <Td>Vận động nhẹ</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1.375,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr
                    color={props.state.activity == 1.55 && "brand.500"}
                    fontWeight={props.state.activity == 1.55 && "bold"}
                  >
                    <Td>Vận động trung bình</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1.55,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr
                    color={props.state.activity == 1.725 && "brand.500"}
                    fontWeight={props.state.activity == 1.725 && "bold"}
                  >
                    <Td>Vận động nặng</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1.725,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr
                    color={props.state.activity == 1.9 && "brand.500"}
                    fontWeight={props.state.activity == 1.9 && "bold"}
                  >
                    <Td>Vận động viên</Td>
                    <Td isNumeric>
                      {mifflin_cal(
                        props.state.weight,
                        props.state.height,
                        props.state.age,
                        1.9,
                        props.state.gender,
                      )}
                    </Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Heading
              mb={3}
              color={"brand.500"}
              fontWeight={"medium"}
              fontSize={"2xl"}
            >
              BMI Score: {BMI_Score(props.state.weight, props.state.height)}
            </Heading>
            <Heading fontWeight={"normal"} fontSize={"xl"}>
              BMI của bạn là {BMI_Score(props.state.weight, props.state.height)}
              , có nghĩa là bạn được phân loại là
            </Heading>
            <Heading mb={5} mt={5} fontSize={"xl"}>
              {Rank_BMI(BMI_Score(props.state.weight, props.state.height))}
            </Heading>
            <TableContainer>
              <Table size={"sm"}>
                <Tbody fontWeight={"medium"}>
                  <Tr
                    color={
                      BMI_Score(props.state.weight, props.state.height) <=
                        18.5 && "brand.500"
                    }
                    fontWeight={
                      BMI_Score(props.state.weight, props.state.height) <=
                        18.5 && "bold"
                    }
                  >
                    <Td>18.5 hoặc thấp hơn</Td>
                    <Td>Thiếu cân</Td>
                  </Tr>
                  <Tr
                    color={
                      BMI_Score(props.state.weight, props.state.height) >
                        18.5 &&
                      BMI_Score(props.state.weight, props.state.height) <=
                        24.99 &&
                      "brand.500"
                    }
                    fontWeight={
                      BMI_Score(props.state.weight, props.state.height) >
                        18.5 &&
                      BMI_Score(props.state.weight, props.state.height) <=
                        24.99 &&
                      "bold"
                    }
                  >
                    <Td>18.5 - 24.99</Td>
                    <Td>Cân nặng bình thường</Td>
                  </Tr>
                  <Tr
                    color={
                      BMI_Score(props.state.weight, props.state.height) >= 25 &&
                      BMI_Score(props.state.weight, props.state.height) <=
                        29.99 &&
                      "brand.500"
                    }
                    fontWeight={
                      BMI_Score(props.state.weight, props.state.height) >= 25 &&
                      BMI_Score(props.state.weight, props.state.height) <=
                        29.99 &&
                      "bold"
                    }
                  >
                    <Td>25 - 29.99</Td>
                    <Td>Quá cân</Td>
                  </Tr>
                  <Tr
                    color={
                      BMI_Score(props.state.weight, props.state.height) >= 30 &&
                      "brand.500"
                    }
                    fontWeight={
                      BMI_Score(props.state.weight, props.state.height) >= 30 &&
                      "bold"
                    }
                  >
                    <Td>30+</Td>
                    <Td>Béo phì</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default Right;
