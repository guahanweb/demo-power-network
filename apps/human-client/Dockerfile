# Base Stage
FROM node:22-alpine AS base
WORKDIR /app

# Copy root package files from the build context (repo root)
COPY package.json ./
COPY . .

# Install dependencies for the power-client workspace only
RUN npm install -w apps/human-client

# Development Stage
FROM base AS dev
WORKDIR /app

# Copy all source files from the repo root
COPY . .

# Install development dependencies for the workspace
RUN npm install -w apps/human-client --only=development

# Expose the development port
EXPOSE 3005

# Run the application in development mode
CMD ["npm", "run", "dev", "-w", "apps/human-client"]

# Build Stage
FROM base AS build
WORKDIR /app

# Copy all source files from the repo root
COPY . .

# Build the application for production
RUN npm run build -w apps/human-client

# Production Stage
FROM nginx:alpine AS prod

# Copy the build output to NGINX's web root
COPY --from=build /app/apps/human-client/dist /usr/share/nginx/html

# Expose the production port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]