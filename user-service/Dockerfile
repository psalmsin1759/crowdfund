FROM node:20-alpine AS builder


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY tsconfig.json ./
COPY src ./src


RUN npm run build



FROM node:20-alpine

WORKDIR /app


COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


RUN npm install --only=production


ENV NODE_ENV=production


EXPOSE 3000


CMD ["node", "dist/index.js"]
