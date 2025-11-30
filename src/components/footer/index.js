import React from "react";
import FooterBottom from "./bottom";
import FooterLast from "./last";
import FooterSecond from "./second";
import FooterSocial from "./social";

function Footer() {
  return (
    <>
      <div className="grid bg-gray-100 dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 py-8 list-none px-6 md:px-12 gap-10 md:grid-cols-2 lg:grid-cols-3  ">
        <FooterSocial />
        <FooterSecond />
        <FooterLast />
      </div>
      <FooterBottom />
    </>
  );
}

export default Footer;
