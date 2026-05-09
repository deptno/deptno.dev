FROM node:22-bullseye-slim AS builder

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

COPY . .
RUN pnpm build

FROM nginx:stable-alpine

COPY --from=builder /app/out /usr/share/nginx/html

ARG GIT_COMMIT=unknown
ENV NEXT_PUBLIC_GIT_COMMIT=$GIT_COMMIT
