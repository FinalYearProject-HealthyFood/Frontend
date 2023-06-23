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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api } from "../../../../api";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";

const DeleteMealModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  }, [props.data, onEdit, count]);

  const submit = () => {
      axios
      .delete(`${api}/meals/delete/${props.data.id}`)
      .then((res) => {
        showToast("Success!", "success", "Xóa xuất ăn thành công!");
        setOnEdit(onEdit + 1);
        onClose();
      })
      .catch((error) => {
        showToast("Error!", "error", "Lỗi xảy ra khi xóa xuất ăn!");
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCount(count + 1);
        }}
        colorScheme="red"
      >
        <Icon as={DeleteIcon} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xóa xuất ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <Text fontWeight={"medium"} fontSize={"lg"}>
                  Bạn có chắc muốn xóa xuất ăn này không ?
                </Text>
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
              Xóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteMealModal;
