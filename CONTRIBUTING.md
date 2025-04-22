# CONTRIBUTING

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
    - [Issue Tracking & Labels](#issue-tracking--labels)
        - [General Milestones](#general-milestones)
        - [Project Milestones (active)](#project-milestones-active)
    - [Branching Strategy](#branching-strategy)
        - [Example](#example)
    - [Commit Messages](#commit-messages)
        - [Types](#types)
        - [Examples](#examples)
    - [Pull Requests](#pull-requests)
- [Code Review](#code-review)
- [Code of Conduct](#code-of-conduct)
- [Development Documentation](#development-documentation)
- [License](#license)

## Introduction

Thank you for considering contributing to HangBuddies!

> [!Important]
> This document outlines the contribution process to ensure a smooth and productive experience for everyone involved.

## Getting Started

Before contributing, please ensure you:

1. Read this document and the related guidelines in [docs/](./docs/).
2. Have a GitHub account.
3. Are familiar with
   our [Github Issues](https://github.com/danieljancar/hangbuddies/issues), [Project Boards](https://github.com/danieljancar/hangbuddies/projects),
   and [Milestones](https://github.com/danieljancar/hangbuddies/milestones).
4. Agree to follow our [Code of Conduct](./CODE_OF_CONDUCT), [Developer Certificate of Origin](./DCO.md)
   and [License](./LICENSE).

## Contributing

### Issue Tracking & Labels

We use GitHub Issues with labels, milestones, and project boards to manage tasks. Milestones help categorize work.

> [!Note]
> We have a project board which holds user stories and features, in
> the [Backlog](https://github.com/users/danieljancar/projects/34)

#### General Milestones

- **D10 - Daily tasks without project** - Minor, standalone tasks.
- **D11 - Operations and maintenance** - Routine maintenance (e.g., dependencies, backups)
- **D12 - Complex Defect Resolution** - Deep investigation bugs.
- **D13 - Code Cleanup & Refactoring** - Code quality improvements.
- **D14 - CI/CD, Testing & QA Automation** - DevOps improvements
- **D15 - Documentation & Knowledge Transfer** - Docs and internal guides.

- **I{iteration-nr}** - Iteration milestones, mainly used for PR assignments and tracking.

#### Project Milestones (active)

- **P1000 - Core Feature Implementation (Beta Release)** - Core features for the first beta release (MVPs).

> [!Tip]
> Before opening a new issue, check if it already exists. If it does, consider adding a comment or upvoting it.

### Branching Strategy

We use the following branching strategy:

- `develop` - Main development branch (default).
- `{issue-nr}-issue-description` - Branch off from `develop` for each issue.
- `staging` - Branch for the next release.
- `hotfix/{description}` - Branch for critical bug fixes.

Before a new release comes out, we use `staging` branch from `develop` where last minute changes and testing can be done
and a beta prerelease is published. Once the `staging` is stable, it is merged into `master` and tagged with the release
version. After the release, the `staging` branch is merged back into `develop`.

#### Example

To create a feature branch for issue #42, run:

```bash
git checkout -b 42-add-survey-logic develop
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages. This
format helps with automatic changelog generation and semantic versioning.

```bash
<type>(<scope>): <message>
```

#### Types

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **chore**: Maintenance tasks.
- **style**: Code style changes.
- **refactor**: Code refactoring.
- **test**: Adding or updating tests.

#### Examples

```bash
git commit -m "feat(api): add survey creation endpoint"
git commit -m "fix(ui): resolve survey form validation error"
```

### Pull Requests

1. (Checkout) and open a PR against `develop` (or `staging` for pre-releases).
2. Reference the related issue in the PR description.
3. Provide a summary of changes and request a review.
4. Address feedback, update the issue/milestone and project if needed.

Once merged, ensure related issues are closed.

## Code Review

Code reviews are essential for maintaining code quality and consistency. Reviewers should:

- Ensure the code is well-documented and tested.
- Check for code style and formatting.
- Verify the changes work as expected.
- Provide constructive feedback and suggestions.
- Approve the PR once satisfied.
- Merge the PR once approved.

> [!Note]
> Code reviews are done by the project maintainers. If you are not a maintainer, you can still review and provide

## Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html) Code of
Conduct. Please read the full version in [CODE-OF-CONDUCT.md](./CODE_OF_CONDUCT).

## Development Documentation

For more details, refer to:

- [Development Workflow](./docs/DEV_WORKFLOW)
- [Collaborators Guide](./docs/COLLABORATORS)
- [Branching Strategy](./docs/BRANCHING_STRATEGY)
- [Branding Guidelines](./docs/BRANDING)

## License

By contributing to HangBuddies, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
