import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Text,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  IconButton,
  Stack,
  Progress
} from "@chakra-ui/react";
import React from "react";
import food_14 from "../../../../assets/food14.png";
import { StarIcon } from "@chakra-ui/icons";
import { BsFire } from "react-icons/bs";
import { FaShoppingCart, FaHeart } from "react-icons/fa"

const Meal = () => {
  return (
    <Container maxW="70%">
      <Breadcrumb fontWeight={"semibold"} fontSize={"lg"}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Menu</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Chọn khẩu phần ăn</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Center>
        <SimpleGrid my={"50px"} spacing={10} columns={[2]}>
          {[0, 1, 2, 3, 4, 5]?.map((index, data) => (
            <Flex
            key={index}
            cursor="pointer"
            borderRadius={"lg"}
            boxShadow={"lg"}
            h={"150px"}
            _hover={{
              transform: "translate(0px, -10px)",
              boxShadow: "2xl",
              transition: "all 0.2s ease-in-out",
            }}
            transition="all 0.2s ease-in-out"
            overflow="hidden"
          >
            <Image
              objectFit={"cover"}
              src={food_14}
              h={"150px"}
              w={"150px"}
              alt="recommend"
            />
            <Stack p={2} w={"250px"} bg={"white"}>
              <Heading color={""} fontSize={"sm"}>
                Bánh Sandwich dinh dưỡng
              </Heading>
              <Flex>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <IconButton
                      type="button"
                      fontSize={"xs"}
                      size={"10"}
                      variant={"unstyled"}
                      key={index}
                      icon={<StarIcon />}
                      color={index <= 5 ? "yellow.400" : "gray.200"}
                      onClick={() => {}}
                      _hover={{
                        color: "red.400",
                      }}
                    />
                  );
                })}
                <Text ml={1} color={"gray"} mt={"5px"} fontSize={"xs"}>
                  4.5
                </Text>
                <Spacer />
                <Text color={"gray"} mt={"5px"} fontSize={"xs"}>
                  220  đánh giá
                </Text>
              </Flex>
              <Flex>
                <BsFire />
                <Text fontSize={"sm"}>550 KCal</Text>
              </Flex>
              <Progress
                value={(550 / 1000) * 100}
                size="xs"
                colorScheme="orange"
              />
              <Flex>
                <Text mt={"15px"} fontSize={"sm"}>200.000 vnd</Text>
                <Spacer/>
                <Box mt={"15px"} >
                  <NumberInput size={"xs"} step={1} defaultValue={1} min={1} w={"50px"}>
                    <NumberInputField fontSize={"xs"} />
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Button colorScheme="orange" ml={2} borderRadius={"none"} mt={"15px"} size={"xs"} >
                  <FaShoppingCart/>
                </Button>
              </Flex>
            </Stack>
          </Flex>
          ))}
        </SimpleGrid>
      </Center>
    </Container>
  );
};

export default Meal;
