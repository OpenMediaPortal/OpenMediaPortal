FROM node:latest

WORKDIR /home/omp

# Install app dependencies
COPY ./package.json .
RUN npm install --production

# Copy over the app files
COPY . .

CMD ["node", "server.js"]
