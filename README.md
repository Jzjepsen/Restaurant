# Restaurant
React Frontend Application for fourth semester project at AU

## Collaborative Development Guide

Welcome to our project repository! This guide is intended to help all contributors follow our collaborative development process using a feature branching strategy with pull requests to ensure code quality and maintain a clean history in our `main` and `develop` branches.

### Setting Up Your Local Environment

1. **Clone the Repository**: If you haven't already, clone the repository to your local machine. Use GitHub Desktop or the following Git command: ` git clone url`

2. **Navigate into the Repository Directory**:
`cd your-repository-name`



3. **Fetch All Branches**: Make sure you have the latest list of branches:
`git fetch --all


4. **Switch to the Develop Branch**: Our main integration branch is `develop`.
`git checkout develop


### Working on a New Feature

1. **Create a New Feature Branch**: Always create a new branch for each feature from the `develop` branch. Name your branch something descriptive. For example:

`git checkout -b feature/<feature-name>`


Replace `<feature-name>` with a short name describing the feature (e.g., `add-login`).

2. **Develop Your Feature**: Write code and commit changes to this branch. Make commits as small as possible while maintaining the app in a functional state.

3. **Keep Your Branch Updated**: Regularly pull changes from the `develop` branch to your feature branch to stay updated:

`git pull origin develop`


### Submitting Changes for Review

1. **Push Your Feature Branch**: When you're ready to get feedback or merge your changes, push your feature branch to GitHub:

`git push -u origin feature/<feature-name>

2. **Create a Pull Request (PR)**:
- Go to the repository on GitHub.
- You'll often see your branch with a button to "Compare & pull request." Click it.
- Set the base branch to `develop` and ensure your feature branch is selected.
- Fill in the title and description of your changes.
- Click **Create pull request**.

3. **Request Code Reviews**: Tag your teammates in the PR and request their review. Address any comments and make necessary revisions.

### Merging Your Pull Request

Once your PR is approved by the team:
1. **Merge the PR**: Use the "Squash and Merge" option on GitHub to merge your changes into the `develop` branch. This keeps our history clean and easy to follow.
2. **Delete Your Feature Branch** (optional but recommended on GitHub after merging).



