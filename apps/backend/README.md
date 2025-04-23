<div align="center">
    <img src="../../assets/other/nestjs_logo.png" width="200" height="200" alt="NestJS logo">
    <h1>Core API</h1>
    <p>Core API for HangBuddies, built with NestJS. It provides the backend functionality for the HangBuddies application, including modules like device and survey management.</p>
</div>

# Table of Contents

- [Modules](#modules)
- [Environment Variables](#environment-variables)
- [Running the API](#running-the-api)
    - [Seed the Database](#seed-the-database)
- [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [E2E Tests](#e2e-tests)
    - [API Client](#api-client)

# Modules

Our API is organized into several core modules, each responsible for a specific part of the application:

- **Device**: Manages device-related functionality, including device registration and management.
- **Survey**: Handles survey creation, management, and responses.

---

- **Logger**: Provides logging functionality for the application.

# Environment Variables

The API uses environment variables for configuration. You can find the `.env.example` file in the root directory of
`apps/backend`. Copy this file to `.env` and fill in the required values.

> [!Important]
> Make sure to keep your `.env` files secure and do not share them publicly.

# Running the API

To run the API locally, you can use the following command:

```bash
npm run start:dev
```

This will start the API in development mode, allowing you to make changes and see them reflected immediately.

You can also run the API as a Docker container. To do this, use the following command **at the root of the repository**:

```bash
docker-compose up -D
```

This will build and start the API container, along with any other services defined in the `docker-compose.yml` file.

## Seed the Database

To seed the database with mock data, you can use the following command:

```bash
npm run seed:dev
```

> [!Note]
> The CLI-driven bulk data script requires a running MongoDB instance and `.env` configuration.

Find out more about the seeder in the [Seeder README](./scripts/seed/README.md).

# Testing

## Unit Tests

> [!Warning]
> Unit tests are not yet implemented.

## E2E Tests

> [!Warning]
> E2E tests are not yet implemented.

## API Client

We use [Bruno](https://www.userbruno.com/) as our API client for testing and development. You can find the API collections
in the `bruno/core-api` directory. These collections include requests for all relevant endpoints in the API, making it
easy to test and develop.
