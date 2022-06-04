# Docusaurus gists plugin

> Use gists as a type of content in Docusaurus.

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
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

#### `docusaurus.config.js`

```js
// Import variables from both system and .env file.
require('dotenv').config()

const config = {
  plugins: [
    [
      'docusaurus-plugin-content-gists',
      {
        enabled: true,
        verbose: true,
        personalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      },
    ],
  ],
}
```

### Options

#### `personalAccessToken`

Personal access token of the user of whom to get the gists.

> **Important:** We recommend you use an environment variable like `GITHUB_PERSONAL_ACCESS_TOKEN`.
>
> That way you do not risk accidentally exposing access to your GitHub account.

_**required:** `true`_

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
