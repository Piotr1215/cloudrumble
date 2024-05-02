import React from "react";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";

const SOCIAL_MEDIA = [
  {
    title: "GitHub",
    icon: "/img/github.svg",
    dark: "/img/github-dark.svg",
    link: "https://github.com/Piotr1215",
  },
  {
    title: "Medium",
    icon: "/img/medium.svg",
    dark: "/img/medium-dark.svg",
    link: "https://medium.com/@piotrzan",
  },
  {
    title: "Killercoda",
    icon: "/img/killercoda.ico",
    dark: "/img/killercoda.ico",
    link: "https://killercoda.com/decoder",
  },
  {
    title: "Youtube",
    icon: "/img/ytb.svg",
    dark: "/img/ytb-dark.svg",
    link: "https://www.youtube.com/channel/UCkWVN7H3JqGtJ5Pv5bvCrAw",
  },
];

function FooterSocial() {
  return (
    <div className="space-y-6 w-11/12">
      <img
        src="/img/logo.svg"
        alt="logo"
        className="w-40 object-contain h-20"
      />
      <p className="text-sm">Follow me on social media</p>
      <div className="flex flex-row items-center space-x-4">
        {SOCIAL_MEDIA.map((item, index) => (
          <Link key={index} href={item.link}>
            <div
              className="flex p-1 flex-col items-center justify-center h-9 w-9 rounded-sm "
              key={index}
            >
              <ThemedImage
                sources={{
                  light: item.icon,

                  dark: item.dark,
                }}
                alt=""
                className="w-20 h-20"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterSocial;
