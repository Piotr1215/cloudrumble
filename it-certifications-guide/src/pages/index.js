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
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <h1 align="center">Hi 👋, welcome to my web page</h1>
        <h3 align="center">
          My name is Piotr and I'm passionate about cloud native technologies,
          containers, Kubernetes and multi-cloud.
        </h3>
        <ul>
          📝 I regularly write articles on{" "}
          <a href="https://piotrzan.medium.com/">medium</a>
        </ul>
        <ul>
          💬 Ask me about Docker, Kubernetes, Azure, GCP, AWS,
          <a href="https://crossplane.io/">Crossplane</a>, Microservices
        </ul>
        <p align="center">
          <a href="https://twitter.com/piotr1215" target="blank">
            <img
              align="center"
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg"
              alt="piotr1215"
              height="30"
              width="40"
            />
          </a>
          <a href="https://medium.com/@piotrzan" target="blank">
            <img
              align="center"
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/medium.svg"
              alt="@piotrzan"
              height="30"
              width="40"
            />
          </a>
          <a href="https://hub.docker.com/u/piotrzan" target="blank">
            <img
              align="center"
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/docker.svg"
              alt="piotrzan"
              height="30"
              width="40"
            />
          </a>
          <a href="https://www.katacoda.com/decoder" target="blank">
            <img
              align="center"
              src="https://cdn.jsdelivr.net/npm/simple-icons@4.7.0/icons/katacoda.svg"
              alt="piotrzan"
              height="30"
              width="40"
            />
          </a>
        </p>
        <h2>Github Stats</h2>
        <p align="center">
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs?username=piotr1215&show_icons=true&theme=dark&locale=en&layout=compact"
            alt="piotr1215"
          />
        </p>{" "}
        <p align="center">
          <img
            align="center"
            src="https://github-readme-stats.vercel.app/api?username=piotr1215&show_icons=true&theme=dark&locale=en"
            alt="piotr1215"
          />
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/*<main>
          <HomepageFeatures />
        </main> */}
    </Layout>
  );
}
