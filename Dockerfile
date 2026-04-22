# Use an official Node.js runtime as a parent image
FROM node:24-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built application
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration (optional - remove if using default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
