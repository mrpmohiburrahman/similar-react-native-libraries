const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'Similar React Native Libraries',
  tagline: 'Similar React Native Libraries components made by community! 🚀',
  url: 'https://mrpmohiburrahman.github.io',
  baseUrl: '/similar-react-native-libraries/',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'mrpmohiburrahman',
  projectName: 'react-native-bottom-sheet',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'warn',
  themeConfig: {
    image: 'img/icon.png',
    navbar: {
      title: 'Similar React Native Libraries',
      hideOnScroll: false,
      items: [
        // {
        //   to: "modal",
        //   activeBasePath: "modal",
        //   label: "Bottom Sheet Modal",
        //   position: "left",
        // },
        // { to: "blog", label: "Blog", position: "left" },
        // { to: "sponsors", label: "Sponsors", position: "right" },
        {
          href: 'https://github.com/mrpmohiburrahman/similar-react-native-libraries',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: themes.dracula,
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} <a rel="noreferrer" href="https://www.linkedin.com/in/mrpmohiburrahman/" target="_blank">MD. MOHIBUR RAHMAN</a>. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          path: 'docs',
          // editUrl:
          //   "https://github.com/gorhom/react-native-bottom-sheet/edit/website/",
          // lastVersion: "current",
          include: ['**/*.md', '**/*.mdx'],
        },
        // blog: {
        //   path: "blog",
        //   routeBasePath: "/blog",
        //   showReadingTime: false,
        //   blogSidebarCount: "ALL",
        //   editUrl:
        //     "https://github.com/gorhom/react-native-bottom-sheet/edit/website/website/blog/",
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // googleAnalytics: {
        //   trackingID: "UA-193461439-1",
        //   anonymizeIP: true,
        // },
      },
    ],
  ],
  plugins: [
    [
      'posthog-docusaurus',
      {
        apiKey: 'phc_7Pq4TSUWwqrOku8lgK8jfRD4TZcNsWA8eRPHE8iUPvq',
        appUrl: 'https://us.i.posthog.com',
        enableInDevelopment: false,
        onPostHogReady: () => {
          console.log('PostHog is ready');
        },
      },
    ],
  ],
};
