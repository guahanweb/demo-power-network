# Base Stage
FROM node:22-alpine AS base
WORKDIR /app

# Copy root package files from the build context (repo root)
COPY package.json ./
COPY . .

# Install dependencies for the power-client workspace only
RUN npm install -w apps/dwarven-client

# Development Stage
FROM base AS dev
WORKDIR /app

# Copy all source files from the repo root
COPY . .

# Install development dependencies for the workspace
RUN npm install -w apps/dwarven-client --only=development

# Expose the development port
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "dev", "-w", "apps/dwarven-client"]

# Build Stage
FROM base AS build
WORKDIR /app

# Copy all source files from the repo root
COPY . .

# Build the application for production
RUN npm run build -w apps/dwarven-client

# Production Stage
FROM nginx:alpine AS prod

# Copy the build output to NGINX's web root
COPY --from=build /app/apps/dwarven-client/dist /usr/share/nginx/html

# Expose the production port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]