![logo](https://github.com/KayatoSan/Budget5S/assets/1472948/435c8352-97df-4b97-8d69-019b15cc2382)

## Badges

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)

# Budget5S

Budget5S aims to offer a free alternative to budget managers. This is an alpha version, with new features to come, changes to be made, and, ESPECIALLY, bugs to be fixed, so it's for informed users. You've been warned!

There are 3 components/mechanics:

- Account: Your bank account or piggy bank with an initial balance.

- Bucket: A bucket, as its name suggests, is for defining a budget. For example, a “Restaurant” bucket can be defined with a monthly amount to be reached, or on the contrary, without an amount depending on the importance of the bucket to keep flexibility. A “Restaurant” bucket can afford to be without an amount, while a “Rent” bucket will have to have a fixed monthly amount (or at your own risk 😉).

- Vault: To build up your financial security or for other specific needs, you can either define it as a monthly requirement without worrying about the total amount (e.g., I want to save €100 every month) or with a predefined total amount (I want to save €10,000 by the end of the year). The amount required to reach this goal will be calculated and displayed for each month. Vaults are linked to an account, which is important for transfers, as you will see below.

To manage your accounts, buckets, and vaults, you can:

- Make a transaction on your account, to remove or add money with a label (for example: Salary - €2,500) or even to notify an unexpected money transfer, for example, if you're giving money to a relative and there's no bucket or vault for it.

- Transaction vaults: If you want to transfer money to your vault, the “transaction vaults” will ask you from which source account to withdraw the money, for which vault. The operation will be recorded in the vault, and the money from the source account will be transferred to the account linked to the vault!

- And finally, you have the expenses. The goal is simple: you indicate the account that you have used, the bucket in which the expense belongs (Restaurant, rent, shopping, etc.).

![screenshot](https://github.com/KayatoSan/Budget5S/assets/1472948/d9f7f090-01a4-4bdd-a431-c7a5f280f1db)

<p align="center">
  Easy to use !<BR /><BR />
  <img src="https://github.com/KayatoSan/Budget5S/assets/1472948/c8b26341-39e3-4b5d-83d5-8c6d6a224f2c" />
</p>

## Installation

You can install it via Docker (or podman...):

Clone the git:
```bash
  git clone https://github.com/KayatoSan/Budget5S
  cd Budget5S
```

Now build the app and launch it with the docker-compose.yml:
```bash
  docker-compose build
  docker-compose up -d
```

The client (ReactJS + ViteJS) is in the `/client` folder, and the server (NodeJS) is in the `/server` folder.

## Environment Variables

Environment variables are stored in the `.env` file:

`VITE_BACKEND_ADRESS` The address of your backend written in the ReactJS client, default: `http://localhost`

`VITE_BACKEND_PORT` The port of your backend written in the ReactJS client, default: `3000`

If you change the port used in docker-compose.yml, you need to change the environment variables in the `.env` file.

## Roadmap

- Switch for dark mode. Dark mode is available but is currently tied to your system settings.

- Showcase website

- Internationalization

- Change currency display & format

- Bug fixes are THE priority!

- A real documentation (with Docusaurus)

- Guide for first use

- Allow the upload of photos for expenses, for example, to keep a photo of the restaurant receipt with the expense!

And more, in the long term!
