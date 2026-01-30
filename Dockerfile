# Stage 1: Build the application
# CHANGED: Updated from node:18-alpine to node:20-alpine
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
# CHANGED: Updated from node:18-alpine to node:20-alpine
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built assets from the builder stage
# (Ensure these match your Next.js output. If using 'standalone' output, this part changes)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
