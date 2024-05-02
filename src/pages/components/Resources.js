import Link from "@docusaurus/Link";
import React from "react";
import RESOURCES from "../../components/resources-data";
const resData = require("../../data/resources.json");

export default function ResourcesSection() {
  return (
    <section className="my-20 px-6">
      <div className="mx-auto max-w-5xl">
        <span className="minecustom-badge">{resData.title}</span>
        <h2 className="lg:text-3xl">{resData.comment}</h2>
        <p className="text-text-400">
          {resData.description} <br />
        </p>

        <div className="no-underline-links mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <Link
              className="group flex flex-col justify-between"
              key={resource.title}
              href={resource.url}
            >
              <div>
                <div className="mb-3 overflow-hidden rounded-lg">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    loading="lazy"
                    className="aspect-video h-full w-full object-cover transition-transform group-hover:scale-110 lg:aspect-square"
                  />
                </div>
                <h3 className="font-semibold text-black group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-500 lg:text-xl">
                  {resource.title}
                </h3>
                {/* <p className="leading-snug text-text-400">
                  {resource.description}
                </p> */}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="rounded-sm bg-purple-500/10 px-3 py-1 text-sm text-purple-500">
                  {resource.type}
                </div>
                <div className="text-sm text-text-400">
                  {`${resource.duration} ${
                    resource.type === "Video" ? "watch" : "read"
                  }`}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-20 flex flex-wrap items-center justify-center gap-3 text-center">
          <span>{resData.viewAll}</span>
          <div className="flex gap-2">
            {resData.links.map((linkItem, index) => (
              <Link
                key={index}
                className="underline underline-offset-8 text-purple-500"
                href={linkItem.url}
              >
                {linkItem.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
