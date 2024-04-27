FROM node:20.10.0
WORKDIR /usr/src/api
COPY . .
COPY ./.env.example ./.env
RUN npm install --quiet --no-optional --no-fund --loglevel=error --only=prod
RUN npm install -g @nestjs/cli
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start:prod"]