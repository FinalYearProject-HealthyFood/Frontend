import React, { useContext, useEffect, useState } from "react";
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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";

const EditFaqModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState(props.faq?.question);
  const [answer, setAnswer] = useState(props.faq?.answer);
  const [count, setCount] = useState(0);
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
    setQuestion(props.faq?.question);
    setAnswer(props.faq.answer);
  }, [props.faq, onEdit, count]);

  const submit = () => {
    const data = {
      question: question,
      answer: answer,
    };
    axios
      .put(`${api}/faq/${props.faq.id}`, data)
      .then((res) => {
        showToast("Success!", "success", "Chỉnh sửa thông tin faq thành công");
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        if (question == "") {
          showToast("Error!", "error", "Question không được bỏ trống.");
        } else if (answer == "") {
          showToast("Error!", "error", "Answer không được bỏ trống.");
        } else {
          showToast("Error!", "error", "Lỗi xảy ra khi chỉnh sửa thông tin");
        }
      });
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin faq</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Question
                </Text>
                <Input
                  fontSize={"md"}
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Answer
                </Text>
                <Textarea
                  fontSize={"md"}
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
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

export default EditFaqModal;
