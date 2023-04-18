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

const Right = () => {
  return (
    <>
      <Center flexDirection={"column"}>
        <Stack mt={10} borderRadius={"2xl"} justifyContent="center">
          <Box mb={15}>
            <Text fontWeight={"medium"} fontSize={"lg"}>
              Dựa trên số liệu thống kê của bạn, ước tính tốt nhất cho lượng
              calo duy trì của bạn là 2.221 calo mỗi ngày dựa trên Công thức
              Katch-McArdle, được biết đến rộng rãi là chính xác nhất khi cung
              cấp chất béo trong cơ thể.
            </Text>
            <Text fontWeight={"medium"} fontSize={"lg"} my={10}>
              Bảng dưới đây cho thấy sự khác biệt nếu bạn đã chọn một cấp độ
              hoạt động khác.
            </Text>
            <TableContainer>
              <Table>
                <Tbody fontWeight={"medium"}>
                  <Tr>
                    <Td>Không mấy khi vận động</Td>
                    <Td isNumeric>1433</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr>
                    <Td>Vận động ít</Td>
                    <Td isNumeric>1719</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr>
                    <Td>Vận động nhẹ</Td>
                    <Td isNumeric>1970</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr color={"brand.500"}>
                    <Td>Vận động trung bình</Td>
                    <Td isNumeric>2221</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr>
                    <Td>Vận động nặng</Td>
                    <Td isNumeric>2471</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                  <Tr>
                    <Td>Vận động viên</Td>
                    <Td isNumeric>2722</Td>
                    <Td>năng lượng / ngày</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Heading mb={3} color={"brand.500"} fontWeight={"medium"} fontSize={"3xl"}>
              BMI Score: 21.0
            </Heading>
            <Heading fontWeight={"normal"} fontSize={"2xl"}>
              BMI của bạn là 21.0, có nghĩa là bạn được phân loại là
            </Heading>
            <Heading mb={5} fontSize={"2xl"}>Cân nặng bình thường</Heading>
            <TableContainer>
              <Table>
                <Tbody fontWeight={"medium"}>
                  <Tr>
                    <Td>18.5 hoặc thấp hơn</Td>
                    <Td>Thiếu cân</Td>
                  </Tr>
                  <Tr color={"brand.500"}>
                    <Td>18.5 - 24.99</Td>
                    <Td>Cân nặng bình thường</Td>
                  </Tr>
                  <Tr>
                    <Td>25 - 29.99</Td>
                    <Td>Quá cân</Td>
                  </Tr>
                  <Tr>
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
