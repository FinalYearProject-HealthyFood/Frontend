import { } from "@chakra-ui/react";
import React from "react";
import CamKetBar from "./Bar/CamKetBar";
import SystemRecommendBar from "./Bar/SystemRecommendBar";
import YourPreferBar from "./Bar/YourPreferBar";
import Carousel from "./Bar/Carousel";


const Home = () => {
    const sliderdata = [
        {
            id: 1,
            title: "food1",
            img: "https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/top-ten-foods-for-health-2x.jpg",
        },
        {
            id: 1,
            title: "food2",
            img: "https://swsphn.com.au/wp-content/uploads/2022/04/eating-healthy.jpg",
        },
        {
            id: 1,
            title: "food3",
            img: "https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/top-ten-foods-for-health-2x.jpg",
        },
    ]
    return (
        <>
            <Carousel data= {sliderdata} />
            <CamKetBar />
            <SystemRecommendBar data ={{}} />
            <YourPreferBar data ={{}} />

        </>
    )
}

export default Home;