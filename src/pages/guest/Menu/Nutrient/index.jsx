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
  useToast,
  VStack,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import food_14 from "../../../../assets/food14.png";
import sample_2 from "../../../../assets/Sample 2.png";
import { StarIcon } from "@chakra-ui/icons";
import { FaWeightHanging, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { api, api_image } from "../../../../api";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../axios";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { GiShoppingCart } from "react-icons/gi";

const Nutrient = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const showToast = (title, status, description) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2500,
      isClosable: true,
      position: "top-right",
      variant: "left-accent",
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${api}/ingredients/?page=${currentPage}`).then((response) => {
      setLoading(false);
      setIngredients(response.data.data);
      setTotalPage(response.data.total);
      setQuantities(
        response.data.data.map((value, index) => {
          return { id: value.id, quantity: 1 };
        })
      );
    });
  }, [currentPage]);

  const getData = (pageNumber = 1) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  function handleIncrementClick(index, qty) {
    const nextCounters = quantities.map((value, i) => {
      if (value.id === index) {
        // Increment the clicked counter
        return {
          id: value.id,
          quantity: parseFloat(qty),
        };
      } else {
        // The rest haven't changed
        return {
          id: value.id,
          quantity: value.quantity,
        };
      }
    });
    setQuantities(nextCounters);
    console.log(quantities);
  }

  const onSubmit = (id) => {
    if (userToken) {
      var qty = quantities.find((item) => item.id === id);
      const data = {
        quantity: qty.quantity,
        ingredient_id: id,
      };
      console.log(data);
      axiosClient
        .post(`${api}/order-items/store`, data)
        .then(({ data }) => {
          console.log(data);
          showToast("Success!", "warning", "Đã thêm vào giỏ!");
        })
        .catch((error) => {
          showToast("Error!", "error", "Lỗi xảy ra khi thêm vào giỏ!");
        });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {loading ? (
        <Container maxW="70%">
          <Breadcrumb fontWeight={"semibold"} fontSize={"lg"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Menu</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              onClick={() => {
                navigate(`/nutrient`);
              }}
              isCurrentPage
            >
              <BreadcrumbLink href="#">Tự chọn khẩu phần ăn</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack mt={"50px"} alignItems={"center"}>
            <Box mt={"100px"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand.500"
                size="xl"
              />
            </Box>
            <Box mb={"100px"} mt={"100px"}>
              <Heading color={"brand.200"} fontSize={"2xl"}>
                {" "}
                Đang tải, xin vui lòng chờ...{" "}
              </Heading>
            </Box>
          </VStack>
        </Container>
      ) : (
        <Container maxW="70%">
          <Breadcrumb fontWeight={"semibold"} fontSize={"lg"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Menu</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              onClick={() => {
                navigate(`/nutrient`);
              }}
              isCurrentPage
            >
              <BreadcrumbLink href="#">Tự chọn khẩu phần ăn</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {ingredients.length !== 0 ? (
            <Center>
              <SimpleGrid my={"50px"} spacing={10} columns={[3]}>
                {ingredients?.map((data, index) => (
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
                            mt={"10px"}
                            borderRadius={"5px"}
                            objectFit={"cover"}
                            src={`${api_image}/storage/${data.image}`}
                            // w={"150px"}
                            // h={"150px"}
                            alt="recommend"
                            onClick={() => {
                              navigate(`/nutrient/${data.id}`);
                            }}
                          />
                          <Heading
                            fontSize={"sm"}
                            _hover={{
                              color: "orange",
                            }}
                            onClick={() => {
                              navigate(`/nutrient/${data.id}`);
                            }}
                          >
                            {data.name}
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
                                  color={
                                    index <= data.rate
                                      ? "yellow.400"
                                      : "gray.200"
                                  }
                                  onClick={() => {}}
                                  _hover={{
                                    color: "red.400",
                                  }}
                                />
                              );
                            })}
                            <Text
                              ml={1}
                              color={"gray"}
                              mt={"5px"}
                              fontSize={"xs"}
                            >
                              {data.rate}
                            </Text>
                          </Flex>
                          <Flex mt={"10px"}>
                            <FaWeightHanging />
                            <Text ml={2} fontSize={"sm"}>
                              {data.serving_size} gram
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
                              {data.price?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}{" "}
                              vnd
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
                                  onChange={(number) => {
                                    handleIncrementClick(data.id, number);
                                  }}
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
                                  onClick={() => {
                                    onSubmit(data.id);
                                  }}
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
          ) : (
            <Center mt={5} flexDirection={"column"}>
              <Icon color={"brand.500"} boxSize={"150px"} as={GiShoppingCart} />
              <Heading color={"brand.500"}>
                Hiện tại không có khẩu phần ăn nào
              </Heading>
            </Center>
          )}
          <Flex justifyContent={"center"}>
            {totalPage > 6 ? (
              <Pagination
                hideDisabled
                activePage={currentPage}
                totalItemsCount={totalPage}
                itemsCountPerPage={6}
                itemClass="page-item"
                linkClass="page-link"
                itemClassNext="next-item"
                itemClassPrev="prev-item"
                innerClass="container"
                linkClassFirst="first-link"
                linkClassLast="last-link"
                activeClass="paginationActive"
                activeLinkClass="linkActive"
                disabledClass="disable"
                onChange={(pageNumber) => getData(pageNumber)}
              />
            ) : (
              ""
            )}
          </Flex>
        </Container>
      )}
    </>
  );
};

export default Nutrient;
