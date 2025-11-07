# Use Node.js 18 Alpine base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies (including mongoose, express, prom-client, etc.)
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the port defined in .env (or default to 3500)
EXPOSE 3500

# Start the app
CMD ["npm", "start"]
