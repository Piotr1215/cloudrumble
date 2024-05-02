import { useState, useEffect } from "react";

const MOBILE_MAX_WIDTH = 767;
const TABLET_MAX_WIDTH = 997;

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("md"); // Default to medium size

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_MAX_WIDTH) {
        setScreenSize("sm");
      } else if (
        window.innerWidth >= MOBILE_MAX_WIDTH + 1 &&
        window.innerWidth < TABLET_MAX_WIDTH
      ) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    // Initial call to set the screen size
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return screenSize;
};

export default useScreenSize;
