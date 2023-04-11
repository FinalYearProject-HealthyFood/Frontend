import { Box, Container, Divider, Stack, Text } from "@chakra-ui/react";
import React from "react";
import CamKetBar from "./Bar/CamKetBar";
import SystemRecommendBar from "./Bar/SystemRecommendBar";
import YourPreferBar from "./Bar/YourPreferBar";

const Home = () => {
    return (
        <>
            <CamKetBar/>
            <Container maxW='60%' >
            
            </Container>
            <SystemRecommendBar/>

            <YourPreferBar/>
            
        </>
    )
}

export default Home;