FROM node:20-alpine

COPY .next/standalone .
COPY .next/static ./next/static

CMD ["node", "server.js"]