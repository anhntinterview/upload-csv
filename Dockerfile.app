FROM node:20.2-slim
WORKDIR /app

COPY ./package.json ./yarn.* ./
# Install both dev and devDependencies
RUN yarn install --frozen-lockfile
COPY . /app

RUN yarn build

ENV NODE_ENV="production"

CMD ["yarn", "start"]

