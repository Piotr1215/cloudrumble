import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";

// import HeroSection from "../components/homepage/Hero";
// import SDKsSection from "../components/homepage/SDKs";
// import APIReferenceSection from "../components/homepage/APIReference";
// import CommunitySection from "../components/homepage/Community";
// import HomeFooter from "../components/homepage/Footer";
// import ResourcesSection from "../components/homepage/Resources";
// import HelpSection from "../components/homepage/Help";
import Head from "@docusaurus/Head";
import HeroSection from "./components/hero";
import CategoriesSection from "./components/categories";
import ResourcesSection from "./components/Resources";

export default function Homepage() {
  return (
    <Layout description="" wrapperClassName="homepage flex flex-col" noFooter>
      <Head>
        <link rel="prefetch" href="/css/elements.min.css" />
      </Head>
      <HeroSection />
      <CategoriesSection />
      <ResourcesSection />

      {/* <div className="relative">
        <APIReferenceSection />
        <div className="absolute bottom-0 top-1/2 -z-10 w-full bg-secondary-800 dark:bg-secondary-900"></div>
        <div className="absolute bottom-1/2 top-0 -z-10 w-full bg-secondary-1000"></div>
      </div> */}

      {/* <div className="z-0 bg-secondary-800 dark:bg-secondary-900">
        <ResourcesSection />
        <HelpSection className="-mb-48" />
      </div> */}

      {/* <CommunitySection /> */}

      {/* <HomeFooter /> */}
    </Layout>
  );
}
