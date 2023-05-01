import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Stack,
  Input,
  TableContainer,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUser, FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdMoney } from "react-icons/md";
import { GiMeal, GiMeat } from "react-icons/gi";

const UserManager = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const TableData = [
    {
      name: "Cơm thị bò",
      price: 25000,
    },
    {
      name: "Cơm thị bò",
      price: 25000,
    },
    {
      name: "Cơm thị bò",
      price: 25000,
    },
    {
      name: "Cơm thị bò",
      price: 25000,
    },
  ];
  return (
    <Stack>
      <VStack>
        <Box>
          <Heading fontSize={"2xl"} color={"brand.800"}>
            Quản lý xuất ăn
          </Heading>
        </Box>
        <Divider bgColor="gray" h={"1px"} />
        <Flex mt="2%" mb="3%" w="100%" h="9%" justifyContent={"center"}>
          <InputGroup size="md" w="70%" h="100%">
            <InputLeftElement>
              <BsSearch />
            </InputLeftElement>
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              border="2px"
              focusBorderColor="none"
              type="text"
              placeholder="Tìm kiếm Xuất ăn..."
            />
          </InputGroup>
        </Flex>

        {/* =================> Add button */}

        <Flex w={"70%"} justifyContent={"right"}>
          <Button onClick={onOpen} colorScheme="brand">
            <Icon boxSize={"24px"} as={FaUser} />
            <Icon ml={2} as={AddIcon} />
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* =================> Add button */}
        <TableContainer w={"70%"}>
          <Table variant={"striped"}>
            <Thead bgColor={"#1F1D36"}>
              <Tr>
                <Th color={"white"}>STT</Th>
                <Th color={"white"}>Tên sản phẩm</Th>
                <Th color={"white"}>Giá đơn vị</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {TableData.map((data, index) => {
                return (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{data.name}</Td>
                    <Td>{data.price}</Td>
                    <Td>
                      <Stack alignItems={"center"}>
                        <Flex alignItems={"center"}>
                          <Button mr={2} colorScheme="blue">
                            <Icon as={ViewIcon} />
                          </Button>
                          <Stack>
                            <Button colorScheme="yellow">
                              <Icon as={EditIcon} />
                            </Button>
                            <Button colorScheme="red">
                              <Icon as={DeleteIcon} />
                            </Button>
                          </Stack>
                        </Flex>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Stack>
  );
};

export default UserManager;
