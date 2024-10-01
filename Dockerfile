FROM node:16-alpine

RUN apk add --update --no-cache tzdata

# EXPORT ENVs
ENV TZ America/Sao_Paulo

WORKDIR /credit_simulator_api

COPY package.json package-lock.json tsconfig.json babel.config.js swagger-doc.json ./
COPY src src

RUN npm ci
RUN npm run build

EXPOSE 3000 
USER node
CMD ["node", "dist/index.js"]