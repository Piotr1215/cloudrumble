import React from "react";
function FooterBottom() {
  return (
    <div className="flex py-8 bg-gray-50 dark:bg-gray-900 flex-col items-center justify-center w-full">
      <p className="text-sm text-[#a4A4A4]">
        ©{new Date().getFullYear()} Cloud Rumble. All rights reserved.
      </p>
    </div>
  );
}

export default FooterBottom;
