# DEV Core API Seeder

This script is used to seed the database with initial mock data for development purposes. It is designed to be run in a
development environment with proper `.env` configuration.

- **`seed.ts`**: CLI-driven bulk data seeding script.

## Prerequisites

- Node.js >= 20
- MongoDB running and accessible via `MONGO_URI`/`MONGO_APP_NAME`

## Usage

To run the seeder, execute the following command from `apps/backend` directory:

```bash
npm run seed:dev
```
