# pull official base image
FROM node:lts-alpine

# set working directory
# WORKDIR /app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY /frontend/package.json ./
COPY /frontend/package-lock.json ./
COPY /frontend/public ./public
COPY /frontend/src ./src

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

#install modules für frontend,npm i axios ,npm i react-router-dom ,npx create-react-app ., npm start
#npm install -D tailwindcss postcss autoprefixer, npx tailwindcss init -p

# add app
COPY /frontend .

# start app
CMD ["npm", "start"]