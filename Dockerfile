FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

CMD [ "yarn","start:dev" ]