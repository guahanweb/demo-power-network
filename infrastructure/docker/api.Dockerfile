# Base Stage
FROM node:22-alpine AS base
WORKDIR /app

ARG WORKSPACE=apps/api

# Copy root package files from the context
COPY package.json package-lock.json ./

# Install dependencies for the workspace only
RUN npm install --frozen-lockfile

# Development Stage
FROM base AS dev
WORKDIR /app

ARG WORKSPACE=apps/api
ENV WORKSPACE=${WORKSPACE}

# Copy all source files from the monorepo
COPY . .

# Install development dependencies for the workspace
RUN npm install --only=development -w ${WORKSPACE}

# Run the application in development mode
CMD ["npm", "run", "dev", "-w", "${WORKSPACE}"]

# Production Stage
FROM base AS prod
WORKDIR /app

ARG WORKSPACE=apps/api
ENV WORKSPACE=${WORKSPACE}

# Copy all source files
COPY . .

# Build the application for production
RUN npm run build -w ${WORKSPACE}

# Run the application in production mode
CMD ["npm", "start", "-w", "${WORKSPACE}"]
