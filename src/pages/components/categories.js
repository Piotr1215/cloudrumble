import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import ThemedImage from "@theme/ThemedImage";
import Head from "@docusaurus/Head";
import { useState } from "react";
import { icons } from "../../data/icons";
import CategoryLink from "./categoryLink";
const sdksData = require("../../data/sdks.json");

function SectionPart({ title, index, id, description, parts }) {
  return (
    <div
      className="sdk-section my-16 flex flex-col rounded-3xl bg-secondary-900 lg:flex-row"
      data-section={id}
      id={id}
    >
      {/* left */}
      <div className="flex flex-[2] flex-col justify-center p-6 text-center lg:pl-16 lg:text-left">
        <h3 className="text-4xl font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-text-400 lg:max-w-sm">
          {description}
        </p>
      </div>
      {/* right */}
      {parts.map((partItem, index) => (
        <div
          key={index}
          className={clsx(
            "flex-1 bg-secondary-800 p-6 px-6 ",
            index == 0 && "lg:rounded-l-3xl",
            index == 1 && "lg:rounded-r-3xl"
          )}
        >
          <h4>{partItem.title}</h4>
          <p className="text-sm leading-relaxed text-text-400">
            {partItem.description}
          </p>
          <div>
            <ul className="mb-0 flex list-none flex-col gap-2 pl-0">
              {partItem.items.map((item, ind) => (
                <li key={ind}>
                  <CategoryLink
                    href={item.link}
                    Icon={icons[item.icon]}
                    label={item.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoriesSection() {
  const [visibleSection, setVisibleSection] = useState(sdksData.pills[0].id);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target.getAttribute("data-section");

          if (entry.isIntersecting) {
            entry.target.classList.add("intersected");
            setVisibleSection(section);
          }
        }
      },
      { rootMargin: "-50% 0% -50% 0%" }
    );

    const elements = document.querySelectorAll(".sdk-section");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  function Pill({ section, title }) {
    return (
      <div
        className={clsx(
          "flex-1 cursor-pointer whitespace-nowrap rounded-md px-3 lg:px-6 py-2 text-center font-jakarta text-xs lg:text-sm font-semibold",
          visibleSection === section
            ? "bg-primary text-white"
            : "text-black dark:text-white"
        )}
        onClick={() => {
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        {title}
      </div>
    );
  }

  return (
    <section className="bg-secondary-1000 px-4 py-20" id="start-building">
      <Head>
        <link rel="prefetch" href={sdksData.pills[2].whiteImg} />
        <link rel="prefetch" href={sdksData.pills[2].blackImg} />
      </Head>
      <div className="mx-auto max-w-7xl">
        <div className="minecustom-badge">{sdksData.title}</div>

        <div className="sticky top-14 z-20 -mt-4 flex flex-col items-center gap-6 bg-secondary-1000 py-6 lg:flex-row lg:justify-between lg:py-0">
          <h2 className="my-0 text-center font-jakarta lg:text-3xl">
            {sdksData.comment}
          </h2>

          <div className="mx-auto flex h-20 w-full flex-1 items-center justify-center self-start lg:w-auto lg:justify-end">
            <div className="inline-flex items-center rounded-lg bg-zinc-100 p-2 text-sm dark:bg-zinc-800 lg:text-base">
              {sdksData.pills.map((item, index) => (
                <Pill key={index} section={item.id} title={item.title} />
              ))}
            </div>
          </div>
        </div>
        {/* Content */}
        {sdksData.pills.map((pill, index) => (
          <SectionPart
            key={index}
            title={pill.title}
            id={pill.id}
            description={pill.description}
            parts={pill.parts}
            index={index}
          />
        ))}
        {/* <SectionSimple {...sdksData.pills[2]} /> */}
      </div>
    </section>
  );
}
