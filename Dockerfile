FROM node:latest

RUN mkdir -p /omp
WORKDIR /omp

# Install app dependencies
COPY ./package.json ./package.json
RUN npm install --production

# Copy over the app files
COPY ./ ./

CMD ["node", "server.js"]
