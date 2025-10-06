// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cloud Rumble",
  tagline: "IT Certifications learning notes and blogs. Kubernetes and cloud native ramblings",
  url: "https://frosty-babbage-3125a3.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "Piotr1215",
  projectName: "dca-prep-kit",

  // Single tailwind plugin
  plugins: [
    ['./plugins/tailwind-plugin.cjs', {}],
    require.resolve('docusaurus-plugin-image-zoom')
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath }) =>
            `https://github.com/Piotr1215/dca-prep-kit/edit/master/docs/${docPath}`,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
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
        appId: "YVUCIOP9V7",
        apiKey: "ca28f15cd304fda34283080362ddefc6",
        indexName: "itcertificationsguide",
        contextualSearch: true,
        externalUrlRegex: "external\\.com|domain\\.com",
        searchParameters: {},
        searchPagePath: "search",
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
            to: "/talks",
            label: "Talks",
            position: "left",
          },
          {
            to: "/youtube",
            label: "Videos",
            position: "left",
          },
          {
            to: "/projects",
            label: "Projects",
            position: "left",
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
      zoom: {
        selector: '.markdown img',
        config: {
          background: {
            light: 'rgba(255, 255, 255, 0.9)',
            dark: 'rgba(0, 0, 0, 0.9)'
          }
        }
      },
    }),
};

module.exports = config;
