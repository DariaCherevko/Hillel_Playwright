ARG PW_VERSION=1.50.0

FROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble

ARG PW_VERSION

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm install --no-save @playwright/test@${PW_VERSION}

COPY . .

CMD ["npx", "playwright", "test", "--project=chromium", "--project=firefox"]
