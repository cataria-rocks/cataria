FROM node:6

EXPOSE 80

RUN apt-get update && apt-get install -y \
    python-software-properties \
    python \
    g++ \
    make \
    git \
    bzip2 \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN echo "Europe/Moscow" > /etc/timezone \
 && dpkg-reconfigure -f noninteractive tzdata

ARG YENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app/

RUN git init \
 && npm install --production=false --quiet

# install project
COPY . /usr/src/app

RUN YENV=production npm run make \
 && npm prune --production \
 && rm -rf .git \
 && rm -rf *.blocks

CMD node server
