import {useEffect, useState} from "react";

export const useIsMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 500;

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])

    return isMobile
}