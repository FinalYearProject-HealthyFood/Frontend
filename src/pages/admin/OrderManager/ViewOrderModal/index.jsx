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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import moment from "moment";
import axios from "axios";
import { api, api_image } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";
import { MdFileUpload } from "react-icons/md";

const ViewOrderModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(props.data?.status);
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const toast = useToast();
  const { onEdit, setOnEdit } = useDashboardActionContext();

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
    axios
      .get(`${api}/orders/${props.data?.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {});
    setStatus(props.data?.status);
  }, [props.data, onEdit, count]);

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCount(count + 1);
        }}
        mr={2}
        colorScheme="blue"
      >
        <Icon as={ViewIcon} />
      </Button>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông tin đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Stack m={10}>
                <Text fontWeight={"semibold"}>
                  Thông tin chi tiết đơn hàng:
                </Text>
                <Table borderWidth={1} variant="simple">
                  <Tbody>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Order ID:
                      </Th>
                      <Td>{data.id}</Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Tình trạng đơn hàng:
                      </Th>
                      <Td
                        color={
                          data.status == "pending"
                            ? "orange"
                            : data.status == "accepted"
                            ? "green"
                            : data.status == "delivered"
                            ? "blue"
                            : "red"
                        }
                      >
                        {data.status == "pending"
                          ? "Đang xử lý"
                          : data.status == "accepted"
                          ? "Đã được chấp nhận"
                          : data.status == "delivered"
                          ? "Đã giao"
                          : "Đã hủy bỏ"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Hình thức thanh toán:
                      </Th>
                      <Td
                        color={
                          data.payment_mode == "paypal"
                            ? "blue"
                            : "green"
                        }
                      >
                        {data.payment_mode == "paypal"
                          ? "Đã thanh toán PayPpal"
                          : "Thanh toán khi giao hàng"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Ngày đặt:
                      </Th>
                      <Td>
                        {moment(data?.created_at).format("H:m, DD/MM/YYYY")}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Tên khách hàng:
                      </Th>
                      <Td>{data.username}</Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Địa chỉ người nhận:
                      </Th>
                      <Td>{data.delivery_address}</Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Số điện thoại người nhận:
                      </Th>
                      <Td>{data.phone}</Td>
                    </Tr>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Đơn giá
                      </Th>
                      <Th>
                        {data.total_price?.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}{" "}
                        vnđ
                      </Th>
                    </Tr>
                  </Tbody>
                </Table>
                <Box>
                  <Text mt={5} fontWeight={"semibold"}>
                    Danh sách sản phẩm:
                  </Text>
                </Box>
                <Table borderWidth={1} variant="simple">
                  <Thead>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        STT
                      </Th>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Sản phẩm
                      </Th>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        Số lượng
                      </Th>
                      <Th borderRightWidth={2} textAlign={"center"}>
                        chi tiết
                      </Th>
                      <Th textAlign={"center"}>Giá</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.order_items?.map((data, index) => {
                      if (data.meal_id) {
                        return (
                          <Tr key={index}>
                            <Td borderRightWidth={2}>{index}</Td>
                            <Td borderRightWidth={2}>{data.meal.name}</Td>
                            <Td borderRightWidth={2}>
                              {(
                                data.meal.serving_size * data.quantity
                              )?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}{" "}
                              grams
                            </Td>
                            <Td borderRightWidth={2}>
                              {data?.meal?.ingredients?.length > 0
                                ? data?.meal?.ingredients?.map(
                                    (data, index) => (
                                      <Text>
                                        {data.name} x{" "}
                                        {(
                                          data.serving_size *
                                          data?.pivot?.quantity
                                        )?.toLocaleString(undefined, {
                                          maximumFractionDigits: 3,
                                        })}{" "}
                                        grams
                                      </Text>
                                    )
                                  )
                                : "None"}
                            </Td>
                            <Td>
                              {data.total_price?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}{" "}
                              vnđ
                            </Td>
                          </Tr>
                        );
                      } else {
                        return (
                          <Tr key={index}>
                            <Td borderRightWidth={2}>{index}</Td>
                            <Td borderRightWidth={2}>{data.ingredient.name}</Td>
                            <Td borderRightWidth={2}>
                              {(
                                data.ingredient.serving_size * data.quantity
                              )?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}{" "}
                              grams
                            </Td>
                            <Td borderRightWidth={2}>None</Td>
                            <Td borderRightWidth={2}>
                              {data.total_price?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}{" "}
                              vnđ
                            </Td>
                          </Tr>
                        );
                      }
                    })}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th borderRightWidth={2} textAlign={"center"} colSpan={3}>
                        Tổng giá thành
                      </Th>
                      <Th textAlign={"center"} colSpan={2}>
                        {data.total_price?.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}{" "}
                        vnđ
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Stack>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewOrderModal;
