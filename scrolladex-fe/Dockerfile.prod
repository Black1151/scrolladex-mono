# ---- Base Node ----
FROM node:alpine AS base
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json /usr/src/app/

# ---- Dependencies ----
FROM base AS dependencies  
RUN npm install 
# Copy production dependencies
COPY . /usr/src/app

# ---- Build ----
FROM dependencies AS build 
RUN npm run build 

# --- Release ----
FROM node:alpine AS release  
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/package*.json ./ 
# Install production dependencies
RUN npm install --only=production 
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# Expose the listening port
EXPOSE 3000
CMD npm start
