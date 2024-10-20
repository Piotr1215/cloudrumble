// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const { webpackPlugin } = require("./plugins/webpack-plugin.cjs");
const tailwindPlugin = require("./plugins/tailwind-plugin.cjs");

const plugins = [tailwindPlugin, webpackPlugin];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cloud Rumble",
  tagline:
    "IT Certifications learning notes and blogs. Kubernetes and cloud native ramblings",
  url: "https://frosty-babbage-3125a3.netlify.app",
  // @ts-ignore
  plugins: plugins,
  // url: 'https://cloudrumble.net/',
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "Piotr1215", // Usually your GitHub org/user name.
  projectName: "dca-prep-kit", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: ({ docPath }) =>
            `https://github.com/Piotr1215/dca-prep-kit/edit/master/docs/${docPath}`,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          // Please change this to your repo.
          editUrl: "https://github.com/Piotr1215/dca-prep-kit/tree/master/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "YVUCIOP9V7",

        // Public API key: it is safe to commit it

        apiKey: "ca28f15cd304fda34283080362ddefc6",
        indexName: "itcertificationsguide",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: "Cloud Rumble",
        logo: {
          alt: "IT Certifications Guide",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            to: "/docs/gpts",
            label: "GPTs",
            position: "left",
            label: "GPTs",
          },
          {
            href: "https://github.com/Piotr1215",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://medium.com/@piotrzan",
            label: "Medium",
            position: "right",
          },
          {
            href: "https://killercoda.com/decoder",
            label: "Killercoda",
            position: "right",
          },
          {
            href: "https://www.youtube.com/channel/UCkWVN7H3JqGtJ5Pv5bvCrAw",
            label: "YouTube",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Medium Blog",
                href: "https://medium.com/@piotrzan",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/Piotr1215",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/Piotr1215",
              },
              {
                label: "Impressum",
                to: "/impressum",
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["gherkin"],
      },
    }),
};

module.exports = config;
