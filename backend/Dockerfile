FROM node:20-alpine

WORKDIR /app

# system deps for waiting for postgres
RUN apk add --no-cache bash netcat-openbsd

# copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json drizzle.config.ts ./

# copy source
COPY src ./src

# install all dependencies (including devDeps so drizzle-kit is available)
RUN npm install

# build TypeScript
RUN npm run build

EXPOSE 8080

# Wait for Postgres, run migrations, then start the built server
CMD ["sh","-c","until nc -z postgres 5432; do echo 'waiting for postgres'; sleep 1; done; npx drizzle-kit push && node dist/src/index.js"]
