FROM node:20-bullseye-slim

ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

CMD pnpm start
