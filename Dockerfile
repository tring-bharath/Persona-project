from node:20-alpine
workdir /persona
COPY . package*.json
run npm install
copy . .
expose 5173
cmd ["npm", "run", "dev"]