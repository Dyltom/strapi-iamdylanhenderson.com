# Strapi Backend for iamdylanhenderson.com

This is the Strapi backend powering the dynamic content for iamdylanhenderson.com. It features customized content types and controllers for enhanced blog functionality.

## Features

- **Articles**: Manage and serve blog content with additional functionalities:
  - **View Count**: Track how often each article is viewed.
  - **Read Time**: Calculate and display the estimated read time for articles.

## Development

- Start the development server:
  ```bash
  npm run develop
  ```
- Build the admin panel:
  ```bash
  npm run build
  ```
- Start the production server:
  ```bash
  npm run start
  ```

## Development Scripts

In the project directory, you can run:

- `npm run build`: Builds the admin panel.
- `npm run develop` or equivalent: Starts the development server.
- `npm run generate:types`: Generates types from content-types built in strapi (this is also run in build).
- `npm start`: Runs the built app in production mode.
- `npm start:stack`: Runs the built app in production mode with Docker (MariaDB) included.
- `npm run format:check`: Checks the format of files.
- `npm run format:write`: Formats files.
- `npm run types:check`: Checks TypeScript types.

## Deployment

Backend is currently hosted on a VPS. The server is running on Ubuntu 20.04. Dockerization was setup in this repo with help from @strapi-community/dockerize.

## Contribution

Contributions, suggestions, and feedback are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Common issues

Problem: Adding new content type breaks strapi
Fix: Enter this command npx run start:stack and your problems will be solved!

---

Enjoy building and managing your content with this version of Strapi! 🚀

---
