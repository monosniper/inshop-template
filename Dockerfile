FROM node:lts as dependencies
WORKDIR /inshop-template
COPY package.json ./
RUN npm install --force

FROM node:lts as builder
WORKDIR /inshop-template
COPY . .
COPY --from=dependencies /inshop-template/node_modules ./node_modules
RUN npm build

FROM node:lts as runner
WORKDIR /inshop-template
ENV NODE_ENV production

COPY --from=builder /inshop-template/public ./public
COPY --from=builder /inshop-template/package.json ./package.json
COPY --from=builder /inshop-template/.next ./.next
COPY --from=builder /inshop-template/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]