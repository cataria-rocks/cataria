FROM node:6

RUN mkdir -p /xliff/app
WORKDIR /xliff/app

COPY . /xliff/app

EXPOSE 80

RUN npm run build

CMD PORT=80 npm run start
