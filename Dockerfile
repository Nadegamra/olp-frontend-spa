#----------------------------
FROM node:19-alpine AS base
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY package*.json ./
#----------------------------
FROM base AS dev
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
#-----------------------------
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
RUN chown -R node /app
USER node
RUN npm run build
CMD ["npm", "run", "preview"]

