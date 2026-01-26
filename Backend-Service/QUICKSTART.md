# Quick Start Guide

This guide will help you get the backend service up and running quickly.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE salon_booking;

# Create test database (for testing)
CREATE DATABASE salon_booking_test;

# Exit psql
\q
```

### 3. Configure Environment Variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` and update at minimum:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=salon_booking
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT (generate secure random strings)
JWT_SECRET=your_secure_random_string_here
JWT_REFRESH_SECRET=your_secure_refresh_token_string_here
```

### 4. Start Development Server

```bash
npm run dev
```

The server should start on `http://localhost:5000`

### 5. Verify Setup

Check the health endpoint:

```bash
curl http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## Next Steps

### Create Your First Migration

When you're ready to define your database schema:

```bash
npm run migrate:create create-users
```

Edit the migration file in the `migrations/` folder, then run:

```bash
npm run migrate
```

### Project Structure

```
Backend-Service/
├── src/
│   ├── config/         # Configuration files (database, environment)
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions (logger, etc.)
│   ├── types/          # TypeScript type definitions
│   ├── app.ts          # Express app setup
│   └── index.ts        # Server entry point
├── migrations/         # Database migrations
├── seeders/            # Database seeders
├── tests/              # Test files
└── logs/               # Log files (generated)
```

## Common Commands

```bash
npm run dev              # Start development server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm start                # Run production build
npm test                 # Run tests
npm run migrate          # Run pending migrations
npm run migrate:undo     # Undo last migration
npm run lint             # Lint code
npm run lint:fix         # Lint and auto-fix issues
```

## Troubleshooting

### Database Connection Error

If you see "Unable to connect to the database":
- Verify PostgreSQL is running: `pg_isready`
- Check your `.env` database credentials
- Ensure the database exists: `psql -U postgres -l`

### Port Already in Use

If port 5000 is already in use, change it in `.env`:
```env
PORT=3001
```

### TypeScript Errors

Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## API Documentation

Once the server is running, available endpoints:

- `GET /health` - Health check
- `GET /api/v1` - API version info

More endpoints will be available as you add features following the patterns in:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

## Development Tips

1. **Follow the layered architecture**: Controllers → Services → Models
2. **Always use migrations** for schema changes (never modify models without migrations)
3. **Use Sequelize transactions** for operations that modify multiple tables
4. **Check the Claude instructions** at [.claude/instructions.md](../.claude/instructions.md) for best practices
5. **Write tests** as you build features

For detailed documentation, see [README.md](README.md)
