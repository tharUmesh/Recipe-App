FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . ./

EXPOSE 5000

CMD ["npm", "start"]