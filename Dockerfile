 FROM node:16.9.1-slim
 WORKDIR /app
 COPY . .
 
 # Get requirements
 RUN apt-get update \
    && apt-get install -y --no-install-recommends libexpat1-dev libnss3-dev \
    && apt-get install -y python make g++

 RUN npm install
 CMD ["bash", "dockerStart.sh"]
