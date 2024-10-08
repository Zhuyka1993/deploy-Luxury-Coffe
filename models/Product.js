//містить визначення схеми MongoDB для зберігання даних про маршрути.

import mongoose from "mongoose";

// Визначення схеми даних для моделі Product
const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId, // поле для генерації айді
  title: {
    type: String,
    required: true, // title є обов'язковою
  },
  price: Number,
  description: String, // Опис може бути необов'язковим
  type: String,
  image: String, // Шлях до картинки може бути необов'язковим
});

// Створення моделі на основі схеми
const Product = mongoose.model("Product", productSchema);

export default Product;
