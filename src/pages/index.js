import React from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";
import Head from "@docusaurus/Head";
import HeroSection from "./components/hero";
import CategoriesSection from "./components/categories";
import ResourcesSection from "./components/Resources";
import WorkSamples from "../components/workSamples";
import Footer from "../components/footer";

export default function Homepage() {
  return (
    <Layout description="" wrapperClassName="homepage flex flex-col" noFooter>
      <Head>
        <link rel="prefetch" href="/css/elements.min.css" />
      </Head>
      <HeroSection />
      <CategoriesSection />
      <main className="w-full overflow-x-hidden">
        <ResourcesSection />
        <WorkSamples />
      </main>
      <Footer />
    </Layout>
  );
}
