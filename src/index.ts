import { LoadContext, PluginOptions, Plugin } from '@docusaurus/types'
import GitHub from './services/GitHub'
import type { Gists } from './types'

type Content = {
  gists: Gists
}

interface Options extends PluginOptions {
  enabled: boolean
  verbose: boolean
  personalAccessToken?: string
}

// Runtime configuration (safe to send to client)
interface RuntimeOptions {
  enabled: boolean
  verbose: boolean
  gistListPageComponent: string
  gistPageComponent: string
}

const defaults = {
  enabled: true,
  verbose: false,
  gistPageComponent: '@theme/GistPage',
  gistListPageComponent: '@theme/GistListPage',
}

export default async function gists(context: LoadContext, options: Options): Promise<Plugin> {
  const { enabled, verbose, personalAccessToken } = options

  // Token should be passed as process.env.GH_PERSONAL_ACCESS_TOKEN in options during build time
  // This keeps it secure since it's only available during build, not in client code

  // Disabled
  if (!enabled) return { name: 'docusaurus-plugin-content-gists' }

  // Validate token exists and is not empty
  if (!personalAccessToken || personalAccessToken.trim() === '') {
    throw new Error('GitHub Personal Access Token is required but not provided')
  }

  // Mask token for logging purposes
  const maskedToken =
    personalAccessToken.substring(0, 4) +
    '...' +
    personalAccessToken.substring(personalAccessToken.length - 4)
  if (verbose) console.log(`Using GitHub token: ${maskedToken}`)

  const api = new GitHub({ personalAccessToken })

  // Runtime options (safe to send to client) - exclude sensitive data
  const runtimeOptions: RuntimeOptions = {
    enabled,
    verbose,
    gistListPageComponent: defaults.gistListPageComponent,
    gistPageComponent: defaults.gistPageComponent,
  }
  
  // Note: personalAccessToken is intentionally excluded from runtimeOptions
  // to prevent it from being bundled in client code

  return {
    name: 'docusaurus-plugin-content-gists',

    getThemePath() {
      return '../lib/theme'
    },

    getTypeScriptThemePath() {
      return '../src/theme'
    },

    // Configure webpack to exclude sensitive data from client builds
    configureWebpack(config: any, isServer: boolean) {
      if (!isServer) {
        // Use DefinePlugin to replace sensitive environment variables with undefined
        const webpack = require('webpack')
        config.plugins = config.plugins || []
        config.plugins.push(
          new webpack.DefinePlugin({
            // Remove sensitive data from client bundle
            'process.env.GH_PERSONAL_ACCESS_TOKEN': JSON.stringify(undefined),
            'process.env.GITHUB_TOKEN': JSON.stringify(undefined),
          })
        )
      }
      return config
    },

    // Build-time data fetching (server-side only)
    async loadContent(): Promise<Content> {
      if (verbose) console.log('--- Gists ---')

      const user = await api.getUsername()
      if (verbose) console.log(`Retrieving public gists.`)

      const gists = await api.getMyGists()
      if (verbose) console.log(`Found ${gists.length} public gists.`)

      return { gists }
    },

    // Build-time route generation
    async contentLoaded({ content, actions }) {
      const { gists } = content as { gists: Gists }

      // Index
      const gistsData = await actions.createData(`gists-index.json`, JSON.stringify(gists))

      actions.addRoute({
        path: `/gists`,
        component: runtimeOptions.gistListPageComponent,
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
              const gist = await actions.createData(`gist-${id}.json`, JSON.stringify(gistData))

              actions.addRoute({
                path: `/gists/${id}`,
                component: runtimeOptions.gistPageComponent,
                modules: { gist },
                exact: true,
              })
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Unknown error'
              console.error(`Failed to process gist ${id}: ${message}`)
              // Continue processing other gists even if one fails
            }
          }),
        )
      }
    },
  }
}

export { validateOptions } from './validateOptions'
