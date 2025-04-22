# Branching Strategy & Semantic Release Workflow

## Branch Overview

- **`develop`** → Default branch where active development happens.
- **`staging`** → Stabilization branch for final testing and fixes before production.
- **`master`** → Production branch, only updated from `staging` or hotfixes.

> [!Tip]
> Releases are automated using **Semantic Release** and **GitHub Actions**.

## Workflow

1. **Feature Development:**

    - Developers create feature branches from `develop`.
    - Work is merged back into `develop` via Pull Requests.
    - Semantic commit messages are required for proper versioning.

2. **Beta Release Preparation:**

    - Once key features and fixes are completed for an iteration, `develop` is merged into `staging`.
    - Final testing and hotfixes are done directly in `staging`.

3. **Production Release:**

    - After confirming stability, `staging` is merged into `master` (production).
    - **Automated GitHub Actions** handle:
        - **Semantic Release** → Determines version bump and generates changelogs.
        - **CI/CD Pipelines** → Run tests, build the project, and verify stability.
        - **Deployment** → Deploys the latest release to the production environment (tag).

4. **Post-Release Sync:**
    - If any changes were made in `staging`, they are merged back into `develop` to keep it up-to-date.
    - Meanwhile, new development for the next iteration may have already started on `develop`.

> [!TIP]
> You can create branches directly from your issue on GitHub by clicking the "Create branch" button.

## Semantic Commit Rules

Semantic Release determines version bumps based on commit messages:

| Commit Type        | Version Bump    | Example Message                    |
| ------------------ | --------------- | ---------------------------------- |
| `feat:`            | Minor (`x.1.0`) | `feat: add user authentication`    |
| `fix:`             | Patch (`x.x.1`) | `fix: resolve payment gateway bug` |
| `BREAKING CHANGE:` | Major (`1.0.0`) | `feat!: refactor API endpoints`    |

### Commit Types

| Type         | Description                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------- |
| **build**    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| **ci**       | Changes to our CI configuration files and scripts (examples: Github Actions, Git hooks)             |
| **chore**    | Changes to the build process or auxiliary tools and libraries such as dev-scripts or -dependencies  |
| **docs**     | Documentation only changes                                                                          |
| **feat**     | A new feature                                                                                       |
| **fix**      | A bug fix                                                                                           |
| **perf**     | A code change that improves performance                                                             |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                           |
| **revert**   | Reverts a previous commit (use only for reverting a commit)                                         |
| **test**     | Adding missing tests or correcting existing tests                                                   |

## Additional Notes

- Merges into `master` must be **fast-forwarded** and **trigger semantic-release**.
- Hotfixes for production should be done in `staging`, then merged forward to `develop`.
- If a critical fix must be applied to `master` immediately, branch from `master`, apply the fix, merge into `master`,
  then cherry-pick into `staging` and `develop`.
- **CI/CD and Semantic Release Automation**:
    - GitHub Actions ensure releases follow semantic versioning.
    - Builds, dockerization and deployments happen automatically when a new release is created in `master`.
    - Automated tests run at each stage to prevent regressions.

> [!WARNING]
> Do not manually update version numbers in the project. Let Semantic Release handle it.
