# Use Node.js LTS image for build step
FROM node:18 as build 
  
WORKDIR /app
  
# Install dependencies & build frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Use Nginx to serve build folder
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
