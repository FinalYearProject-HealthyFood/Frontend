import { useState, useEffect } from "react";

function useScrollTrigger(threshold = 0) {
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > threshold) {
                setTrigger(true);
            } else {
                setTrigger(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    return trigger;
}

export default useScrollTrigger;