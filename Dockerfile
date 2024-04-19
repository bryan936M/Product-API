FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# copy both to the container
COPY package*.json ./

# install packages to the container
RUN npm install

# copy everything
COPY . .

# # generate the prisma database client
# RUN npx prisma generate

# expose the api port
EXPOSE 3000

# run the dev app - prod is not currently Dockerised
CMD [ "npm", "run", "start" ]