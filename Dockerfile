FROM node:18 as base


FROM base as development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000 
CMD [ "npm", "run" ,"start-dev" ]

FROM base as production
WORKDIR /app
COPY package.json ./
RUN npm install  --only=production
COPY . .
EXPOSE 4000 
CMD [ "npm", "start" ]




FROM jenkins/jenkins:lts

USER root

# Install docker CLI
RUN apt-get update && apt-get install -y \
    docker.io \
    docker-compose \
    && rm -rf /var/lib/apt/lists/*

# Add Jenkins user to docker group
RUN usermod -aG docker jenkins

USER jenkins
