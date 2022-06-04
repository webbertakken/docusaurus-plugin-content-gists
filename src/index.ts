import { LoadContext, PluginOptions, Plugin } from '@docusaurus/types'
import GitHub from './services/GitHub'
import type { Gists } from './types'

type Content = {
  gists: Gists
}

interface Options extends PluginOptions {
  enabled: boolean
  verbose: boolean
  personalAccessToken: string
  gistListPageComponent: string
  gistPageComponent: string
}

export default async function gists(context: LoadContext, options: Options): Promise<Plugin> {
  const { enabled, verbose, personalAccessToken, gistListPageComponent, gistPageComponent } =
    options

  // Disabled
  if (!enabled) return { name: 'docusaurus-plugin-content-gists' }

  const api = new GitHub({ personalAccessToken })

  return {
    name: 'docusaurus-plugin-content-gists',

    getThemePath() {
      return '../lib/theme'
    },

    getTypeScriptThemePath() {
      return '../src/theme'
    },

    async loadContent(): Promise<Content> {
      if (verbose) console.log('--- Gists ---')

      const user = await api.getUsername()
      if (verbose) console.log(`Retrieving ${user}'s public gists.`)

      const gists = await api.getMyGists()
      console.log(`Found ${gists.length} public gists for ${user}.`)

      return { gists }
    },

    async contentLoaded({ content, actions }) {
      const { gists } = content as { gists: Gists }

      // Index
      const gistsData = await actions.createData(`gists-index.json`, JSON.stringify(gists))

      actions.addRoute({
        path: `/gists`,
        component: gistListPageComponent,
        modules: {
          gists: gistsData,
        },
        exact: true,
      })

      // Pages
      for (const gistMeta of gists) {
        const id = gistMeta.id

        const gist = await actions.createData(
          `gist-${id}.json`,
          JSON.stringify(await api.getGist(id)),
        )

        actions.addRoute({
          path: `/gists/${id}`,
          component: gistPageComponent,
          modules: { gist },
          exact: true,
        })
      }
    },
  }
}

export { validateOptions } from './validateOptions'
