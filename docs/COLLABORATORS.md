# COLLABORATORS

- **Project Lead (PL):** [Daniel Jancar](https://github.com/danieljancar)
- **Deputy Project Lead (DPL):** [Manuel Wicki](https://github.com/manu2107el)

## Table of Contents

- [Guides](#guides)
- [Developer Docs](#developer-docs)
- [Scrum Management](#scrum-management)
    - [Issues](#issues)
        - [Triaging](#triaging)
            - [Projects](#projects)
            - [Milestones](#milestones)
        - [Priorities](#priorities)
    - [Pull Requests](#pull-requests)

## Guides and Documents

- [Contributing Guide](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Security Policy](../SECURITY.md)
- [Developer Certificate of Origin](../DCO.md)
- [License](../LICENSE)

## Developer Docs

- [Development Workflow](DEV_WORKFLOW.md)
- [Collaborators (current)](COLLABORATORS.md)
- [Branching Strategy](BRANCHING_STRATEGY.md)

## Scrum Management

Our collaboration follows the Scrum methodology, with project oversight by the PL and DPL. Iteration boards are managed in [GitHub Projects](https://github.com/danieljancar/hangbuddies/projects).

### Issues

We use [GitHub Issues](https://github.com/danieljancar/hangbuddies/issues) to track tasks, bugs, and enhancements. Issue triage and management are handled by the PL, DPL, and collaborators.

#### Triaging

New issues are reviewed and categorized by the PL, DPL, or other collaborators. Issues are assigned to either the next sprint, the backlog, or a relevant milestone.

Each issue must include the following metadata:

- **Labels:** Categorized as bug, enhancement, architecture, documentation, etc.
- **Project:** Assigned to an active or future sprint board.
- **Milestone:** Assigned to a relevant milestone (e.g., D10, P1520).
- **Assignee:** Assigned to a responsible collaborator, the PL, or the DPL.
- **Priority:** Marked as Critical, High, Medium, or Low.
- **Status:** Updated based on progress (Open, In Progress, Blocked, Closed).

##### Projects

A dedicated project board is used to track active sprints and backlog issues. Before each sprint, the PL and DPL create a new board and migrate any unfinished backlog issues.

##### Milestones

Milestones categorize issues into different objectives:

- **D (Development milestones):** Group tasks like refactoring, daily operations, and documentation.
- **P (Project milestones):** Group tasks related to major features or releases.
- **I (Iteration milestones):** Track pull requests merged within a specific sprint.

#### Priorities

Issues are prioritized based on impact, urgency, and dependencies:

- **Critical:** Requires immediate attention; high project impact.
- **High:** Should be addressed as soon as possible; significant impact.
- **Medium:** Scheduled for the current or next iteration.
- **Low:** Addressed in future iterations.

### Pull Requests

Changes to the codebase are submitted via pull requests (PRs). PRs are reviewed and managed by the PL, DPL, and collaborators.

PRs must include the following metadata:

- **Labels:** Assigned only the `pr` label.
- **Status:** The associated issue status should be updated (e.g., `fixed`, `in review`).
- **Reviewers:** Assigned to relevant collaborators for feedback.

All collaborators should review PRs, request changes if necessary, and approve when ready. The PL and DPL are responsible for merging PRs.
