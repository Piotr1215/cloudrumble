import React from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";
import Head from "@docusaurus/Head";
import TerminalHero from "./components/terminalHero";
import FeaturedProjects from "./components/featuredProjects";
import TerminalContent from "./components/terminalContent";
import Footer from "../components/footer";

export default function Homepage() {
  return (
    <Layout description="" wrapperClassName="homepage flex flex-col" noFooter>
      <Head>
        <link rel="prefetch" href="/css/elements.min.css" />
      </Head>
      <div className="space-y-16 py-16">
        <TerminalHero />
        <FeaturedProjects />
        <TerminalContent />
      </div>
      <Footer />
    </Layout>
  );
}
