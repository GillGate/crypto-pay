<div align="center">
  <a href="https://gillgate.github.io/crypto-pay/">
    <img src="https://gillgate.github.io/crypto-pay/static/img/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Crypto Pay</h1>
<p align="center">
    Landing for CryptoBot Web Contest <br>
    <a href="https://t.me/CryptoBotRU/225">Learn more</a>
  </p>
</div>

## Getting Started

This is instruction how to start this project locally if you want to change some details such as animation durations and more.

To start we need to install all modules for automated processes such as assembly and optimization css and js files.

Open console and move to project directory:
```sh
cd [path_to_project]
```
Then install all necessary modules for automated work:
```sh
npm i
```
Last thing (optional):
_If you launch this project for the first time you may have to generate smartgrid mixins.
Here is [documentation](https://www.npmjs.com/package/smart-grid) for smartgird library.
This project already generated all needed mixins but if you want to change some details you must open default smartgrid.js file in root directory and change him based on your design layout requirements._

To generate mixins type in console:
```sh
node smartgrid.js
```

## Usage

To launch development version of project type in console:
```sh
npm run dev
```

To build production version of project type in console:
```sh
npm run build
```

## P.S.

Made to CryptoBot with ❤️
