# Use an official Node.js image from the Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app will run on (port 5173 for Vite or similar)
EXPOSE 5173

# Run your frontend app (replace with your actual npm run command)
CMD ["npm", "run", "dev"]
