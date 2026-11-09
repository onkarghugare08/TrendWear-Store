# TrendWear

TrendWear is a modern fashion e-commerce platform built for browsing products, managing carts, authenticating users, and processing secure online payments. The project combines a React frontend with a Node.js/Express backend, MongoDB persistence, and Stripe-powered checkout.

## Overview

TrendWear is designed to provide a premium shopping experience for fashion products, with a polished storefront, category-based browsing, user account flows, and secure checkout. The application is structured as a full-stack product with a clean separation between frontend and backend services.

## Features

- Modern storefront UI with a luxury fashion aesthetic
- Product catalog with featured and category-based browsing
- User signup/login flow with JWT-based authentication
- Cart management and order summary
- Stripe payment checkout
- Admin product management capabilities
- Analytics endpoints for store insights
- Redis and MongoDB integration
- Docker-ready deployment configuration
- Environment-based configuration for local and production usage

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Zustand
- Tailwind CSS
- Framer Motion
- Recharts
- Stripe JS

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Redis
- JWT
- Stripe
- Cloudinary
- Cookie-based session handling

### Deployment / Infrastructure
- Docker
- Docker Compose
- Nginx-based frontend service
- MongoDB and Redis containers

## Project Structure

```bash
Trend_Wear-main/
├── backend/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── docker-compose.yml
├── DEPLOY.md
├── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js 18+
- npm or yarn
- MongoDB
- Redis
- Docker and Docker Compose (optional, for containerized setup)

## Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the values in `.env` with your local or deployment credentials.

### Required environment variables

- `CLIENT_URL`
- `MONGO_ROOT_USERNAME`
- `MONGO_ROOT_PASSWORD`
- `MONGO_DB_NAME`
- `REDIS_PASSWORD`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `STRIPE_SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Running the Project

### 1. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:
```bash
http://localhost:5000
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on:
```bash
http://localhost:5173
```

## Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

The backend also includes a build script that installs frontend dependencies and builds the frontend bundle.

## Docker Setup

This project includes a Docker Compose setup for local or production-style deployment.

```bash
cp .env.example .env
docker compose up -d --build
```

This starts:
- frontend web service
- backend API
- MongoDB
- Redis

## API Overview

The backend exposes REST endpoints for:

- Authentication
- Products
- Cart
- Coupons
- Payments
- Analytics

Health check:
```bash
curl -s localhost/api/health
```

## Authentication

The system uses JWT-based authentication with secure cookie handling. Protected routes require valid tokens and, where necessary, admin authorization.

## Payment Integration

Stripe is used for secure online payments. The backend handles payment requests and redirects users back to the configured frontend URL.

## Cloud Media

Cloudinary is used for image upload and media management for products and storefront assets.

## Deployment

For deployment details, see [DEPLOY.md](DEPLOY.md).

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome. To contribute:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a pull request

## Contact

For project inquiries, collaboration, or feature requests, connect through the repository owner or project maintainer.
