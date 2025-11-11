# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy rest of the source and build the app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

# Copy build output to NGINX html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (standard HTTP)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
