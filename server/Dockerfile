# Use the official Node.js image.
FROM node:20.11.1

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3001

# Define environment variable for production.
ENV NODE_ENV=production

# Run the app.
CMD ["npm", "start"]
