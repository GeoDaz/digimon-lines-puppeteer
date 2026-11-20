FROM node:22-slim AS deps

ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM ghcr.io/puppeteer/puppeteer:22.12.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true\
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable\
    DIGIMON_LINES_URL=https://digimon-lines.com

WORKDIR /user/src/app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["node", "index.js"]
