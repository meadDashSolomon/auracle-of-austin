## Auracle - Chat GPT Clone

Auracle is a chat GPT clone, currently in progress. It is designed to allow users to take advantage of Open AI's API.

![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)

## Table of Contents:

1. Description
2. Installation
3. Git Workflow

# Description

Auracle leverages modern web technologies like Next.js, React, Node.js, and MongoDB to create a dynamic and responsive user interface. This project showcases my full-stack development skills, focusing primarily on frontend interaction and backend integration. Key features of Auracle include:

- Real-time message exchange, simulating a natural conversation flow.
- A sleek, user-friendly interface with a responsive design.
- Integration with OpenAI's API for generating human-like text responses.

Given the complexity and scale of this project, it is currently a work in progress with plans for further development and enhancements.

# Further Improvements

- Test truncator and token counting logic
- A character counter on text input to approximate token count before submitting
- Upload button functionality for files and images
- Advanced techniques for managing tokens like summarization or a vector db
- Buttons to change the model/token limit
- Stream: import a library for streaming on client side

* Stop button

- Links to previous conversations on sidebar

# Installation Requirements

This project uses several technologies and requires the following environment setup:

1. Clone the repository:
2. Navigate to the project directory and install dependencies:
   `cd Auracle`
   `npm install`
3. Start the development server:
   `npm run dev`
4. Open `http://localhost:3000` to view the application in the browser.

## Git Workflow

https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

Checkout and sync main

```
git checkout main
git fetch origin
git reset --hard origin/main
```

Create a new branch from main for the feature

```
git checkout -b new-feature
```

Once work is complete stage/commit on the feature branch

```sh
git status
git add <files>
git commit
```

Push the changes to the repo

Auracle is an evolving project, and I welcome any feedback or contributions from the developer community.
