# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Create and change to the app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Change ownership of the directory
RUN chown -R node:node /usr/src/app

# Copy package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Install git 
RUN apk add --no-cache git

# Install production dependencies.
RUN npm install

## add deps for hot reload
RUN npm install -g typescript ts-node

# Copy local code to the container image.
COPY --chown=node:node . .

# Copy images from local machine to Docker image
COPY --chown=node:node public/uploads /usr/src/app/public/uploads

# Expose the port
EXPOSE 3333

# Run the web service on container startup
CMD ["npm","run","dev"]
