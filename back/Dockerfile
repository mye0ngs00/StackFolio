## Stage 1 (base)
FROM node:15.5.1-alpine3.12 as base
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
RUN npm install -g @nestjs/cli

## Stage 2 (development)
# We don't COPY in this stage because we bind-mount for dev
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development

## Stage 4 (test)
FROM dev as test
ENV NODE_ENV=test

## Stage 5 (build)
FROM test as build
ENV NODE_ENV=production
RUN npm run prebuild
RUN npm run build
RUN rm -rf ./node_modules

## Stage 6 (production)
FROM base as prod
COPY --from=build /app /app
USER node
CMD ["node", "dist/main"]
