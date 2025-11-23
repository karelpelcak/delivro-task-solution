FROM node:20-alpine

WORKDIR /app

# Install deps, build, and run Next in production mode
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm","run","start"]
