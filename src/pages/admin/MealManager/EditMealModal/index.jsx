import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Stack,
  Text,
  Input,
  Box,
  Divider,
  Grid,
  GridItem,
  Flex,
  RadioGroup,
  Radio,
  useToast,
  Spacer,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api, api_image } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";
import { MdFileUpload } from "react-icons/md";

const EditMealModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(props.data?.name);
  const [serving, setServing] = useState(props.data?.serving_size);
  const [price, setPrice] = useState(props.data?.price);
  const [calories, setCalories] = useState(props.data?.calories);
  const [protein, setProtein] = useState(props.data?.protein);
  const [fat, setFat] = useState(props.data?.fat);
  const [carb, setCarb] = useState(props.data?.carb);
  const [transFat, setTransFat] = useState(props.data?.trans_fat);
  const [satFat, setSatFat] = useState(props.data?.sat_fat);
  const [fiber, setFiber] = useState(props.data?.fiber);
  const [sugar, setSugar] = useState(props.data?.sugar);
  const [cholesterol, setCholesterol] = useState(props.data?.cholesterol);
  const [sodium, setSodium] = useState(props.data?.sodium);
  const [calcium, setCalcium] = useState(props.data?.calcium);
  const [iron, setIron] = useState(props.data?.iron);
  const [zinc, setZinc] = useState(props.data?.zinc);
  const [status, setStatus] = useState(props.data?.status);
  const [description, setDescription] = useState(props.data?.description);
  const [count, setCount] = useState(0);
  const [imageView, setImageView] = useState(
    `${api_image}/storage/${props.data?.image}`
  );
  const [image, setImage] = useState("");
  const [filter, setFilter] = useState("");
  const [ingredientList, setIngredientList] = useState(props?.ingredientList);
  const [ingredients, setIngredients] = useState([]);
  const toast = useToast();
  const { onEdit, setOnEdit } = useDashboardActionContext();

  const handlecreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const base64 = await convertToBase64(file);
    setImageView(base64);
    e.target.value = "";
  }, []);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert("Please select an image");
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSaveImage = () => {
    const formdata = new FormData();
    formdata.append("image", image);
    axios
      .post(`${api}/meals/save-image/${props.data.id}`, formdata)
      .then((res) => {
        showToast(
          "Success!",
          "success",
          "Chỉnh sửa ảnh xuất ăn thành công"
        );
        setOnEdit(onEdit + 1);
      })
      .catch((error) => {
        showToast("Error!", "error", "Lỗi xảy ra khi chỉnh sửa tệp ảnh");
      });
  };

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
    console.log(props.data);
    setName(props.data?.name);
    setServing(props.data?.serving_size);
    setPrice(props.data?.price);
    setCalories(props.data?.calories);
    setProtein(props.data?.protein);
    setFat(props.data?.fat);
    setCarb(props.data?.carb);
    setTransFat(props.data?.trans_fat);
    setSatFat(props.data?.sat_fat);
    setFiber(props.data?.fiber);
    setSugar(props.data?.sugar);
    setCholesterol(props.data?.cholesterol);
    setSodium(props.data?.sodium);
    setCalcium(props.data?.calcium);
    setIron(props.data?.iron);
    setZinc(props.data?.zinc);
    setStatus(props.data?.status);
    setDescription(props.data?.description);
    setImageView(`${api_image}/storage/${props.data?.image}`);
    setIngredientList(props?.ingredientList);
    setFilter("");
    console.log(ingredientList);
    setIngredients(
      props.data?.ingredients.map((value, index) => {
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: value.pivot.quantity,
        };
      })
    );
    setImage("");
    console.log(ingredients);
  }, [props.data, onEdit, count]);
  function handleQtyChange(index, qty) {
    const nextChange = ingredients.map((value, i) => {
      if (value.id === index) {
        // Increment the clicked counter
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: parseFloat(qty),
        };
      } else {
        // The rest haven't changed
        return {
          id: value.id,
          name: value.name,
          serving_size: value.serving_size,
          quantity: value.quantity,
        };
      }
    });
    setIngredients(nextChange);
    console.log(ingredients);
  }

  const submit = () => {
    const data = {
      name: name,
      price: price,
      serving_size: serving,
      calories: calories,
      protein: protein,
      fat: fat,
      carb: carb,
      sat_fat: satFat,
      trans_fat: transFat,
      fiber: fiber,
      sugar: sugar,
      cholesterol: cholesterol,
      sodium: sodium,
      calcium: calcium,
      iron: iron,
      zinc: zinc,
      status: status,
      description: description,
      ingredients: ingredients,
    };
    axios
      .put(`${api}/meals/update/${props.data.id}`, data)
      .then((res) => {
        showToast(
          "Success!",
          "success",
          "Chỉnh sửa thông tin xuất ăn thành công"
        );
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        showToast("Error!", "error", "Lỗi xảy ra khi chỉnh sửa thông tin");
      });
  };
  const handleSearchOver = () => {
    let timer;
    const reset = () => {
      setFilter("");
    };
    clearTimeout(timer);
    timer = setTimeout(reset, 200);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCount(count + 1);
        }}
        colorScheme="yellow"
      >
        <Icon as={EditIcon} />
      </Button>
      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin xuất ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid pb={5} gap={15} templateColumns={"repeat(5, 1fr)"}>
              <GridItem colSpan={2}>
                <Box>
                  <Text fontWeight={"medium"} fontSize={"lg"}>
                    Ảnh
                  </Text>
                  <Box my={5} mx={10}>
                    <Image src={imageView} />
                  </Box>
                </Box>
                <Flex>
                  <Input
                    type={"file"}
                    id="file"
                    accept="image/*, png, jpeg, jpg"
                    style={{ display: "none" }}
                    onChange={handlecreateBase64}
                  />
                  <Button
                    as="label"
                    cursor={"pointer"}
                    htmlFor="file"
                    bg="yellow.500"
                    leftIcon={<MdFileUpload />}
                    size="sm"
                    _hover={{ bg: "yellow.400" }}
                  >
                    Tải ảnh
                  </Button>
                  <Button
                    ml={3}
                    size="sm"
                    colorScheme="brand"
                    onClick={() => {
                      handleSaveImage();
                    }}
                  >
                    Lưu ảnh
                  </Button>
                </Flex>
                <Box mt={3} position={"relative"}>
                  <Text fontWeight={"medium"} fontSize={"lg"}>
                    Thành phần ăn:
                  </Text>
                  <Input
                    value={filter}
                    onBlur={handleSearchOver}
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  />
                  <Stack
                    zIndex={"100"}
                    boxShadow={(ingredientList.length > 0) && "dark-lg"}
                    bgColor={"white"}
                    w={"100%"}
                    position={"absolute"}
                    spacing={0}
                    gap={0}
                    overflowY="auto"
                    maxHeight="300px"
                  >
                    {ingredientList
                      .filter((val) => {
                        if (filter == "") {
                          return "";
                        } else if (
                          val.name
                            .toLowerCase()
                            .includes(filter.toLocaleLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((value, index) => {
                        return (
                          <>
                            <Box
                              borderColor={"black.500"}
                              borderBottomWidth={1}
                              h={"60px"}
                              key={value.id}
                              p={2}
                            >
                              <Flex alignItems={"center"}>
                                <Text>{value.name}</Text>
                                <Spacer />
                                <Button
                                  fontSize={"md"}
                                  onClick={() => {
                                    setIngredients([
                                      ...ingredients,
                                      {
                                        id: value.id,
                                        name: value.name,
                                        quantity: 1,
                                        serving_size: value.serving_size,
                                        index: nextId,
                                      },
                                    ]);
                                  }}
                                >
                                  Add
                                </Button>
                              </Flex>
                            </Box>
                          </>
                        );
                      })}
                  </Stack>
                  <Stack mt={2}>
                    {ingredients.map((data, index) => {
                      return (
                        <Box key={data.id}>
                          <Flex alignItems={"center"}>
                            <Text>{data.name}</Text>
                            <Spacer />
                            <Input
                              maxW={"80px"}
                              type="number"
                              value={Math.floor(
                                data.serving_size * data.quantity
                              )}
                              onChange={(e) => {
                                handleQtyChange(
                                  data.id,
                                  (e.target.value / data.serving_size).toFixed(
                                    1
                                  )
                                );
                              }}
                            />
                            <Text ml={2}>gram</Text>
                            <Button
                              variant={"ghost"}
                              onClick={() => {
                                setIngredients(
                                  ingredients.filter(
                                    (a) => a.index !== data.index
                                  )
                                );
                              }}
                            >
                              X
                            </Button>
                          </Flex>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Stack>
                  <Box>
                    <Text fontWeight={"medium"} fontSize={"lg"}>
                      Tên
                    </Text>
                    <Input
                      fontSize={"md"}
                      value={name}
                      size={"sm"}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight={"medium"} fontSize={"lg"}>
                      Khối lượng
                    </Text>
                    <Flex>
                      <Input
                        fontSize={"md"}
                        value={serving}
                        size={"sm"}
                        onChange={(e) => {
                          setServing(e.target.value);
                        }}
                      />
                      <Spacer />
                      <Text ml={4} fontSize={"md"}>
                        grams
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight={"medium"} fontSize={"lg"}>
                      Giá
                    </Text>
                    <Flex>
                      <Input
                        fontSize={"md"}
                        value={price}
                        size={"sm"}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                      <Spacer />
                      <Text ml={4} fontSize={"md"}>
                        vnđ
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight={"medium"} fontSize={"lg"}>
                      Mô tả
                    </Text>
                    <Flex>
                      <Textarea
                        fontSize={"md"}
                        value={description}
                        size={"sm"}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                      <Spacer />
                      <Text ml={4} fontSize={"md"}></Text>
                    </Flex>
                  </Box>
                </Stack>
                <Divider mt={5} borderColor={"black"} borderWidth={1} />
                <Stack mt={2} alignItems={"center"}>
                  <Text fontWeight={"medium"} fontSize={"lg"}>
                    Thông tin dinh dưỡng
                  </Text>
                  <Grid pb={5} gap={15} templateColumns={"repeat(4, 1fr)"}>
                    <GridItem colSpan={4}>
                      <Flex>
                        <Text fontSize={"lg"} fontWeight={"bold"} mt={1}>
                          Calories
                        </Text>
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={7}
                          size={"xs"}
                          value={calories ?? ""}
                          onChange={(e) => {
                            setCalories(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          Kcal
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Flex>
                        <Text fontWeight={"medium"} mt={1}>
                          Protein
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={protein ?? ""}
                          onChange={(e) => {
                            setProtein(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight={"medium"} mt={1}>
                          Total Fat
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={fat ?? ""}
                          onChange={(e) => {
                            setFat(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Sat Fat
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={satFat ?? ""}
                          onChange={(e) => {
                            setSatFat(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Trans Fat
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={transFat ?? ""}
                          onChange={(e) => {
                            setTransFat(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight={"medium"} mt={1}>
                          Total Carb
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={carb ?? ""}
                          onChange={(e) => {
                            setCarb(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Fiber
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={fiber ?? ""}
                          onChange={(e) => {
                            setFiber(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Sugar
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={sugar ?? ""}
                          onChange={(e) => {
                            setSugar(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          g
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Flex>
                        <Text color={"white"} fontWeight={"medium"} mt={1}>
                          Các thông tin vi lượng:
                        </Text>
                        <Spacer />
                      </Flex>
                      <Flex>
                        <Text fontWeight={"medium"} mt={1}>
                          Cholesterol
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={cholesterol ?? ""}
                          onChange={(e) => {
                            setCholesterol(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          mg
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight={"medium"} mt={1}>
                          Sodium
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={sodium ?? ""}
                          onChange={(e) => {
                            setSodium(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          mg
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"xs"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Calcium
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={calcium ?? ""}
                          onChange={(e) => {
                            setCalcium(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          mg
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"xs"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Iron
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={iron ?? ""}
                          onChange={(e) => {
                            setIron(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          mg
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          ml={2}
                          fontSize={"xs"}
                          fontWeight={"normal"}
                          mt={1}
                        >
                          Zinc
                        </Text>
                        <Spacer />
                        <Input
                          fontSize={"md"}
                          w={"60px"}
                          type="number"
                          mt={1}
                          ml={3}
                          size={"xs"}
                          value={zinc ?? ""}
                          onChange={(e) => {
                            setZinc(e.target.value);
                          }}
                        />
                        <Text fontWeight={"medium"} w={"30px"} ml={2} mt={1}>
                          mg
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight={"medium"} mt={1}>
                        Status
                      </Text>
                      <RadioGroup
                        mt={2}
                        size={"md"}
                        onChange={setStatus}
                        value={status}
                      >
                        <Stack spacing={5} direction="row">
                          <Radio colorScheme="green" value="active">
                            Active
                          </Radio>
                          <Radio colorScheme="red" value="deactive">
                            Deactive
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </GridItem>
                  </Grid>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="red"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              Reset
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => {
                submit();
              }}
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditMealModal;
