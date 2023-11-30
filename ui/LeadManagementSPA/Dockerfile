FROM node:21.2-alpine
COPY . /opt/ui
WORKDIR /opt/ui
RUN npm install -g @ionic/cli
RUN npm install
EXPOSE "8100"
CMD ["ionic", "serve", "--external"]