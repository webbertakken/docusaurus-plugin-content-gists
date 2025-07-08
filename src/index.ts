import { LoadContext, PluginOptions, Plugin } from '@docusaurus/types'
import GitHub from './services/GitHub'
import type { Gists } from './types'

type Content = {
  gists: Gists
}

interface Options extends PluginOptions {
  enabled: boolean
  verbose: boolean
  gistListPageComponent: string
  gistPageComponent: string
}

export default async function gists(context: LoadContext, options: Options): Promise<Plugin> {
  const { enabled, verbose, gistListPageComponent, gistPageComponent } = options

  // Disabled
  if (!enabled) return { name: 'docusaurus-plugin-content-gists' }

  // Get token from environment during build time only - never from options
  const personalAccessToken = process.env.GH_PERSONAL_ACCESS_TOKEN
  
  // Validate token exists and is not empty
  if (!personalAccessToken || personalAccessToken.trim() === '') {
    throw new Error('GitHub Personal Access Token is required but not provided')
  }

  // Mask token for logging purposes
  const maskedToken = personalAccessToken.substring(0, 4) + '...' + personalAccessToken.substring(personalAccessToken.length - 4)
  if (verbose) console.log(`Using GitHub token: ${maskedToken}`)

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
      if (verbose) console.log(`Retrieving public gists.`)

      const gists = await api.getMyGists()
      if (verbose) console.log(`Found ${gists.length} public gists.`)

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
      const maxConcurrent = 5 // Process gists in batches to avoid overwhelming the API
      for (let i = 0; i < gists.length; i += maxConcurrent) {
        const batch = gists.slice(i, i + maxConcurrent)
        
        await Promise.all(
          batch.map(async (gistMeta) => {
            const id = gistMeta.id
            
            try {
              const gistData = await api.getGist(id)
              const gist = await actions.createData(
                `gist-${id}.json`,
                JSON.stringify(gistData),
              )

              actions.addRoute({
                path: `/gists/${id}`,
                component: gistPageComponent,
                modules: { gist },
                exact: true,
              })
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Unknown error'
              console.error(`Failed to process gist ${id}: ${message}`)
              // Continue processing other gists even if one fails
            }
          })
        )
      }
    },
  }
}

export { validateOptions } from './validateOptions'
