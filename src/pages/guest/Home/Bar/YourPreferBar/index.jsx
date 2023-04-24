import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import food_14 from "../../../../../assets/food14.png";

const YourPreferBar = (data) => {
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        spacing={0}
        mb={"50px"}
      >
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
        <Box
          as={"button"}
          borderRadius={"sm"}
          borderWidth={"1px"}
          borderColor={"brand.400"}
          pointerEvents={"none"}
          w={"420px"}
          fontWeight={"medium"}
        >
          <Text color={"brand.400"} shadow={"lg"} fontSize={"xl"}>
            Lựa chọn của bạn
          </Text>
        </Box>
        <Divider border={"1px"} borderColor="brand.400" boxShadow={"lg"} />
      </Stack>
      <Center flexDirection={"column"} fontWeight={"medium"} fontSize={"xl"}>
        <Text>
          HFS cung cấp 4 khẩu phần ăn có năng lượng là 300 Kcal, 400 Kcal, 500
          Kcal và 600 Kcal.
        </Text>
        <Text>
          Quý khách có thể lựa chọn khẩu phần ăn phù hợp với nhu cầu năng lượng
          của cơ thể.
        </Text>
        <Text>Liên hệ với HFS để được tư vấn chi tiết nhất</Text>
      </Center>
      <Container maxW="70%" mt={"50px"}>
        <SimpleGrid columns={4} spacing="20px" justifyItems={"center"}>
          {[0, 1, 2, 3]?.map((index, data) => (
            <Box
                key={index}
              cursor="pointer"
              borderRadius={"xl"}
              boxShadow={"2xl"}
              _hover={{
                transform: "scale(1.05)",
                transition: "all 0.2s ease-in-out",
              }}
              transition="all 0.2s ease-in-out"
              overflow="hidden"
            >
              <Box
                p={5}
                w={"250px"}
                h={"240px"}
                bg={"white"}
              >
                <Image
                  objectFit={"cover"}
                  src={food_14}
                  h={"160px"}
                  w={"100%"}
                  alt="recommend"
                  borderRadius={"2xl"}
                  borderWidth={"1px"}
                />
                <Heading color={"brand.500"} fontSize={"md"}>
                  bánh Sandwich dinh dưỡng
                </Heading>
                <Center>
                  <Text color={"brand.100"}>550 KCal</Text>
                </Center>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default YourPreferBar;
