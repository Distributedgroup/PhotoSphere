# Use a Node.js base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy only the dependency files first
COPY package*.json ./

# Install the dependencies inside Docker
RUN npm install --force

# Copy the rest of the project code
COPY . .

# Expose port 5066
EXPOSE 5066

# Command to run the application
CMD ["node", "app.js"]
