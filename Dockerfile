FROM node:16-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV ${NODE_ENV}
ENV JWT_SECRET ${JWT_SECRET}
ENV DB_HOST ${DB_HOST}
ENV DB_PORT ${DB_PORT}
ENV DB_USERNAME ${DB_USERNAME}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_DATABASE ${DB_DATABASE}

VOLUME [ "/app/dist/logs" ]

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 4100