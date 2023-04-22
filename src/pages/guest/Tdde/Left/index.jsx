import { Box, Center, Divider, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Left = () => {
  return (
    <>
    <Center flexDirection={"column"}>

      <Stack color={"white"}  mt={10} borderRadius={"2xl"} p={5} w={"70%"} bgColor={"brand.300"} alignItems="center" justifyContent="center">
        <Heading fontSize={"3xl"}>2221</Heading>
        <Heading fontSize={"md"}>năng lượng trên một ngày</Heading>
        <Divider />
        <Heading fontSize={"3xl"}>15545</Heading>
        <Heading fontSize={"md"}>năng lượng trên một tuần</Heading>
      </Stack>
      <Stack mt={5} mb={10} borderRadius={"2xl"} p={5} w={"70%"} alignItems="center" justifyContent="center">
        <Heading color={"brand.300"}  fontSize={"xl"}>Cân nặng lý tưởng:</Heading>
        <Heading color={"brand.500"} fontWeight={"bold"} fontSize={"3xl"}>64-66kg</Heading>
        <Text fontWeight={"medium"} fontSize={"sm"}>Trọng lượng cơ thể lý tưởng của 
bạn được ước tính là từ 64-66 kg</Text>
      </Stack>
    </Center>
    </>
  );
};

export default Left;
