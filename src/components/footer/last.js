import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const PAGES = [
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Medium",
    link: "https://medium.com/@piotrzan",
  },
  {
    title: "GitHub",
    link: "https://github.com/Piotr1215",
  },
  {
    title: "X",
    link: "https://twitter.com/Piotr1215",
  },
  // {
  //   title: "YouTube",
  //   link: "https://www.youtube.com/channel/UCkWVN7H3JqGtJ5Pv5bvCrAw",
  // },
  {
    title: "Impressum",
    link: "/impressum",
  },
];

function FooterLast() {
  return (
    <ul className="space-y-2 list-none">
      <li className="!mb-6 w-full font-semibold text-base">Community</li>
      {PAGES.map((page, index) => (
        <li
          className={clsx(
            "w-full font-medium ml-4",
            "hover:underline trasnition ease-in-out duration-300 transform hover:scale-105",
            // underline offset
            "underline-offset-2 space-y-1"
          )}
          key={index}
        >
          <Link
            href={page.link}
            key={index}
            className="w-full text-gray-500 hover:text-purple-600 dark:hover:text-purple-500 text-sm"
          >
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default FooterLast;
