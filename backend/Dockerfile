FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY /backend/package.json .
COPY /backend/package-lock.json .
RUN npm install --production --silent && mv node_modules ../
COPY /backend .
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]



