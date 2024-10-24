const express = require("express");
const app = express();
const { port } = require("./config"); 

// Налаштування EJS як шаблонізатора
app.set("view engine", "ejs");

// Налаштування публічної директорії для статичних файлів
app.use(express.static("public"));

// Маршрут для головної сторінки
app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello, EJS!",
    message: "Welcome to EJS templating!",
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
