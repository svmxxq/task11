const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Позволяет всем доменам делать запросы к вашему серверу

// Здесь вы можете добавить обработчики маршрутов для вашего сервера GraphQL и другие маршруты

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
