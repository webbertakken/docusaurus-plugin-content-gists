/**
 * Client-side plugin component
 * This runs in the browser and has access to runtime configuration only
 */

interface RuntimeConfig {
  enabled: boolean
  verbose: boolean
  gistListPageComponent: string
  gistPageComponent: string
}

class GistsClient {
  private config: RuntimeConfig

  constructor(config: RuntimeConfig) {
    this.config = config
  }

  // Client-side utility methods
  isEnabled(): boolean {
    return this.config.enabled
  }

  isVerbose(): boolean {
    return this.config.verbose
  }

  getGistListComponent(): string {
    return this.config.gistListPageComponent
  }

  getGistPageComponent(): string {
    return this.config.gistPageComponent
  }

  // Client-side analytics or tracking
  trackGistView(gistId: string): void {
    if (this.config.verbose) {
      console.log(`Viewing gist: ${gistId}`)
    }

    // Could send analytics events here
    // Note: No access to GitHub API tokens - this is client-side only
  }

  // Client-side URL helpers
  getGistUrl(gistId: string): string {
    return `/gists/${gistId}`
  }

  getGistListUrl(): string {
    return '/gists'
  }

  // Client-side search/filtering. The `Gist` shape comes from the octokit
  // response; we use a structural type with only the fields we read.
  filterGists<T extends ClientGist>(gists: T[], searchTerm: string): T[] {
    if (!searchTerm) return gists

    const needle = searchTerm.toLowerCase()
    return gists.filter(
      (gist) =>
        gist.description?.toLowerCase().includes(needle) ||
        Object.values(gist.files ?? {}).some((file) =>
          file?.filename?.toLowerCase().includes(needle),
        ),
    )
  }
}

// Export factory function
export function createGistsClient(config: RuntimeConfig): GistsClient {
  return new GistsClient(config)
}

// Minimal structural type the client-side filter uses. Avoids leaking the
// octokit Gist shape into the client bundle.
export interface ClientGistFile {
  filename?: string | null
}
export interface ClientGist {
  description?: string | null
  files?: Record<string, ClientGistFile | null | undefined>
}

// Export types for theme components
export type { RuntimeConfig }
export { GistsClient }
