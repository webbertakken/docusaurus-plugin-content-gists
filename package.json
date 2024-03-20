{
  "name": "docusaurus-plugin-content-gists",
  "version": "3.1.0",
  "description": "Display gists from GitHub as content in Docusaurus",
  "keywords": [
    "docusaurus",
    "plugin",
    "theme",
    "github",
    "gists",
    "homepage"
  ],
  "homepage": "https://github.com/webbertakken/docusaurus-plugin-content-gists",
  "bugs": "https://github.com/webbertakken/docusaurus-plugin-content-gists/issues",
  "repository": "https://github.com/webbertakken/docusaurus-plugin-content-gists.git",
  "author": "Webber <webber.nl@gmail.com>",
  "license": "MIT",
  "main": "lib/index.js",
  "types": "src/types/index.d.ts",
  "files": [
    "src/*",
    "lib/*"
  ],
  "scripts": {
    "build": "concurrently yarn:build:plugin yarn:build:theme yarn:build:assets",
    "watch": "concurrently \"yarn:build:plugin --watch\" \"yarn:build:theme --watch\" \"yarn:build:assets --watch\"",
    "build:plugin": "tsc",
    "build:theme": "tsc --build tsconfig.theme.json",
    "build:assets": "node scripts/copyUntypedFiles.mjs"
  },
  "dependencies": {
    "@docusaurus/core": "^3.1.1",
    "@docusaurus/theme-classic": "^3.1.1",
    "@docusaurus/theme-common": "^3.1.1",
    "@docusaurus/theme-translations": "^3.1.1",
    "@docusaurus/types": "^3.1.1",
    "@docusaurus/utils-validation": "^3.1.1",
    "octokit": "^3.1.2"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.1.1",
    "@docusaurus/tsconfig": "^3.1.1",
    "@docusaurus/types": "^3.1.1",
    "@octokit/types": "^12.6.0",
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.67",
    "chokidar": "^3.6.0",
    "concurrently": "^8.2.2",
    "fs-extra": "^11.2.0",
    "prettier": "^3.2.5",
    "typescript": "^5.4.2",
    "yalc": "^1.0.0-pre.53"
  },
  "peerDependencies": {
    "react": "^17.0.0||^18.0.0||^19.0.0",
    "react-dom": "*"
  },
  "volta": {
    "node": "20.11.1",
    "yarn": "4.1.1"
  },
  "packageManager": "yarn@4.1.1"
}
