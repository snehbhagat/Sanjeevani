# Sanjeevani AI Backend

## Overview
Modular, documented, and scalable backend for Sanjeevani AI. Built with Node.js and Express.

## Features
- RESTful API with versioning (`/api/v1/`)
- Modular structure: routes, controllers, services, models, middlewares
- Environment variable support
- OpenAPI/Swagger documentation (`/api-docs`)
- Stub endpoint for AI/ML integration (`/api/v1/predict`)
- Ready for JWT authentication and AES encryption
- Unit testing setup

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```cmd
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   AES_KEY=your_aes_key
   ```
4. Start the server:
   ```cmd
   npm run dev
   ```
5. Access API docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Usage
- **POST /api/v1/predict**: AI/ML stub endpoint
  - Request body:
    ```json
    { "input": "Sample input for prediction" }
    ```
  - Response:
    ```json
    {
      "prediction": "positive",
      "confidence": 0.85,
      "message": "This is a stub response. Integrate your model here."
    }
    ```

## Contribution Guide
- Follow modular structure for new features
- Document new endpoints in OpenAPI spec
- Add unit tests for all services

## License
MIT
