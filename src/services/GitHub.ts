import { Octokit } from 'octokit'
import { throttling } from '@octokit/plugin-throttling'
import { Authenticated, Gist, Gists } from '../types'

type Props = {
  personalAccessToken: string
}

// Structural alias for the throttle callback's `options` argument. The
// library types it as `Required<EndpointDefaults>`; we only read `method`
// and `url`. The current retry count is the 4th callback parameter
// (a `number`), not a property on `options.request`.
type ThrottleEndpoint = { method: string; url: string }

const OctokitWithThrottling = Octokit.plugin(throttling)

export default class GitHub {
  private instance: InstanceType<typeof OctokitWithThrottling>
  private maxGists: number = 100 // Limit to prevent resource exhaustion

  constructor(props: Props) {
    const { personalAccessToken: auth } = props
    this.instance = new OctokitWithThrottling({
      auth,
      throttle: {
        onRateLimit: (retryAfter, options, _octokit, retryCount) => {
          const o = options as unknown as ThrottleEndpoint
          console.warn(`Request quota exhausted for request ${o.method} ${o.url}`)
          if (retryCount === 0) {
            console.log(`Retrying after ${retryAfter} seconds!`)
            return true
          }
          return false
        },
        onSecondaryRateLimit: (_retryAfter, options) => {
          const o = options as unknown as ThrottleEndpoint
          console.warn(`Secondary rate limit detected for request ${o.method} ${o.url}`)
          return false
        },
      },
    })
  }

  public async getAuthenticated(): Promise<Authenticated> {
    try {
      const response = await this.instance.rest.users.getAuthenticated()
      return response.data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('Failed to authenticate with GitHub:', message)
      throw new Error('GitHub authentication failed. Please check your Personal Access Token.', {
        cause: error,
      })
    }
  }

  public async getUsername() {
    try {
      const authenticated = await this.getAuthenticated()
      return authenticated?.login || null
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('Failed to get username:', message)
      return null
    }
  }

  public async getMyGists(): Promise<Gists> {
    try {
      const response = await this.instance.rest.gists.list({
        per_page: this.maxGists,
        page: 1,
      })

      const publicGists = response.data.filter((gist) => gist.public === true)

      if (publicGists.length === this.maxGists) {
        console.warn(`Gist limit of ${this.maxGists} reached. Some gists may not be included.`)
      }

      return publicGists.slice(0, this.maxGists)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('Failed to fetch gists:', message)
      return []
    }
  }

  public async getGist(id: string): Promise<Gist> {
    // Validate gist ID format
    if (!id || !/^[a-f0-9]{32}$/.test(id)) {
      throw new Error(`Invalid gist ID format: ${id}`)
    }

    try {
      const response = await this.instance.rest.gists.get({ gist_id: id })
      return response.data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(`Failed to fetch gist ${id}:`, message)
      throw new Error(`Failed to fetch gist: ${message}`, { cause: error })
    }
  }
}
