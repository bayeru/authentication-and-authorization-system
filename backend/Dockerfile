FROM node:alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:alpine

ENV CLIENT_URL http://localhost
ENV PORT 8000
ENV MONGO_URI mongodb+srv://dbadmin:gj6mqs1KDdQJSQ4V@cluster0.wmahrxg.mongodb.net/auth?retryWrites=true&w=majority
ENV JWT_SECRET jwt123
ENV SENDGRID_API_KEY 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
ENV SENDGRID_SENDER_EMAIL uza.kaplan@gmail.com

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000

CMD ["node", "./dist/index.js"]