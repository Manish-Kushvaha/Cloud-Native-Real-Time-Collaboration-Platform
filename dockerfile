# FROM node:20-alpine

# COPY ./Backend .

# RUN npm install 
# # cmd run at time of image building

# CMD ["node", "server.js"]
# # this cmd run when you run the container


# Build the Frontend [dist folder]
# Copy the dist folder content in Backend/public folder

FROM node:20-alpine as frontend-builder

COPY ./Frontend /app

WORKDIR /app

RUN npm install 

RUN npm run build

# Build the Backend

FROM node:20-alpine

COPY ./Backend /app

WORKDIR /app

RUN npm install

COPY --from=frontend-builder /app/dist /app/public

CMD ["node", "server.js"]