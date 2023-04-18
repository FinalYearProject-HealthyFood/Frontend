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
} from "@chakra-ui/react";
import React from "react";
import food_14 from "../../../../assets/food14.png";
import { StarIcon } from "@chakra-ui/icons";

const Meal = () => {
  return (
    <Container maxW="60%">
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
              <Box p={5} w={"250px"} bg={"white"}>
                <Center>
                  <Box>
                    <Image
                      objectFit={"cover"}
                      src={food_14}
                      w={"200px"}
                      alt="recommend"
                      borderRadius={"2xl"}
                      borderWidth={"1px"}
                    />
                    <Heading fontSize={"md"}>bánh Sandwich dinh dưỡng</Heading>
                    <Flex>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <IconButton
                            type="button"
                            variant={"unstyled"}
                            key={index}
                            icon={<StarIcon />}
                            color={index <= 3 ? "yellow.400" : "gray.200"}
                            onClick={() => {}}
                            _hover={{
                              color: "red.400",
                            }}
                          />
                        );
                      })}
                    </Flex>
                    <Flex>
                      <Text fontWeight={"bold"} mr={"3"}>
                        Giá:
                      </Text>
                      <Text>$100</Text>
                    </Flex>
                    <Box my={"14px"}>
                      <Flex>
                        <Box>
                          <NumberInput
                            step={1}
                            defaultValue={1}
                            min={1}
                            w={"70px"}
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
                          <Button color={"white"} bg={"brand.500"} w={"100px"}>
                            Add to Cart
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Center>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Container>
  );
};

export default Meal;
