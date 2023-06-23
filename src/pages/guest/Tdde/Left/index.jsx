import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Left = (props) => {
  const navigate = useNavigate();
  const mifflin_cal = (w, h, a, activity, g) => {
    if (g == "male") {
      return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
    } else {
      return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
    }
  };
  function calculateIdealWeight(height, gender) {
    let idealWeight;

    if (gender === "male") {
      idealWeight = 48 + 2.7 * ((height - 152.4) / 2.54);
    } else if (gender === "female") {
      idealWeight = 45.5 + 2.2 * ((height - 152.4) / 2.54);
    } else {
      // Handle invalid gender input
      return null;
    }

    return idealWeight;
  }

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
              props.weight,
              props.height,
              props.age,
              props.activity,
              props.gender
            )}
          </Heading>
          <Heading fontSize={"md"}>năng lượng trên một ngày</Heading>
          <Divider />
          <Heading fontSize={"3xl"}>
            {mifflin_cal(
              props.weight,
              props.height,
              props.age,
              props.activity,
              props.gender
            ) * 7}
          </Heading>
          <Heading fontSize={"md"}>năng lượng trên một tuần</Heading>
        </Stack>
        <Stack
          mt={5}
          mb={5}
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
            {calculateIdealWeight(
              props.height,
              props.gender
            )?.toFixed(0)}{" "}
            kg
          </Heading>
          <Text fontWeight={"medium"} fontSize={"sm"}>
            Trọng lượng cơ thể lý tưởng của bạn được ước tính là từ{" "}
            {calculateIdealWeight(
              props.height,
              props.gender
            )?.toFixed(0)}{" "}
            kg
          </Text>
          <Text fontWeight={"light"} fontSize={"xs"}>
            G.J. Hamwi Formula (1964)
          </Text>
        </Stack>
        <Center>
          <Button
            fontSize={"xl"}
            colorScheme="orange"
            onClick={() => {
              navigate("/diet-recommend", {
                state: {
                  calories: mifflin_cal(
                    props.weight,
                    props.height,
                    props.age,
                    props.activity,
                    props.gender
                  ),
                },
              });
            }}
          >
            Chưa biết nên ăn gì ?
          </Button>
        </Center>
      </Center>
    </>
  );
};

export default Left;
