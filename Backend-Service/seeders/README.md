# Database Seeders

This directory contains database seeders for populating initial data.

## Available Seeders

### Demo Users (`20260126115114-demo-users.js`)

Creates demo users for development and testing purposes.

#### Seeded Users

| Email | Role | Password | Active | Phone | Notes |
|-------|------|----------|--------|-------|-------|
| admin@salon.com | admin | Password123 | ✅ Yes | +1234567890 | Admin user for testing |
| john.doe@example.com | customer | Password123 | ✅ Yes | +1234567891 | Active customer |
| jane.smith@example.com | customer | Password123 | ✅ Yes | +1234567892 | Active customer |
| bob.wilson@example.com | customer | Password123 | ✅ Yes | +1234567893 | Active customer |
| alice.brown@example.com | customer | Password123 | ❌ No | - | Inactive customer (for testing) |

**⚠️ Important:** All demo users share the same password: `Password123`

## Commands

### Run All Seeders
```bash
npm run seed
```

This will:
- Insert all demo users into the database
- Hash passwords using bcrypt
- Set proper timestamps

### Undo All Seeders
```bash
npm run seed:undo
```

This will:
- Remove all seeded users
- Clean up the database

### Generate New Seeder
```bash
npx sequelize-cli seed:generate --name seeder-name
```

## Usage in Testing

These demo users are particularly useful for:

1. **Manual Testing**: Use the credentials to log in and test features
2. **Integration Tests**: Reference these users in your test suites
3. **Development**: Have realistic data without manual entry
4. **Role Testing**: Test both admin and customer roles
5. **Edge Cases**: Test inactive users (alice.brown@example.com)

## Best Practices

✅ **Do:**
- Run seeders in development environment
- Use for testing and demo purposes
- Update this README when adding new seeders
- Use descriptive names for seeders

❌ **Don't:**
- Run seeders in production (use migrations for production data)
- Hardcode production credentials
- Commit `.env` files with real passwords
- Use weak passwords in production

## Environment-Specific Seeding

Currently seeders run in any environment. To restrict to development only:

```javascript
// In seeder file
if (process.env.NODE_ENV === 'production') {
  console.log('Skipping seed in production');
  return;
}
```

## Adding More Seeders

When creating new seeders, follow these conventions:

1. **Naming**: Use descriptive names (e.g., `demo-services.js`, `test-bookings.js`)
2. **Documentation**: Add entry to this README
3. **Rollback**: Always implement the `down` method
4. **Dependencies**: Consider seeder order (users before bookings, etc.)
5. **Idempotency**: Make seeders safe to run multiple times if possible

## Seeder Order

Sequelize runs seeders in alphabetical order by filename. Current order:

1. ✅ `20260126115114-demo-users.js` - Create demo users

Add new seeders below:
- `202601XX-demo-services.js` - Service catalog
- `202601XX-demo-bookings.js` - Sample bookings
- `202601XX-demo-payments.js` - Payment records

## Troubleshooting

### Duplicate Key Error
If you get a duplicate key error:
```bash
npm run seed:undo
npm run seed
```

### Connection Refused
Check your `.env` file and ensure PostgreSQL is running:
```bash
# Check PostgreSQL status (macOS)
brew services list | grep postgresql

# Start PostgreSQL
brew services start postgresql
```

### Wrong Database
Verify the database in `config/config.js` matches your `.env`:
```bash
echo $DB_NAME
# Should output: salon_booking
```
