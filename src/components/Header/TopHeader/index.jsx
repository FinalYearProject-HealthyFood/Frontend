import { Button, Divider, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import GuestOption from "./GuestOption";
import UserOption from "./UserOption";
import { useStateContext } from "../../../contexts/ContextProvider";

const TopHeader = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
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
      {
        userToken? (
          <UserOption/>
        ) : (
          <GuestOption/>
        )
      }
    </Stack>
  );
};

export default TopHeader;
