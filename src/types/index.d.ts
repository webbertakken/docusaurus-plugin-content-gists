/// <reference types="@docusaurus/theme-classic" />
/// <reference types="@docusaurus/module-type-aliases" />

import { Octokit } from 'octokit'
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'

const octokit = new Octokit()

export type Authenticated = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.users.getAuthenticated
>
export type Gist = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.gists.get>
export type Gists = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.gists.list>

declare module '@theme/GistLayout' {
  export interface Props {
    children: string
  }

  export default function GistLayout(props: Props): JSX.Element
}
