# Dating App

This is a Simple Dating Web App. Created using React & Express.

## Tech Stack

### 1. Frontend

-   React
-   Tailwind
-   Socket.io-client
-   axios
-   zod
-   react-hook-form

### 2. Backend

-   Node.JS
-   Express
-   Mongoose
-   Socket.io
-   Jsonwebtoken

## Project Setup

### Clone the repository && Install Dependencies

```bash
// Client
$ cd ./client
$ npm i

// Server
$ cd ./server
$ npm i
```

### Add Environment Variables

```
// ./server/.env
PORT=<PORT#>
MONGODB_URI=<MONGODB_URI> // Format: "mongodb://<user>:<password>@<Cluster/Localhost>/<Database>?<Additional Params>"
JWT_KEY=<JWT Secrete>

// ./client/.env
VITE_BASE_URL=<Server_URL>
```

### Load Dummy Data

```bash
$ cd server
$ npm run db:seed:dev
```

After this copy the test.jpg image from `./server/dev` to `./server/upload`

### Running the Project

```bash
// Build Client
$ cd client
$ npm run build

// Run Server
$ cd client
$ npm run start
```
