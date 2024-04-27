import * as React from "react";
import StarSvg from "../../icons/star.svg";
import ClapSvg from "../../icons/clap.svg";
import InfiniteAutoplaySwipe from "../../components/infinityAutoplaySwipe";
import useScreenSize from "../../hooks/useScreenSize";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

const data = [
  {
    name: "az-300-prep-kit",
    date: "Feb 4, 2024",
    rating: 150,
    comment: "Exercises and notes preparing for az-300 exam",
    url: "https://github.com/Piotr1215/az-300-prep-kit",
    platform: "GitHub",
  },
  {
    name: "Tandy C",
    date: "Feb 4, 2024 1:00 am",
    rating: 540,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",
    url: "https://github.com/Piotr1215/az-300-prep-kit",
    platform: "Medium",
  },
  {
    name: "Tandy D",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",
    url: "https://github.com/Piotr1215/az-300-prep-kit",
    platform: "GitHub",
  },
  {
    name: "Tandy E",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",
    url: "https://github.com/Piotr1215/az-300-prep-kit",
    platform: "GitHub",
  },
];

function Reviews() {
  const screenSize = useScreenSize();
  return (
    <div className="flex flex-col  items-center space-y-6 mb-20">
      <main className="container lg:px-12 ">
        <span className="minecustom-badge">Work</span>
        <h2 className="lg:text-3xl">Popular Repositories & Blogs</h2>
        <p className="text-text-400">
          More than 1k stars on GitHub and 100K claps on Medium.
          <br />
        </p>

        <InfiniteAutoplaySwipe
          Comp={Card}
          data={data}
          number={screenSize === "sm" ? 1 : screenSize === "md" ? 2 : 3}
        />
      </main>
    </div>
  );
}

function Card({ item }) {
  return (
    <Link
      href={item.url}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="max-w-96 border min-h-48 my-6 border-gray-500 rounded-2xl p-4 shadow-lg  dark:shadow-gray-800">
        <div className="flex flex-row justify-between items-start text-sm space-x-2 mb-2">
          <div className="flex flex-row items-start space-x-2">
            <ThemedImage
              sources={{
                light:
                  item.platform === "Medium"
                    ? useBaseUrl("/img/medium.svg")
                    : "/img/github.svg",
                dark:
                  item.platform === "Medium"
                    ? useBaseUrl("/img/medium-dark.svg")
                    : "/img/github-dark.svg",
              }}
              alt=""
              className="w-16 rounded-full h-16"
            />
            <div className="flex flex-col items-start space-y-[2px]">
              <p className="font-semibold mb-0">{item.name}</p>
              <span className="text-xs">{item.date}</span>
              <Rating platform={item.platform} rating={item.rating} />
            </div>
          </div>
        </div>
        <p className="text-sm text-left">&quot;{item.comment}&quot;</p>
      </div>
    </Link>
  );
}

function Rating({ rating, platform }) {
  return (
    <div className="flex flex-row items-center justify-center text-center space-x-1">
      <span className="text-sm">{rating}</span>
      {platform === "Medium" ? (
        <ClapSvg className="w-6" />
      ) : (
        <StarSvg className="w-6 " />
      )}
    </div>
  );
}

export default Reviews;
