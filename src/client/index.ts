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

  // Client-side search/filtering (if needed)
  filterGists(gists: any[], searchTerm: string): any[] {
    if (!searchTerm) return gists
    
    return gists.filter(gist => 
      gist.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(gist.files || {}).some((file: any) => 
        file.filename?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }
}

// Export factory function
export function createGistsClient(config: RuntimeConfig): GistsClient {
  return new GistsClient(config)
}

// Export types for theme components
export type { RuntimeConfig }
export { GistsClient }