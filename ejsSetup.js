import path from "path";
import { fileURLToPath } from "url";

// Створюємо змінну __dirname для ES6 модулів
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configureEjs = (app) => {
  // Налаштування EJS
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
};

export default configureEjs;
