# Sanjeevani AI - Backend

Express.js + MongoDB backend for Thalassemia donor finder with JWT auth and a tiny test UI.

## Setup

1. Copy .env example

```
copy .env.example .env
```

2. Install deps

```
npm install
```

3. Run dev

```
npm run dev
```

4. Seed sample data (optional)

```
npm run seed
```

Open http://localhost:5000 to use the simple UI.

## API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/donors (auth)
- GET /api/donors
- POST /api/requests
- GET /api/requests
- GET /api/gamification/:userId
- POST /api/chatbot
- GET /api/prediction/donor/:id

Passwords hashed with bcrypt. Contacts encrypted with AES-256-CBC. Inputs validated with express-validator. JWT used for protected routes.

***

MIT License