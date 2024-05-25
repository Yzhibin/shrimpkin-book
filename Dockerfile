FROM node:20-alpine AS builder

ENV NODE_ENV=production YARN_VERSION=4.2.2

RUN apk update && apk upgrade && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

WORKDIR /app

COPY . .
COPY package.json yarn.lock ./
COPY .yarn ./.yarn
RUN yarn install --immutable

ARG VITE_REPO_URL
ARG VITE_BASE_URL

RUN yarn build

## get the built /dist 
FROM scratch 
COPY --from=builder /app/dist /