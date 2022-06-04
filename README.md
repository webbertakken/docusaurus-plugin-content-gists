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

## Contributing

Contributions are welcome!

Please read the [contributing guide](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) licensed.
