import express from "express";
import db from "./db.js";
import Product from "./models/Product.js";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import configureEjs from "./ejsSetup.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import path from "path"; //
import { fileURLToPath } from "url";
import { port } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Створюємо екземпляр нашого сервера
const app = express();


// Налаштування EJS як шаблонізатора
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Налаштування middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "views")));

// Виклик функції налаштування EJS
configureEjs(app);

// Налаштування multer для зберігання зображень
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Обслуговування статичних файлів
app.use("/upload", express.static("upload"));

// Налаштування сесій
app.use(
  session({
    secret: "your_secret_key", // Змініть на секретний ключ
    resave: false,
    saveUninitialized: false,
  })
);

// Ініціалізація passport
app.use(passport.initialize());
app.use(passport.session());

// Локальна стратегія для passport
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    if (email === "admin@ukr.net" && password === "123456789") {
      return done(null, { email: "admin@ukr.net" });
    } else {
      return done(null, false, { message: "Неправильний логін або пароль" });
    }
  })
);

// Сереалізація користувача
passport.serializeUser((user, done) => {
  done(null, user.email); // або user.id, якщо ви маєте унікальний ідентифікатор користувача
});

// Десереалізація користувача
passport.deserializeUser((email, done) => {
  // Отримати дані користувача з бази даних за email або id
  if (email === "admin@ukr.net") {
    done(null, { email: "admin@ukr.net" }); // або знайдений користувач
  } else {
    done(null, false);
  }
});

// Роут для створення продуктів
app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: imagePath,
      type: req.body.type,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Rout for main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Роут для отримання продуктів з бд
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send("Помилка отримання даних про продукти");
  }
});

// Роут для видалення продукта
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.send("Product deleted successfully");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Error deleting product");
  }
});

// PUT /products/:id - Обновлення продукту
app.patch("/products/:id", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const productId = req.params.id;
  const updatedProduct = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.file ? req.file.path.replace(/\\/g, "/") : req.body.image,
    type: req.body.type,
  };

  try {
    const result = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).send("Product not found");
    }
    res.send("Product updated successfully");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Error updating product");
  }
});

// Роут для перегляду продуктів з використанням EJS
app.get("/products-view", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products", { products });
  } catch (err) {
    res.status(500).send("Помилка отримання даних про продукти");
  }
});

// Роут для відображення форми для входу користувача
app.get("/login", (req, res) => {
  res.render("login");
});

// Роут для входу користувача
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin-panel",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

// Роут для відображення панелі адміністратора, тільки для авторизованих користувачів
app.get("/admin-panel", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.sendFile(path.resolve("./public/adminInterface.html"));
});

// Роут для виходу користувача
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// Слухаємо сервер на визначеному порті
app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});
