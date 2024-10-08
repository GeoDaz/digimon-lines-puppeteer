FROM ghcr.io/puppeteer/puppeteer:22.12.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true\
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable\
    DIGIMON_LINES_URL=https://digimon-lines.com

WORKDIR /user/src/app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]