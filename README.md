Krumble Backend

Description

The backend for the Krumble application, built using Node.js and Express, provides functionality for user authentication, Krum model management, and API endpoints for handling user requests. This repository is designed to support the core business logic and data processing for the Krumble platform.

Features

User authentication and authorization

Middleware for handling user updates

Krum model schema and API

Google Cloud integration

Database management with authentication

Various utility functions

Tech Stack

Node.js - JavaScript runtime environment

Express.js - Web framework for Node.js

MongoDB - NoSQL database

Google Cloud - Cloud storage and deployment

Installation

Clone the repository:

git clone https://github.com/Krumble-dev/Krumble-backend.git

Navigate to the project directory:

cd Krumble-backend

Install dependencies:

npm install

Set up environment variables in a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLOUD_CONFIG=your_google_cloud_config

Start the server:

npm start

Project Structure

Krumble-backend/
│-- controllers/       # Handles business logic for various endpoints
│-- middleware/        # Middleware for authentication and request handling
│-- models/            # Database schemas
│-- routes/            # API route handlers
│-- db/                # Database connection logic
│-- utils/             # Utility functions
│-- validators/        # Validation logic for requests
│-- constants.js       # Constants used across the project
│-- server.js          # Entry point of the backend application
│-- .gitignore         # Git ignore file
│-- package.json       # Project dependencies and scripts
│-- README.md          # Project documentation

API Endpoints

User Authentication:

POST /auth/signup - Register a new user

POST /auth/login - Authenticate user

Krum Model Management:

POST /krum/upload - Upload a Krum model

GET /krum/:id - Get a specific Krum model

PUT /krum/:id - Update a Krum model
