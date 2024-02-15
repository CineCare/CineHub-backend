FROM node:18
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Copy .env from the local machine ( check  path )
COPY /var/jenkins_home/secrets/cinecare_backend/.env .

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

CMD [ "npm", "run", "start" ]