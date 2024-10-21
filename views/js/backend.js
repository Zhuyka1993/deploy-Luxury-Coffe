import express from "express";
import multer from "multer";
import path from "path";

const app = express();
// Папка для зберігання завантажених зображень
const uploadDirectory = path.join(__dirname, "uploads");
const port = process.env.PORT || 3000;

// Перевірка чи існує папка для зображень, якщо ні - створити
const fs = require("fs");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Налаштування Multer для завантаження файлів
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST маршрут для завантаження файлів
app.post("/upload", upload.single("imageInput"), (req, res) => {
  const title = req.body.titleInput;
  const description = req.body.descriptionInput;
  const imagePath = req.file.path;

  // Тут МОЖНА зберегти інформацію в базі даних або виконати інші дії з отриманими даними

  console.log("Received:", { title, description, imagePath });
  res.status(200).send("File uploaded successfully");
});

// GET маршрут для отримання даних у форматі JSON
app.get("/data", (req, res) => {
  // Тут можна підготувати дані для відправлення у форматі JSON
  const data = {
    title: "Example Title",
    description: "Example Description",
    imagePath: "example.jpg",
  };
  res.json(data);
});

// Статичний маршрут для зображень
app.use("/uploads", express.static("uploads"));

// Прослуховування запитів на порту
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
