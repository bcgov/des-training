import { defaultTheme } from "@vuepress/theme-default";

import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";


export default defineUserConfig({
  base: "/des-training/",
  lang: "en-US",
  title: "DES Training",
  description: "DES Training site for Containers, Kubernetes, WordPress, Javascript, PHP, and Python",
  theme: defaultTheme({
    editLink: false,
    lastUpdated: true,
    repo: 'https://github.com/bcgov/des-training',
    repoLabel: 'Github',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      // {
      //   text: 'Containers',
      //   link: '/guide/containers/index.md',
      // },
      // {
      //   text: 'Kubernetes',
      //   link: '/guide/kubernetes/index.md',
      // },
    ],
  }),
  plugins: [
    searchPlugin({
      // options
    }),
  ],
});