# Quantum Rift Labs

This repository is a monorepo containing both the frontend and backend of the application. The frontend is built with React and is located in the `client` directory, while the backend is built with Express and is located in the `server` directory.

## Table of Contents

1. [Server (Express)](#server-express)

   - [Directory Structure](#directory-structure)
   - [Endpoints](#endpoints)
   - [Example Item](#example-item)
   - [Setup and Running](#setup-and-running)

2. [Client (React)](#client-react)

   - [Directory Structure](#directory-structure-1)
   - [Main Components](#main-components)
   - [Setup and Running](#setup-and-running-1)

3. [Prerequisites](#prerequisites)
4. [Running with Docker Compose](#running-with-docker-compose)

---

## Server (Express)

The backend of the application is a REST API built with Express. It serves the frontend with the data it needs.

### Directory Structure

The server is located in the `server` directory and is composed of the following directories:

- `routes`: Defines the endpoints and the logic of each endpoint.
- `models`: Defines the data models (currently, only the `Item` model).

### Endpoints

The server has two main endpoints based on a single model `Item`, which has `name` and `price` fields. The endpoints are defined as follows:

`/items`

- **GET**: Retrieves all items in the database.
- **POST**: Adds a new item to the database.

### Example Item

```json
{
  "name": "Apple",
  "price": 1.99
}
```

### Setup and Running

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and set the desired environment variables.

4. Run the server in development mode:

   ```bash
   npm run dev
   ```

   The server will be listening on port `3001` by default. You can change the `PORT` and `CORS` settings in the `.env` file.

5. To build and run the production version of the server:

   ```bash
   npm run build
   npm run start
   ```

---

## Client (React)

The frontend of the application is a React application located in the `client` directory. It fetches data from the backend and displays it in a table, along with a web3 component for network status and wallet connection.

### Directory Structure

The frontend is composed of the following directories:

- `components`: Contains the React components.
- `lib`: Contains utility functions and libraries.
- `routes`: Contains the route definitions.

### Main Components

- **Index Component**: Fetches data from the backend and displays it in a table.
- **Wallet Component**: Shows the network status and connects to a wallet using the `wagmi` library.

### Setup and Running

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and set the desired environment variables.

4. Run the client in development mode:

   ```bash
   npm run dev
   ```

   The client will be listening on port `3000` by default. You can change the `API_BASE_URL` setting in the `.env` file.

5. To build the production version of the client:

   ```bash
   npm run build
   ```

   This will create a `dist` directory with the production version of the client, which should be served by a web server to avoid CORS errors.

---

## Prerequisites

Before running the projects, ensure that you have `node` installed. You can download it from [here](https://nodejs.org/en/download/). The recommended version is `v20.11.1` or higher. You can check your installed version by running:

```bash
node -v
```

Ensure that both the `server` and `client` directories have their dependencies installed and environment variables set before starting the applications.

## Running with Docker Compose

To run both the frontend and backend using Docker Compose, follow these steps:

1. Ensure that you have Docker and Docker Compose installed. You can download them from [here](https://docs.docker.com/get-docker/).

2. Create a `docker-compose.yml` file (if not created) in the root directory with the following content:

```yaml
services:
  server:
    build:
      context: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - CORS_ORIGIN=*
  client:
    build:
      context: ./client
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
      - VITE_API_BASE_URL=http://server:3001
    depends_on:
      - server
```

3. Navigate to the root of your project directory where the docker-compose.yml file is located and run:

```bash
docker-compose up --build
```

4. Access the application:

- The frontend will be available at `http://localhost:3000`
- The backend will be available at `http://localhost:3001`
