import {
  Box,
  Center,
  Divider,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Left = (props) => {
  const mifflin_cal = (w, h, a, activity) => {
    return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
  };

  const ideal_weight = () => {
    return;
  };

  return (
    <>
      <Center flexDirection={"column"}>
        <Stack
          color={"white"}
          mt={10}
          borderRadius={"2xl"}
          p={5}
          w={"70%"}
          bgColor={"brand.300"}
          alignItems="center"
          justifyContent="center"
        >
          <Heading fontSize={"3xl"}>
            {mifflin_cal(
              props.state.weight,
              props.state.height,
              props.state.age,
              props.state.activity
            )}
          </Heading>
          <Heading fontSize={"md"}>năng lượng trên một ngày</Heading>
          <Divider />
          <Heading fontSize={"3xl"}>
            {mifflin_cal(
              props.state.weight,
              props.state.height,
              props.state.age,
              props.state.activity
            ) * 7}
          </Heading>
          <Heading fontSize={"md"}>năng lượng trên một tuần</Heading>
        </Stack>
        <Stack
          mt={5}
          mb={10}
          borderRadius={"2xl"}
          p={5}
          w={"70%"}
          alignItems="center"
          justifyContent="center"
        >
          <Heading color={"brand.300"} fontSize={"xl"}>
            Cân nặng lý tưởng:
          </Heading>
          <Heading color={"brand.500"} fontWeight={"bold"} fontSize={"3xl"}>
            64-66kg
          </Heading>
          <Text fontWeight={"medium"} fontSize={"sm"}>
            Trọng lượng cơ thể lý tưởng của bạn được ước tính là từ 64-66 kg
          </Text>
        </Stack>
      </Center>
    </>
  );
};

export default Left;
