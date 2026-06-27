<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
# Finance Portfolio Tracker — Backend

NestJS REST API for the Finance Portfolio Tracker application. Handles authentication, investment CRUD, and portfolio summary calculations.

**Live URL:** https://finance-tracker-backend-g1ga.onrender.com

**Frontend:** https://finance-tracker-lac-ten.vercel.app

---

## Tech Stack

- Node.js + NestJS + TypeScript
- PostgreSQL (Supabase)
- TypeORM
- JWT (passport-jwt)
- bcryptjs
- class-validator

---

## Project Structure
src/

├── auth/             # Register, login, JWT strategy, guard

├── users/            # User entity and service

├── investments/      # Investment CRUD with pagination and filtering

├── portfolio/        # Portfolio summary endpoint

└── common/

├── guards/       # JwtAuthGuard

└── decorators/   # @CurrentUser()


---

## Local Setup

### Prerequisites

- Node.js v18+
- PostgreSQL database (local or Supabase)

### Steps

```bash
git clone https://github.com/Adityakumar41347/finance_tracker-backend
cd finance_tracker-backend
cp .env.example .env
# fill in your database credentials in .env
npm install
npm run start:dev
```

API runs at **http://localhost:3001**

---

## Environment Variables

Create a `.env` file in the root:
DATABASE_HOST=aws-1-ap-southeast-2.pooler.supabase.com

DATABASE_PORT=5432

DATABASE_USERNAME=postgres.your-project-ref

DATABASE_PASSWORD=your-password

DATABASE_NAME=postgres

JWT_SECRET=your-super-secret-jwt-key

JWT_EXPIRY=7d

PORT=3001
### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |

**Register request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login request body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (both):**
```json
{
  "user": { "id": "uuid", "name": "John Doe", "email": "john@example.com" },
  "accessToken": "<jwt>"
}
```

---

### Investments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/investments` | Create investment |
| GET | `/investments` | Get all investments (paginated) |
| GET | `/investments/:id` | Get investment by ID |
| PUT | `/investments/:id` | Update investment |
| DELETE | `/investments/:id` | Delete investment |

**GET `/investments` query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `type` | string | Filter by investment type |
| `search` | string | Search by name |

**Create/Update request body:**
```json
{
  "investmentName": "HDFC Flexi Cap Fund",
  "investmentType": "Mutual Fund",
  "investedAmount": 10000,
  "currentValue": 12500,
  "purchaseDate": "2026-06-01"
}
```

Valid `investmentType` values: `Mutual Fund`, `Stock`, `ETF`, `Bond`, `Real Estate`, `Cryptocurrency`, `Fixed Deposit`, `Gold`, `Other`

---

### Portfolio

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio/summary` | Get portfolio summary |

**Response:**
```json
{
  "totalInvested": 50000,
  "currentValue": 62000,
  "profit": 12000,
  "profitPercentage": 24,
  "totalInvestments": 3,
  "breakdown": [
    {
      "type": "Mutual Fund",
      "investedAmount": 30000,
      "currentValue": 37000,
      "profit": 7000,
      "profitPercentage": 23.33,
      "count": 2
    }
  ]
}
```

---

## Available Scripts

```bash
npm run start:dev   # Development with hot-reload
npm run build       # Compile TypeScript
npm run start:prod  # Run compiled build
npm test            # Run unit tests
```

---

## Deployment (Render)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect this repo and set:

| Setting | Value |
|---------|-------|
| Build Command | `npm install && npm run build` |
| Start Command | `node dist/main` |

4. Add all environment variables from the section above
5. Click Deploy

---

## Frontend Repo

https://github.com/Adityakumar41347/finance-tracker
