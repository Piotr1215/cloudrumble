import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Lottie from "react-lottie";
// @ts-ignore
import animationData from "../../lotties/hero2.json";
import Typing from "./typing";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function HeroSection() {
  return (
    <section className=" no-underline-links px-4 pt-16 lg:py-0">
      <Head>
        <link rel="prefetch" href="/homepage/hero-light.png" />
        <link rel="prefetch" href="/homepage/hero-dark.png" />
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col items-center lg:h-[540px] lg:flex-row">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="mb-6 font-jakarta text-4xl font-bold md:w-8/12  lg:text-6xl">
            Cloud Rumble
          </h1>
          <Typing />
          <p className="text-sm text-text-400 lg:max-w-lg lg:text-base">
            IT Certifications learning notes and blogs. Kubernetes and cloud
            native ramblings
          </p>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row">
            <Link
              to="/docs/Fundamentals/containers"
              className="rounded-sm bg-primary px-12 py-2.5 text-center font-semibold text-white hover:text-white"
            >
              Start with Fundamentals
            </Link>
            <Link
              href="/docs/Examples/"
              className="rounded-sm border border-solid border-purple-500 bg-primary/10 px-12 py-2.5 text-center font-semibold text-purple-500 hover:text-purple-500 "
            >
              Examples
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-1 flex-col items-center justify-center  lg:mt-0 ">
          {/* <ThemedImage
            sources={{
              light: "/illus/hero.svg",
              dark: "/illus/hero.svg",
            }}
            alt="Hero Picture"
            className="w-full max-w-[420px] lg:max-w-[560px]"
          /> */}
          <div className="relative w-full ">
            {/* <Lottie
              className="w-full"
              options={defaultOptions}
              isClickToPauseDisabled={true}
            /> */}
            <img src="/img/hero.svg" alt="hero" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
