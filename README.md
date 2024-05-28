```
# Real-Time Bidding Platform API

This is a real-time bidding platform API built using Node.js, Express, Socket.io, and PostgreSQL.

## Features

- User Registration and Authentication
- Role-Based Access Control
- CRUD Operations for Auction Items
- Real-Time Bidding using WebSockets
- Notifications System
- Search and Filtering for Auction Items
- Pagination
- Unit and Integration Tests

## Setup

### Prerequisites

- Node.js and npm
- PostgreSQL

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=postgres://user:password@localhost:5432/yourdatabase
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600
```

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Lint Code

```bash
npm run lint
```

### Lint Code and Fix

```bash
npm run lint:fix
```

## Docker

### Build Docker Image

```bash
docker build -t real-time-bidding-platform .
```

### Run Docker Container

```bash
docker run -p 3000:3000 --env-file .env real-time-bidding-platform
```

## API Endpoints

### Users

- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate a user and return a token
- `GET /users/profile` - Get the profile of the logged-in user

### Items

- `GET /items` - Retrieve all auction items (with pagination)
- `GET /items/:id` - Retrieve a single auction item by ID
- `POST /items` - Create a new auction item
- `PUT /items/:id` - Update an auction item by ID
- `DELETE /items/:id` - Delete an auction item by ID

### Bids

- `GET /items/:itemId/bids` - Retrieve all bids for a specific item
- `POST /items/:itemId/bids` - Place a new bid on a specific item

### Notifications

- `GET /notifications` - Retrieve notifications for the logged-in user
- `POST /notifications/mark-read` - Mark notifications as read

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
```