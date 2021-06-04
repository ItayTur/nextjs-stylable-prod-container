FROM node:12.18.3
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY . /app
RUN npm build
# start app
CMD [ "npm", "start" ]