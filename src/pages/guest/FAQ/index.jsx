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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import FAQElement from "./FAQElement";
import axios from "axios";
import { api } from "../../../api";
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    axios.get(`${api}/faq`).then((res) => {
      console.log(res.data);
      setFaqs(res.data);
    });
  }, []);
  return (
    <Container mb={100} maxW="100%">
      <Center my={"50px"}>
        <Stack textAlign={"center"} w={"4xl"}>
          <Box w={"4xl"}>
            <Heading mb={10} color={"brand.500"} fontSize={"2xl"}>
              Những câu hỏi thường gặp
            </Heading>
            <Accordion allowToggle>
              {faqs.map((data, index) => {
                return <FAQElement key={index} data={data} />;
              })}
            </Accordion>
          </Box>
        </Stack>
      </Center>
    </Container>
  );
};

export default FAQ;
