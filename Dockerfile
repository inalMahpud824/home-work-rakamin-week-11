# Menggunakan image node.js sebagai dasar
FROM node:18-alpine

# Menyebabkan semua perintah selanjutnya dijalankan dalam direktori /app di dalam kontainer
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada) ke dalam kontainer
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# Menyalin semua file dari proyek Anda ke dalam kontainer
COPY . .

# Menginstall dependensi dari package.json
RUN npm install

RUN npx prisma generate


EXPOSE 8000

# Menjalankan aplikasi Anda ketika kontainer dijalankan
CMD npm start
