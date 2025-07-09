# Docusaurus gists plugin

> Use gists as a type of content in Docusaurus.

## Introduction

This plugin adds a page to your Docusaurus instance, displaying all _public_ gists of a GitHub user.

The user is automatically configured based on the (GitHub PAT) token provided.

See it in action on [Takken.io](https://takken.io).

## ⚠️ Security Update (v4.0.0+)

**Breaking Change:** For security reasons, the `personalAccessToken` option has been removed. The
GitHub token must now be provided via the `GH_PERSONAL_ACCESS_TOKEN` environment variable only.

If you're upgrading from a previous version:

1. Remove `personalAccessToken` from your plugin configuration
2. Ensure `GH_PERSONAL_ACCESS_TOKEN` is set in your environment

## Setup

### Install dependencies

Choose one:

```bash
# NPM
npm install dotenv docusaurus-plugin-content-gists

# Yarn
yarn add dotenv docusaurus-plugin-content-gists
```

### Configure

#### `.gitignore`

```gitignore
.env
```

#### `.env`

```env
GH_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

#### `docusaurus.config.js`

```js
// Import variables from both system and .env file.
require('dotenv').config()

const config = {
  // Configure plugin
  plugins: [
    [
      'docusaurus-plugin-content-gists',
      {
        enabled: true,
        verbose: true,
      },
    ],
  ],

  // Configure navbar
  themeConfig: {
    navbar: {
      items: [{ to: '/gists', label: 'Gists', position: 'left' }],
    },
  },
}
```

### Authentication

The plugin requires a GitHub Personal Access Token to fetch gists. For security reasons, this token
must be provided via the `GH_PERSONAL_ACCESS_TOKEN` environment variable.

#### Creating a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens →
   [Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Docusaurus Gists Plugin")
4. Select the `gist` scope (read access to gists)
5. Click "Generate token" and copy the token

> **Security Notice:** Never pass the token directly through plugin options. Always use environment
> variables to prevent accidental exposure of your GitHub credentials in your codebase or build
> artifacts.

### Options

#### `enabled`

Whether or not this plugin is enabled.

_**required:** `false`_ _**default:** `true`_

#### `verbose`

Gives output about retrieving the gists during build time

_**required:** `false`_ _**default:** `false`_

#### `gistPageComponent`

Which component to use for showing the gist page.

_**required:** `false`_ _**default:** `'@theme/GistPage'`_

#### `gistListPageComponent`

Which component to use for showing the gists list page.

_**required:** `false`_ _**default:** `'@theme/GistListPage''`_

## Contributing

Contributions are welcome!

Please read the [contributing guide](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) licensed.
