import * as React from "react";
import StarSvg from "../icons/star.svg";
import ClapSvg from "../icons/clap.svg";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
const data = require("../data/work.json");

function WorkSamples() {
  return (
    <div className="flex flex-col  items-center space-y-6 mb-20">
      <main className="container lg:px-12 ">
        <span className="minecustom-badge">Work</span>
        <h2 className="lg:text-3xl">Popular Repositories & Blogs</h2>
        <p className="text-text-400">
          More than 1k stars on GitHub and 100K claps on Medium.
          <br />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
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
      <div className="max-w-96 border min-h-48 my-6 border-gray-500 rounded-2xl p-4 shadow-lg shadow-blue-200 dark:shadow-blue-900">
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
        <p className="text-sm text-left">{item.comment}</p>
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

export default WorkSamples;
