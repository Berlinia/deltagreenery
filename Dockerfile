FROM node:20-alpine

WORKDIR /app

# Copy only dependency manifests first (good caching)
COPY package*.json ./

# Install deps, but DO NOT run postinstall/build yet
RUN npm install --ignore-scripts

# Now copy the full source tree (including /scripts)
COPY . .

# Run the build explicitly (now the scripts exist)
RUN npm run build

EXPOSE 8000
ENV NODE_ENV=local
CMD ["npm","start"]
