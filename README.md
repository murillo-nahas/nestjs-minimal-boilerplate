# NestJS Minimal Boilerplate

Basic boilerplate with NestJS, Fastify, Zod, and Prisma. Straight to the point.

## Stack

- **NestJS** - Framework
- **Fastify** - HTTP adapter (faster than Express)
- **Zod** - Schema validation
- **Prisma** - ORM
- **PostgreSQL** - Database (via Docker)
- **Swagger** - API documentation

## Features

- Zod validation with custom pipes
- Swagger integrated with Zod schemas
- Complete CRUD example (Cats module)
- Prisma configured and ready
- Docker Compose for Postgres
- TypeScript strict mode

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://nestjs-boilerplate:nestjs-boilerplate@localhost:5433/nestjs-boilerplate_db"
```

3. **Start Postgres:**

```bash
docker compose up -d
```

4. **Run migrations:**

```bash
npx prisma migrate dev
```

5. **Generate Prisma Client:**

```bash
npx prisma generate
```

6. **Start the server:**

```bash
npm run start:dev
```

API runs at `http://localhost:3000`

Swagger at `http://localhost:3000/api`

## Structure

```
src/
├── modules/
│   └── cats/              # Complete resource example
│       ├── cats.controller.ts
│       ├── cats.service.ts
│       ├── cats.module.ts
│       └── schemas/       # Zod DTOs
├── pipes/
│   └── zod-validation.pipe.ts
├── prisma/
│   └── prisma.service.ts
└── main.ts
```

## Usage example

**GET all cats:**

```bash
curl http://localhost:3000/cats
```

**POST create cat:**

```bash
curl -X POST http://localhost:3000/cats \
  -H "Content-Type: application/json" \
  -d '{"name": "Whiskers", "age": 3, "breed": "Persian"}'
```

**PUT update cat:**

```bash
curl -X PUT http://localhost:3000/cats/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Whiskers Jr"}'
```

**DELETE cat:**

```bash
curl -X DELETE http://localhost:3000/cats/{id}
```

## Useful scripts

```bash
npm run start:dev       # Dev with hot reload
npm run build           # Production build
npm run test            # Unit tests
npm run test:e2e        # E2E tests
npx prisma studio       # Prisma UI to view database
```

## Adding a new resource

Use `CatsModule` as example. Basic structure:

1. Create the model in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Create DTOs with Zod in `schemas/`
4. Controller with `ZodValidationPipe` on `@Body()`
5. Service with `PrismaService` injection
6. Module registering controller and service
