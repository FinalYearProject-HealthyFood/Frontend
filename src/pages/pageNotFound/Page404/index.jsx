import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Page404 = () => {
  return (
    <Stack alignItems={"center"}>
      <Box
        position={""}
        h={"500px"}
        w={"50%"}
        bgColor={"brand.500"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <Heading fontWeight={"bold"}>Không tìm thấy trang</Heading>
        <Text fontWeight={"bold"}>
          không tìm thấy url yêu cầu trên máy chủ này
        </Text>
      </Box>
    </Stack>
  );
};

export default Page404;
