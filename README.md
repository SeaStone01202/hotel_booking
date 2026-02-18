# Hotel Booking System

A progressive [NestJS](https://nestjs.com) backend application for hotel booking management with enterprise-grade architecture, TypeORM integration, PostgreSQL database, and automated module generation.

## Technology Stack

- **Framework**: NestJS 11.0.1
- **Database**: PostgreSQL
- **ORM**: TypeORM 0.3.28
- **Language**: TypeScript
- **Validation**: class-validator, class-transformer
- **Documentation**: @nestjs/swagger
- **Node.js**: v18+

## Project Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=hotel_booking

# Node Environment
NODE_ENV=development
```

### 3. Database Setup

Make sure PostgreSQL is running on your machine.

## Running the Project

### Development Mode

```bash
# Start development server with auto-reload
yarn start:dev
```

The application will run on `http://localhost:3000`

### Production Mode

```bash
# Build the project
npm run build

# Start production server
yarn start:prod
```

### Watch Mode

```bash
# Compile and watch for changes
yarn start
```

## Database Migrations

### Generate Migration

After modifying entities, generate a new migration:

```bash
npm run migration:generate -- src/database/migrations/InitialMigration
```

Replace `InitialMigration` with a descriptive migration name.

### Run Migrations

Apply pending migrations to the database:

```bash
npm run migration:run
```

This will synchronize your database schema with the defined entities.

### Revert Migration

To undo the last migration:

```bash
npm run migration:revert
```

## Quick Module Generation

The project includes an automated module generator for rapidly scaffolding new features following enterprise patterns.

### Generate a New Module

```bash
yarn g:module {moduleName}
```

**Example:**

```bash
yarn g:module user
yarn g:module hotel
yarn g:module room
yarn g:module booking
```

### Generated Module Structure

Each module automatically creates:

```
src/core/{moduleName}/
├── domain/
│   └── {moduleName}.domain.ts          # Domain model class
├── dto/
│   ├── create-{moduleName}.dto.ts      # Create DTO with validation
│   ├── update-{moduleName}.dto.ts      # Update DTO with validation
│   └── filter-{moduleName}.dto.ts      # Filter/search DTO with pagination
├── infrastructure/
│   ├── entities/
│   │   └── {moduleName}.entity.ts      # TypeORM entity
│   ├── repositories/
│   │   ├── {moduleName}.repository.ts  # Abstract repository interface
│   │   └── {moduleName}.repository.impl.ts  # Repository implementation
│   └── providers/
│       └── {moduleName}.providers.ts   # Dependency injection providers
├── mappers/
│   └── {moduleName}.mapper.ts          # Domain <-> Entity mapper
├── {moduleName}.service.ts             # Business logic service
├── {moduleName}.controller.ts          # REST API endpoints
└── {moduleName}.module.ts              # NestJS module definition
```

### Generated Features

Each module includes:

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete
- ✅ **Pagination Support** - With limit, offset, sort, order
- ✅ **Advanced Filtering** - Search and filter capabilities
- ✅ **Input Validation** - DTOs with class-validator decorators
- ✅ **API Documentation** - @ApiOkResponse Swagger decorators
- ✅ **Type Safety** - TypeScript strict mode compliance
- ✅ **Repository Pattern** - Abstract repository with implementations
- ✅ **Mapper Pattern** - Domain-to-Entity and Entity-to-Domain transformions
- ✅ **Soft Delete Support** - Timestamp-based soft deletes
- ✅ **Dependency Injection** - Centralized providers configuration

### Example: Generated User Module

```bash
yarn g:module user
```

This creates a complete User module with:

```typescript
// Create user endpoint
POST /user
{
  "name": "John Doe"
}

// Get all users with pagination
GET /user?limit=10&offset=0&sort=createdAt&order=DESC

// Search users
GET /user/filter/search?search=john&limit=10&offset=0

// Get user by ID
GET /user/{id}

// Update user
PATCH /user/{id}
{
  "name": "Jane Doe"
}

// Delete user
DELETE /user/{id}
```

## Project Architecture

### Clean Architecture Layers

```
src/
├── core/                 # Business logic modules
│   └── {moduleName}/     # Feature module
│       ├── domain/       # Core entities (not persistence)
│       ├── dto/          # Data transfer objects
│       ├── infrastructure/ # DB layer (entities, repos)
│       ├── mappers/      # Object transformations
│       ├── *.service.ts  # Business logic
│       ├── *.controller.ts # HTTP handlers
│       └── *.module.ts   # Module definition
├── common/               # Shared utilities
│   └── dto/              # Shared DTOs (pagination, etc.)
├── config/               # Configuration files
│   ├── data-source.ts    # TypeORM data source
│   └── database.config.ts # Database configuration
├── database/             # Database migrations
│   └── migrations/       # Migration files
├── tools/                # Development tools
│   └── generate-module.js # Module generator script
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

### Key Design Patterns

- **Repository Pattern**: Abstract repositories with concrete implementations
- **Mapper Pattern**: Separation between domain models and database entities
- **Dependency Injection**: NestJS built-in DI with providers
- **DTO Pattern**: Validation and type safety for API inputs/outputs

## Testing

```bash
# Run unit tests
yarn test

# Run e2e tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Build

```bash
# Compile TypeScript to JavaScript
npm run build
```

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `yarn install` | Install all dependencies |
| `yarn start:dev` | Start development server with auto-reload |
| `yarn start:prod` | Start production server |
| `npm run build` | Build the project for production |
| `yarn g:module {name}` | Generate a new module |
| `npm run migration:generate -- src/database/migrations/{name}` | Generate database migration |
| `npm run migration:run` | Run pending migrations |
| `npm run migration:revert` | Revert last migration |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run end-to-end tests |

## Environment Variables

Required environment variables in `.env`:

```env
# Database
DB_HOST=localhost          # PostgreSQL host
DB_PORT=5432              # PostgreSQL port
DB_USERNAME=postgres       # Database username
DB_PASSWORD=password       # Database password
DB_DATABASE=hotel_booking  # Database name

# Application
NODE_ENV=development       # development | production | test
```

## Troubleshooting

### Migration Errors

If migrations fail, ensure:
1. PostgreSQL is running
2. Database credentials in `.env` are correct
3. Database exists: `CREATE DATABASE hotel_booking;`

### Module Generation Issues

If `yarn g:module` fails:
1. Ensure you're in project root directory
2. Check module name is valid (lowercase, no spaces)
3. Verify Node.js version is v18+

### Build Errors

If build fails:
1. Run `yarn install` to ensure dependencies are installed
2. Check TypeScript compilation: `npm run build`
3. Verify all environment variables are set

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support

For issues and questions:
- Check existing issues in the repository
- Refer to NestJS documentation
- Check Docker setup for database

## License

MIT License - This project is open source and available under the MIT License.
