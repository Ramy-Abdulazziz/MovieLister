
# MovieLister
## Project Description

MovieLister is a modern, responsive web application designed to allow users to browse trending movies, view detailed information about their selections, and manage a personal list of favorite movies. The application features a decoupled frontend and backend architecture, with a secure API layer to handle interactions with the external The Movie Database (TMDB) API.

## Tech Stack

### Frontend

React, React Router, Vite

### Backend:

Node.js, Express

### API Interaction:

Axios (on backend), Fetch API (on frontend)

### Libraries
lucide-react, react-router, cors, dotenv, vite

## Testing:

### Backend:

Jest & Supertest

### Frontend:

Vitest, React Testing Library

## Setup and Installation

To run this project locally, you will need to set up both the backend server and the frontend client.

### Prerequisites

Node.js (v18 or later recommended)

npm (usually comes with Node.js)

A TMDB API Key. You can get one for free by creating an account on the TMDB Website.

1. Backend Setup (/server)
   The backend is responsible for securely communicating with the TMDB API.

Navigate to the server directory:

```
cd path/to/your/project/server
```

Create an environment file: Create a new file named .env in the server directory. You will need to add your TMDB API Read Access Token (v4 auth).

### .env

```
TMDB_API_TOKEN="your_long_api_read_access_token_here"
PORT=3001
```

Install dependencies:

```
npm install
```

Run the server:

```
npm run dev
```

The server should now be running on http://localhost:3001.

### Frontend Setup (/client)
The frontend is the React application that the user interacts with.

Navigate to the client directory:

```
cd path/to/your/project/client
```

Create a local environment file: Create a new file named .env.local in the client root directory. This will tell your React app where to find the backend server.

### .env.local

```
VITE_API_BASE_URL=http://localhost:3001/api
```

Install dependencies:

```
npm install
```

Run the client:

```
npm run dev
```

The React application should now be running and available at http://localhost:5173 (or another port if 5173 is busy).

## Running Tests

Both the frontend and backend have their own test suites.

### Backend Tests
Navigate to the /server directory.
Run the Jest/Supertest suite:


```
npm test
```
### Frontend Tests
Navigate to the /client directory.

Run the Vitest/React Testing Library unit tests:
```
npm test
```
