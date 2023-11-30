FROM node:21.2-alpine
COPY . /opt/server
WORKDIR /opt/server
RUN npm install
EXPOSE "8080"
CMD ["npm", "start"]