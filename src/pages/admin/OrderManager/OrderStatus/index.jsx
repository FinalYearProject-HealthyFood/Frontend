import { Box, Select, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDashboardActionContext } from "../../../../contexts/DashboardActionContextProvider";
import axios from "axios";
import { api } from "../../../../api";

const OrderStatus = (props) => {
  const { onEdit, setOnEdit } = useDashboardActionContext();
  const [status, setStatus] = useState(props?.data?.status);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    setLoading(false);
    setStatus(props?.data?.status);
  }, [props.data, onEdit]);
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
  const updateStatus = (status) => {
    setLoading(true);
    showToast("Warning!", "warning", "Đang cập nhật trạng thái đơn hàng...");
    axios
      .put(`${api}/orders/update/${props.data.id}`, {
        status: status,
      })
      .then((response) => {
        showToast(
          "Success!",
          "success",
          "Cập nhật trạng thái đơn hàng thành công!"
        );
        setOnEdit(onEdit + 1);
        setLoading(false);
      })
      .catch((error) => {
        showToast("Error!", "warning", "Lỗi khi cập nhật trạng thái đơn hàng!");
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <Box alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.500"
          />
        </Box>
      ) : (
        <Box mb={2}>
          <Select
            fontWeight={"bold"}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              updateStatus(e.target.value);
            }}
          >
            <option value={"pending"}>Pending</option>
            <option value={"accepted"}>Accepted</option>
            <option value={"delivered"}>Delivered</option>
            <option value={"canceled"}>Canceled</option>
          </Select>
        </Box>
      )}
    </>
  );
};

export default OrderStatus;
