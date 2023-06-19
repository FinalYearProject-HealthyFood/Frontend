import React from "react";

import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Image,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Center,
  HStack,
  Spacer,
  Grid,
  GridItem,
  Icon,
  Stack,
  VStack,
  Divider,
  Input,
  Textarea,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IoMail } from "react-icons/io5";

const PaymentSuccess = () => {
  return (
    <Container mb={"100px"} mt={"50px"} h={"md"} maxW={"40%"}>
      <Center mb={5}>
        <Heading color={"blue.500"}>
          Thông báo thanh toán đơn hàng
        </Heading>
      </Center>
      <Center
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="md"
        boxShadow={"base"}
      >
        <Icon color={"green"} boxSize="40px" mr={0}  as={InfoIcon}/>
        <Heading color={"green"} mt={4} mb={1} fontSize="lg">
          Thanh toán đơn hàng thành công!
        </Heading>
        <Box mt={10} maxWidth="sm">
          Cảm ơn bạn đã chọn HFS.
          <Text fontWeight={"medium"} color={"orange"}>
            Đơn hàng của bạn sẽ được gửi qua mail.
          </Text>
          <Icon color={"orange"} boxSize={"24px"} as={IoMail} />
        </Box>
      </Center>
    </Container>
  );
};

export default PaymentSuccess;
