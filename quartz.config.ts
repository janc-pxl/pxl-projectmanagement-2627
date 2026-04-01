import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Project Management",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "nl-BE",
    baseUrl: "janc-pxl.github.io/pxl-projectmanagement-2627",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Raleway",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f7f5",       // --bg
          lightgray: "#e0ddd6",   // --border
          gray: "#666666",        // --muted
          darkgray: "#1a1a1a",    // --text
          dark: "#030203",        // --primary
          secondary: "#AE9A64",   // --gold
          tertiary: "#2a9d8f",    // --green
          highlight: "rgba(174, 154, 100, 0.12)",  // --gold-bg
          textHighlight: "#AE9A6488",
        },
        darkMode: {
          light: "#030203",       // --primary (donkere achtergrond)
          lightgray: "#393639",
          gray: "#666666",        // --muted
          darkgray: "#e0ddd6",    // --border (omgekeerd voor dark)
          dark: "#f8f7f5",        // --bg (omgekeerd voor dark)
          secondary: "#AE9A64",   // --gold (blijft gelijk)
          tertiary: "#2a9d8f",    // --green (blijft gelijk)
          highlight: "rgba(174, 154, 100, 0.12)",  // --gold-bg
          textHighlight: "#AE9A6488",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
