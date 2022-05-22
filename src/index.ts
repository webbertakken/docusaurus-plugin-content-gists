import { LoadContext, PluginOptions, Plugin } from "@docusaurus/types";
import GitHub, { Gist, Gists } from "./services/GitHub";

type Content = {
  gists: Gists;
};

export default async function gists(
  context: LoadContext,
  options: PluginOptions
): Promise<Plugin> {
  return {
    name: "docusaurus-plugin-content-gists",

    async loadContent(): Promise<Content> {
      console.log("loading gists");
      const gists = await GitHub.getMyGists();

      return { gists };
    },

    async contentLoaded({ content, actions }) {
      const { gists } = content as { gists: Gists };

      // Index
      const gistsData = await actions.createData(
        `gists-index.json`,
        JSON.stringify(gists)
      );

      actions.addRoute({
        path: `/gists`,
        component: "@site/src/components/pages/Gists/GistsPage.tsx",
        modules: {
          gists: gistsData,
        },
        exact: true,
      });

      // Pages
      for (const gistMeta of gists) {
        const path = gistMeta.id;

        const gist = await actions.createData(
          `gist-${path}.json`,
          JSON.stringify(await GitHub.getGist(path))
        );

        actions.addRoute({
          path: `/gists/${path}`,
          component: "@site/src/components/pages/Gists/GistPage.tsx",
          modules: { gist },
          exact: true,
        });
      }
    },
  };
}

export { validateOptions } from "./validateOptions";
