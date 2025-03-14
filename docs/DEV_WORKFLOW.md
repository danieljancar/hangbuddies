# Development Workflow

## Github Flow

1. **Open an Issue:**
    - Clearly describe your bug, feature, or tasks with a concise title and description.
    - If you have the rights, assign labels, a milestone, and update the active project board (iteration).
    - If you lack permission, maintainers will triage your issue.
2. **Clone the Repository:**
    - If you are a collaborator, clone the original repository.
    ```bash
    git clone https://github.com/danieljancar/hangbuddies.git
    ```
    - If you are a contributor, fork the repository and clone your fork.
    ```bash
    git clone https://github.com/your-username/hangbuddies.git
    ```
    - Navigate to the project directory.
    ```bash
    cd hangbuddies
    ```
    - Install the project dependencies.
    ```bash
    npm install
    ```
    - Install dependencies in the relevant project(s) (e.g., frontend, backend).
    ```bash
    cd frontend
    npm install
    ```
3. **Create a Branch:**
    - Branch off from `develop` or `beta` in certain cases.
    ```bash
    git checkout -b {issue-nr}-short-description develop
    ```
4. **Implement Changes:**
    - Follow the project's ESLint, Prettier, and configuration rules (root and project-specific configs **must** be
      respected).
    - Ensure your changes are minimal, well-structured, and solve only the assigned issue.
    - Write tests for your changes (if applicable).
    - Update the documentation (if applicable).
    - Make sure your code is [clean](https://refactoring.guru/) and [guidelines-compliant](../CONTRIBUTING.md).
5. **Commit & Push:**
    - Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages.
    ```bash
    <type>(<scope>): <message>
    ```
    - Keep commits small and focused.
    - Push your changes to your branch.
    ```bash
    git push origin {issue-nr}-short-description
    ```
6. **Testing:**
    - Run tests in the relevant project(s) (e.g., frontend, backend) if applicable.
    ```bash
    npm test
    ```
    - Write tests for your changes (if applicable).
7. **Open a Pull Request:**
    - Open a PR against `develop` normally.
    - Link the issue in the PR description.
    - Provide a clear summary, screenshots (if applicable), and relevant details.
    - If you have the rights, assign reviewers, `pr` label and update the issue project board status.
    - If you lack permission, maintainers will triage your PR.
8. **Code Review:**
    - If CI fails, address the issues and push updates.
    - Address the feedback from the reviewers.
    - If changes are requested, implement them, push updates, and **re-request** a review.
    - Keep the number of commits minimal (squash them if necessary).
9. **Merge:**
    - Once the PR is approved, it will be merged into `develop` in most cases.
    - Close the related issue and update the project board.

> [!Note]
> By following this structured workflow, we ensure a clean, efficient, and maintainable development process.

## Relevant Links

Here are some useful resources and online tools to help you with the development process:

- [Github Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Refactoring Guru](https://refactoring.guru/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Github Actions](https://docs.github.com/en/actions)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
