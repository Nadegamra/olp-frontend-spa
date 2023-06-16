#----------------------------
FROM node:20-alpine AS base
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY package*.json ./
#----------------------------
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
#-----------------------------
FROM base AS production
ENV NODE_ENV production
RUN npm ci --only=production
USER node
COPY . .
EXPOSE 3000
CMD ["npm", "run", "build"]