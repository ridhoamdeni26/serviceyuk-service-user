FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install sequelize-cli --save

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

EXPOSE 3010
CMD ["npm", "run", "start.dev"]