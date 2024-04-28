import React from "react";
import Link from "@docusaurus/Link";

const SOCIAL_MEDIA = [
  {
    title: "GitHub",
    icon: "/img/github.svg",
    link: "https://github.com/Piotr1215",
  },
  {
    title: "Medium",
    icon: "/img/medium.svg",
    link: "https://medium.com/@piotrzan",
  },
  {
    title: "Killercoda",
    icon: "/img/killercoda.ico",
    link: "https://killercoda.com/decoder",
  },
  {
    title: "Youtube",
    icon: "/img/ytb.svg",
    link: "https://www.youtube.com/channel/UCkWVN7H3JqGtJ5Pv5bvCrAw",
  },
];

function FooterSocial() {
  return (
    <div className="space-y-6 w-11/12">
      <img
        src="/img/logo.png"
        alt="logo"
        className="w-40 object-contain h-20"
      />
      <p className="text-sm">Some text here</p>
      <div className="flex flex-row items-center space-x-4">
        {SOCIAL_MEDIA.map((item, index) => (
          <Link key={index} href={item.link}>
            <div
              className="flex p-1 flex-col items-center justify-center h-9 w-9 rounded-sm bg-gray-300"
              key={index}
            >
              <img src={item.icon} alt={item.title} className="w-20 h-20" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterSocial;
