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
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api, api_image } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";
import { GiMeat } from "react-icons/gi";
import imgPreview from "../../../../assets/image-removebg-preview1.png";
import { MdFileUpload } from "react-icons/md";

const AddIngredientModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [serving, setServing] = useState(0);
  const [price, setPrice] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carb, setCarb] = useState(0);
  const [transFat, setTransFat] = useState(0);
  const [satFat, setSatFat] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [iron, setIron] = useState(0);
  const [zinc, setZinc] = useState(0);
  const [status, setStatus] = useState("deactive");
  const [count, setCount] = useState(0);
  const [imageView, setImageView] = useState(imgPreview);
  const [image, setImage] = useState("");
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
    setName("");
    setServing(0);
    setPrice(0);
    setCalories(0);
    setProtein(0);
    setFat(0);
    setCarb(0);
    setTransFat(0);
    setSatFat(0);
    setFiber(0);
    setSugar(0);
    setCholesterol(0);
    setSodium(0);
    setCalcium(0);
    setIron(0);
    setZinc(0);
    setStatus("deactive");
    setImage("");
    setImageView(imgPreview);
  }, [onEdit, count]);

  const submit = () => {
    const data = {
      name: name,
      price: price,
      serving_size: serving,
      calories: calories,
      protein: protein,
      fat: fat,
      sat_fat: satFat,
      trans_fat: transFat,
      fiber: fiber,
      sugar: sugar,
      cholesterol: cholesterol,
      sodium: sodium,
      calcium: calcium,
      iron: iron,
      status: status,
    };
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("serving_size", serving);
    formdata.append("calories", calories);
    formdata.append("protein", protein);
    formdata.append("fat", fat);
    formdata.append("carb", carb);
    formdata.append("sat_fat", satFat);
    formdata.append("trans_fat", transFat);
    formdata.append("fiber", fiber);
    formdata.append("sugar", sugar);
    formdata.append("cholesterol", cholesterol);
    formdata.append("sodium", sodium);
    formdata.append("calcium", calcium);
    formdata.append("iron", iron);
    formdata.append("zinc", zinc);
    formdata.append("status", status);
    formdata.append("image", image);
    axios
      .post(`${api}/ingredients/store`, formdata)
      .then((res) => {
        showToast("Success!", "success", "Thêm thành phần ăn thành công");
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        showToast("Error!", "error", "Lỗi xảy ra khi Thêm thành phần ăn");
      });
  };

  const handleReset = () => {
    setName("");
    setServing(0);
    setPrice(0);
    setCalories(0);
    setProtein(0);
    setFat(0);
    setCarb(0);
    setTransFat(0);
    setSatFat(0);
    setFiber(0);
    setSugar(0);
    setCholesterol(0);
    setSodium(0);
    setCalcium(0);
    setIron(0);
    setZinc(0);
    setStatus("deactive");
    setImage("");
    setImageView(imgPreview);
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCount(count + 1);
        }}
        colorScheme="brand"
      >
        <Icon boxSize={"24px"} as={GiMeat} />
        <Icon ml={2} as={AddIcon} />
      </Button>
      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin thành phần ăn</ModalHeader>
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
                  </Flex>
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
            <Button mr={3} colorScheme="red" onClick={handleReset}>
              Reset
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => {
                submit();
              }}
            >
              Thêm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddIngredientModal;
