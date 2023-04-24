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
} from "@chakra-ui/react";
import React from "react";
import food_14 from "../../../../assets/food14.png";
import sample_2 from "../../../../assets/Sample 2.png";
import { StarIcon } from "@chakra-ui/icons";
import { FaWeightHanging, FaShoppingCart } from "react-icons/fa";

const Nutrient = () => {
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
          <BreadcrumbLink href="#">Tự chọn khẩu phần ăn</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Center>
        <SimpleGrid my={"50px"} spacing={10} columns={[3]}>
          {[0, 1, 2, 3, 4, 5]?.map((index, data) => (
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
              <Box px={5} w={"200px"} bg={"white"}>
                <Stack>
                  <Box>
                    <Image
                      objectFit={"cover"}
                      src={sample_2}
                      w={"150px"}
                      h={"150px"}
                      alt="recommend"
                    />
                    <Heading fontSize={"sm"}>Thịt nạc vai bò Mỹ</Heading>
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
                            color={index <= 4.5 ? "yellow.400" : "gray.200"}
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
                    </Flex>
                    <Flex mt={"10px"}>
                      <FaWeightHanging />
                      <Text ml={2} fontSize={"sm"}>
                        100 gram
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        fontWeight={"bold"}
                        mr={"3"}
                        mt={"10px"}
                        fontSize={"sm"}
                      >
                        Giá:
                      </Text>
                      <Text mt={"10px"} fontSize={"sm"}>
                        50.000 vnd
                      </Text>
                    </Flex>
                    <Box my={"14px"}>
                      <Flex>
                        <Box>
                          <NumberInput
                            size={"xs"}
                            step={1}
                            defaultValue={1}
                            min={1}
                            w={"50px"}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>
                        <Spacer />
                        <Box>
                          <Button
                            colorScheme="orange"
                            ml={2}
                            borderRadius={"none"}
                            size={"xs"}
                          >
                            <FaShoppingCart />
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Container>
  );
};

export default Nutrient;
