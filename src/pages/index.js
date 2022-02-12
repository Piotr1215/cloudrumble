import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";

import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Piotr1215&amp;repo=dca-prep-kit&amp;type=watch&amp;count=true"
          height="20"
          width="118"
          frameBorder="0"
          scrolling="0"
          style={{ width: "118px", height: "20px" }} >
        </iframe>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <TwitterButton/>
        <hr></hr>
        <img className="src" src="/img/k8s-services-mindmap.svg" alt="" />
      </div>
    </header>
  );
}

function TwitterButton() {
  return (
    <a
      href="https://twitter.com/intent/follow?screen_name=Piotr1215&region=follow_link"
      className="twitter-follow-button">
      <div className="icon" />
      Follow @Piotr1215
    </a>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
