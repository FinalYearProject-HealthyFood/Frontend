import { Button } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import useScrollTrigger from "./useScrollTrigger";

const MotionBox = motion(Button);

function ScrollTopButton() {
    const trigger = useScrollTrigger(50);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <MotionBox
            position="fixed"
            bottom="5%"
            right="5%"
            backgroundColor="brand.500"
            color="white"
            size="md"
            borderRadius="full"
            boxShadow="md"
            onClick={handleClick}
            _hover={{ backgroundColor: "teal.600" }}
            animate={{ y: trigger ? 0 : 100 }}
            transition={{ duration: 0.2 }}
            zIndex={100}
        >
            <FaArrowUp />
        </MotionBox>
    );
}

export default ScrollTopButton;