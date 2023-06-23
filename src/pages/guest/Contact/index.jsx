import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Stack,
  Radio,
  RadioGroup,
  HStack,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
const AnyReactComponent = ({ text }) => (
  <Flex>
    <Heading>{text}</Heading>
    <Box boxShadow={"lg"} color={"white"} ml={5} bgColor={"brand.200"}>
      <Flex alignItems={"center"} p={3}>
        <Icon as={EmailIcon} />
        <Text ml={2}>danang@healthyfoodstore.site</Text>
      </Flex>
      <Divider />
      <Flex alignItems={"center"} p={3}>
        <Icon as={FaMapMarkerAlt} />
        <Text ml={2}>
          54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt
          Nam
        </Text>
      </Flex>
      <Flex alignItems={"center"} pb={3} px={3}>
        <Icon as={PhoneIcon} />
        <Text ml={2}>84 234 56789</Text>
      </Flex>
    </Box>
  </Flex>
);
const Contact = () => {
  const defaultProps = {
    center: {
      lat: 16.074138866164752,
      lng: 108.14995845389755,
    },
    zoom: 15,
  };
  return (
    <Container mb={30} maxW="100%">
      <Center my={"50px"}>
        <Center boxShadow={"lg"} flexDir={"column"} w={"5xl"} h={"lg"}>
          <Box p={5} w={"5xl"}>
            <Text color={"gray"} fontSize={"xl"}>
              Contact
            </Text>
            <Heading color={"brand.500"} fontSize={"xl"}>
              Healthy Food Store
            </Heading>
          </Box>
          <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            }}
          >
            <AnyReactComponent
              lat={16.074138866164752}
              lng={108.14995845389755}
              text={<FaMapMarkerAlt color="red" />}
            />
          </GoogleMapReact>
        </Center>
      </Center>
    </Container>
  );
};

export default Contact;
