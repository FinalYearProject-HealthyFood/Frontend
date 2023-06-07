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

const AlreadyVerify = () => {
  return (
    <Container mt={"50px"} maxW={"60%"}>
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Email này đã được xác thực!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Chào mừng bạn đến với Healthy Food Store. Bây giờ bạn đã có thể mua
          hàng trực tuyến.
        </AlertDescription>
      </Alert>
    </Container>
  );
};

export default AlreadyVerify;
