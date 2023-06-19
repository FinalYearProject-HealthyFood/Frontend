import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Flex,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axiosClient from "../../../../axios";
import { useNavigate } from "react-router-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
const OnlineButton = (props) => {
  const [deliveryFee, setDeliveryFee] = useState(10000);
  const [username, setUsername] = useState(props?.username);
  const [address, setAddress] = useState(props?.delivery_address);
  const [phone, setPhone] = useState(props?.phone);
  const [totalPrice, setTotalPrice] = useState(props?.total_price);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate()
  const toast = useToast();
  useEffect(() => {
    setUsername(props?.username);
    setAddress(props?.address);
    setPhone(props?.phone);
    setTotalPrice(props?.total_price);
  }, [
    props?.username,
    props?.delivery_address,
    props?.phone,
    props?.total_price,
  ]);

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
  return (
    <>
      <Button
        colorScheme="yellow"
        variant="solid"
        isLoading={loading}
        onClick={() => {
          if (
            username == "" ||
            address == "" ||
            phone == "" ||
            totalPrice == 0
          ) {
            showToast(
              "Error!",
              "error",
              "Làm ơn hãy điền đầy đủ thông tin giao hàng!"
            );
          } else {
            onOpen();
          }
        }}
      >
        Thanh toán online
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Flex alignContent={"center"}>
                <Icon
                  boxSize={"24px"}
                  color={"orange"}
                  as={FaShoppingCart}
                  mr={2}
                />
                <Text color={"orange"}>Tiến hành thanh toán</Text>
              </Flex>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box>Bạn có chắc chắn muốn mua không?</Box>
              <Text fontWeight={"medium"} my={5}>
                Chi phí giao dịch: {(props.total_price / 23527.47).toFixed(2)}{" "}
                USD
              </Text>
              <Box>
                Bạn sẽ không thể thay đổi thông tin đơn hàng sau khi đồng ý mua.
              </Box>
              <PayPalButton
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (totalPrice / 23527.47).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const OrderData = {
                      username: props.username,
                      delivery_address: props.delivery_address,
                      phone: props.phone,
                      total_price: props.total_price,
                      payment_id: details.id,
                      payment_mode: "paypal",
                    };
                    setLoading(true);
                    return axiosClient
                      .post("/paypal/store", OrderData)
                      .then((res) => {
                        showToast(
                          "Success!",
                          "success",
                          "Thanh toán thành công!"
                        );
                        navigate('/payment/success');
                        console.log(res);
                        setLoading(false);
                      })
                      .catch((error) => {
                        console.log(error.response.data.message);
                        showToast(
                          "Error!",
                          "error",
                          error.response.data.message
                        );
                          setLoading(false);
                      });
                  });
                }}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default OnlineButton;
