FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV PORT=5000
ENV EMAIL_PASS=mzebqksxpdlrwonb
ENV EMAIL_USER=bipingowda7@gmail.com
ENV MONGO_CONNECTION_KEY=mongodb+srv://bipingowda7:bipin123@cluster0.3kkrk.mongodb.net/
CMD ["npm", "start"]