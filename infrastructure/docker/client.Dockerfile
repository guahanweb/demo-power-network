# Base Stage
FROM node:22-alpine AS base
WORKDIR /app

# Copy root package files from the build context (repo root)
COPY package.json ./
COPY . .

# ARG for Workspace
ARG WORKSPACE=apps/dwarven-client

# Install dependencies for the specified workspace
RUN npm install -w ${WORKSPACE}

# Development Stage
FROM base AS dev
WORKDIR /app

# ARG for Workspace (re-declared for later stages)
ARG WORKSPACE=apps/dwarven-client

# Copy all source files from the repo root
COPY . .

# Install development dependencies for the specified workspace
RUN npm install -w ${WORKSPACE} --only=development

ENV WORKSPACE=${WORKSPACE}

# Run the application in development mode
CMD ["npm", "run", "dev", "-w", "${WORKSPACE}"]

# Build Stage
FROM base AS build
WORKDIR /app

# ARG for Workspace (re-declared for later stages)
ARG WORKSPACE=apps/dwarven-client

# Copy all source files from the repo root
COPY . .

# Build the application for production
RUN npm run build -w ${WORKSPACE}

# Production Stage
FROM nginx:alpine AS prod

# ARGs for Workspace and NGINX Template
ARG WORKSPACE=apps/dwarven-client
ARG TEMPLATE_NAME=./infrastructure/docker/client.conf.template

# Clean default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy NGINX configuration for the workspace
COPY ${TEMPLATE_NAME} /etc/nginx/templates/default.conf.template

# Copy the build output to NGINX's web root
COPY --from=build /app/${WORKSPACE}/dist /usr/share/nginx/html

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
