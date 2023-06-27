import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import Logo from "../../Logo";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import axios from "axios";
import { api, api_image } from "../../../api";
import { GiMeat } from "react-icons/gi";

const BottomHeader = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (userToken) {
      axiosClient.post("order-items/cart-count-by-user").then((res) => {
        // console.log(res.data);
        setCartCount(res.data);
      });
    }
  }, []);
  useEffect(() => {
    let timer;

    const fetchData = async () => {
      // try {
      //   const response = await axios.get(`/api/search?query=${searchQuery}`);
      //   // Process the API response
      //   setSearchResults(response.data);
      // } catch (error) {
      //   // Handle the error
      //   console.error(error);
      // }
      axios
        .get(`${api}/search/home`, {
          params: {
            search: searchQuery,
          },
        })
        .then((res) => {
          setSearchResults(res.data);
          // console.log(res)
        });
    };

    const delayedFetchData = () => {
      clearTimeout(timer);
      timer = setTimeout(fetchData, 800); // Adjust the delay as needed (in milliseconds)
    };

    if (searchQuery !== null && searchQuery !== "") {
      delayedFetchData();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
    console.log(searchResults);
  };

  // const handleSearchClick = () => {
  //   setSearchResults([]);
  // };
  const handleSearchOver = () => {
    let timer;
    const reset = () => {
      setSearchResults([]);
      setSearchQuery("");
    };
    clearTimeout(timer);
    timer = setTimeout(reset, 200);
    return () => {
      clearTimeout(timer);
    };
  };
  const comeToIngredient = (id) => {};
  return (
    <Stack
      p={5}
      direction="row"
      w="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spacer />
      <Logo />
      <Spacer />
      <Box w="42%" position={"relative"}>
        <InputGroup>
          <InputLeftElement width={"2.5rem"}>
            <SearchIcon color={"gray.600"} />
          </InputLeftElement>
          <Input
            placeholder="Tìm kiếm khẩu phần ăn (ví dụ: cơm, gà, trứng, ...)"
            type="search"
            variant={"filled"}
            borderRadius={"3xl"}
            color={"green"}
            boxShadow={"base"}
            focusBorderColor='brand.400'
            value={searchQuery}
            onChange={handleSearchChange}
            // onClick={handleSearchClick}
            onBlur={handleSearchOver}
          />
          <InputRightElement width={"6rem"}>
            <Button
              colorScheme={"brand"}
              aria-label="Search database"
              size={"sm"}
              borderRadius={"full"}
              onClick={() => {
                console.log(searchResults);
              }}
            >
              Tìm kiếm
            </Button>
          </InputRightElement>
        </InputGroup>
        <Stack
          zIndex={"100"}
          boxShadow={searchResults.length > 0 && "dark-lg"}
          bgColor={"white"}
          w={"100%"}
          position={"absolute"}
          spacing={0}
          gap={0}
          overflowY="auto"
          maxHeight="650px"
        >
          {searchResults.map((data, indexedDB) => {
            return (
              <Flex
                cursor={"pointer"}
                onClick={() => {
                  if (data.category == "ingredient") {
                    navigate(`/nutrient/${data.id}`);
                  } else if (data.category == "meal") {
                  }
                }}
              >
                <Image
                  m={1}
                  boxSize={"100px"}
                  src={`${api_image}/storage/${data.image}`}
                />
                <Box>
                  <Heading mt={1} mb={1} fontSize={"lg"} fontWeight={"medium"}>
                    {data.name}
                  </Heading>
                  <Text ml={1} fontSize={"sm"}>
                    Calories: {data.calories}
                  </Text>
                  <Text ml={1} fontSize={"sm"}>
                    Serving size: {data.serving_size} gram
                  </Text>
                  <Text color={"orange"} ml={1} fontSize={"sm"}>
                    Giá:{" "}
                    {data.price?.toLocaleString(undefined, {
                      maximumFractionDigits: 3,
                    })}{" "}
                    vnđ
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Stack>
      </Box>
      <Spacer />
      {Object.keys(currentUser).length !== 0 && (
        <>
          <Button
            variant="solid"
            colorScheme="brand"
            size="sm"
            leftIcon={<StarIcon />}
            boxShadow={"md"}
            fontSize={"sm"}
            onClick={() => {
              navigate("ratings");
            }}
          >
            Đánh giá
          </Button>
          <Button
            variant="solid"
            colorScheme="brand"
            size="sm"
            leftIcon={<FaShoppingCart />}
            boxShadow={"md"}
            fontSize={"sm"}
            onClick={() => {
              navigate("cart");
            }}
          >
            Giỏ hàng
          </Button>
          <Button
            variant="solid"
            colorScheme="brand"
            size="sm"
            leftIcon={<GiMeat />}
            boxShadow={"md"}
            fontSize={"sm"}
            onClick={() => {
              navigate("mymeal");
            }}
          >
            Xuất ăn của tôi
          </Button>
        </>
      )}
      <Spacer />
    </Stack>
  );
};

export default BottomHeader;
