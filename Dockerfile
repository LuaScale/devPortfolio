# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
# If using yarn, copy yarn.lock and use 'yarn install'
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (for Next.js/React)
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built assets from the builder stage
# Adjust these paths based on your framework (e.g., 'build' for React, '.next' for Next.js)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
