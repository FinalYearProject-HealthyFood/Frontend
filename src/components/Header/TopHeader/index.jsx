import { Button, Divider, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import GuestOption from "./GuestOption";
import UserOption from "./UserOption";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";

const TopHeader = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  useEffect(() => {
    if (userToken) {
      axiosClient.get("/me").then(({ data }) => {
        setCurrentUser(data);
      });
    }
  }, []);
  return (
    <Stack
      p={2}
      direction="row"
      w="100%"
      justifyContent={"center"}
      alignItems={"center"}
      pr={"2.5%"}
      boxShadow={"md"}
    >
      <Spacer />
      {Object.keys(currentUser).length !== 0 ? <UserOption /> : <GuestOption />}
    </Stack>
  );
};

export default TopHeader;
