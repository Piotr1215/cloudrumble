import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Lottie from "react-lottie";
// @ts-ignore
import animationData from "../../lotties/hero.json";

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
    <section className="noise-bg no-underline-links px-4 pt-16 lg:py-0">
      <Head>
        <link rel="prefetch" href="/homepage/hero-light.png" />
        <link rel="prefetch" href="/homepage/hero-dark.png" />
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col items-center lg:h-[540px] lg:flex-row">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="mb-6 font-jakarta text-4xl font-bold md:w-8/12  lg:text-6xl">
            Cloud Rumble
          </h1>
          <p className="text-sm text-text-400 lg:max-w-lg lg:text-base">
            IT Certifications learning notes and blogs. Kubernetes and cloud
            native ramblings
          </p>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row">
            <Link
              to="/api"
              className="rounded-sm bg-primary px-12 py-2.5 text-center font-semibold text-white hover:text-white"
            >
              Start with Fundamentals
            </Link>
            <Link
              href="/getting-started"
              className="rounded-sm border border-solid border-primary bg-primary/10 px-12 py-2.5 text-center font-semibold text-primary hover:text-primary dark:border-primary-100 dark:text-primary-100"
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
          <div className="relative w-8/12 ">
            <Lottie
              className="w-full"
              options={defaultOptions}
              isClickToPauseDisabled={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
