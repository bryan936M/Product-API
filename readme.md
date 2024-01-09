# NodeJS MVC Project with Prisma and Authentication

## Overview

This project is a Node.js web application built using the Model-View-Controller (MVC) architecture. It serves as a practical reminder experience for integrating Prisma for database management and implementing user authentication in a Node.js application.

## Features

1. **MVC Architecture:** The project follows the MVC design pattern, separating concerns into models, views, and controllers for a cleaner and more maintainable codebase.

2. **Prisma Integration:** Prisma is used as the data access layer for the application. It provides a type-safe and auto-generated query builder that simplifies database interactions.

3. **User Authentication:** The project includes user authentication functionality, allowing users to register, log in, and log out securely. Passwords are hashed and stored securely using industry-standard encryption practices.

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/installation)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bryan936M/Product-API.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd prisma-auth
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up the database:**

    ```bash
    npm run prisma:migrate
    ```

5. **Start the application:**

    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:3000`.

## Usage

- Visit `http://localhost:3000` in your browser to access the application.
- Register a new account or log in with existing credentials.
- Explore the various features and functionalities implemented in the project.

## Project Structure

- **`src/`**: Contains the source code of the application.
  - **`controllers/`**: Handles the application's business logic.
  - **`models/`**: Defines data models used by Prisma.
  - **`routes/`**: Contains route definitions.
  - **`middlewares/`**: Custom middleware functions.
- **`prisma/`**: Prisma configuration and migration files.
- **`config/`**: Configuration files for the application.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Your feedback and improvements are highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).
