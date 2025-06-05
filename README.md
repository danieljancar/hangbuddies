<div align="center">
    <img src="assets/icon.png" width="200" height="200" alt="HangBuddies icon">
    <h1>HangBuddies</h1>
    <p>A fast, shareable, registration-free tool for gathering preferences and picking dates with customizable options.</p>
</div>

<div align="center">

[![Mockups - Figma](https://img.shields.io/badge/Mockups-Figma-e36631?logo=figma&logoColor=e36631)](https://www.figma.com/design/26m3Y13QluW8Zk6z5qhvRa/HangBuddies?node-id=0-1&t=esKJwF80FX0P2PkB-1)

[![Frontend CI](https://github.com/danieljancar/hangbuddies/actions/workflows/frontend.yml/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/frontend.yml)
[![Backend CI](https://github.com/danieljancar/hangbuddies/actions/workflows/backend.yml/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/backend.yml)

[![Prettier](https://github.com/danieljancar/hangbuddies/actions/workflows/prettier.yml/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/prettier.yml)
[![Labeler](https://github.com/danieljancar/hangbuddies/actions/workflows/label-pr.yml/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/label-pr.yml)
[![CodeQL](https://github.com/danieljancar/hangbuddies/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/github-code-scanning/codeql)
[![Dependabot](https://github.com/danieljancar/hangbuddies/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/danieljancar/hangbuddies/actions/workflows/dependabot/dependabot-updates)

[![Issues](https://img.shields.io/github/issues/danieljancar/hangbuddies)](https://github.com/danieljancar/hangbuddies/issues)
![Pull Requests](https://img.shields.io/github/issues-pr/danieljancar/hangbuddies)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

</div>

# Table of Contents

- [Features](#features)
- [Contributing](#contributing)
    - [Prerequisites](#prerequisites)
        - [Dependencies](#dependencies)
        - [Tools](#tools)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Live Previews](#live-previews)
        - [Staging (Pre-Production)](#staging-pre-production)
        - [Development (Pre-Staging/active development)](#development-pre-stagingactive-development)
- [License](#license)
- [Acknowledgements](#acknowledgements)
    - [Contributors](#contributors)

# Features

- **Event Polls**: Create and share event polls effortlessly.
- **No Registration**: Creators and participants can vote without an account.
- **Customizable Options**: Define time slots, add descriptions, and set preferences.
- **Responsive UI**: Works across devices for easy access.

# Contributing

> [!Important]
> This project is still in initial development, and we are working on setting up configuration for contributors.

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) and other
relevant [documents](docs/) for developers before getting started.

## Prerequisites

### Dependencies

We use multiple tools to build HangBuddies. The following are the minimum requirements to get started:

- **Node.js**: Version `^20` or higher
    - **npm**: Version `^10` or higher
    - **pnpm**
    - **yarn**
- **Angular CLI**: For building and running the frontend
- **NestJS CLI**: For building and running the backend

### Tools

- **Bruno**: Free and open-source API client (find useful collections in `bruno/`)
- **Docker**: For running the backend locally
- **NVM**: For managing Node.js versions (https://github.com/nvm-sh/nvm)

## Installation

Collaborators can clone this original repository, as a contributor you should make a fork onto your account.

```shell
git clone https://github.com/danieljancar/hangbuddies.git
cd hangbuddies
# Node > 20
npm run install:all # Install all dependencies in the project (submodules)
```

> [!Important]
> Make sure you run `npm install:all` (Node > 20) before doing any work, so all tools and hooks are working.

## Configuration

> [!Note]
> As already mentioned, we are working on setting up configuration for contributors. Please check back later.

## Live Previews

We have multiple live previews of different environments. You can find them in the following links:

### Staging (Pre-Production)

- **Frontend**: `not available yet`
- **Backend**: `not available yet`

### Development (Pre-Staging/active development)

- **Frontend**: [https://dev.hangbuddies.com](https://dev.mrbeast.ch)
- **Backend**: [https://api-dev.hangbuddies.com](https://api-dev.mrbeast.ch)

> [!Note]
> The environments above are hosting the latest `staging` and `develop` branches. The `staging` branch is the latest
> pre-stable version of the application, while the `develop` branch is the latest development version. They are seeded
> with test data and are not meant for production use.

# License

This project is licensed under [MIT License](LICENSE). By contributing to HangBuddies, you agree that your contributions
will be licensed under the same license. Also, you agree to
the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) and the [Developer Certificate of Origin](DCO.md).

# Acknowledgements

## Contributors

Thanks to the following people for their contributions:

[![Contributors](https://contrib.rocks/image?repo=danieljancar/hangbuddies)](https://github.com/danieljancar/hangbuddies/graphs/contributors)

Released under the [MIT License](LICENSE) by [@danieljancar](https://github.com/danieljancar).
