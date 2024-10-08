function addContent() {
    // Завантаження даних з сервера
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); //перевірка  на успішність відповіді
        }
        return response.json();
      })
      .then((data) => {
        // Проходження через отримані дані
        for (let i = 0; i < data.length; i++) {
          const type = document.querySelector('select[name="type"]');
  
          //Створення динамічного контенту:
          const contentDiv = document.querySelector(".content");
          const newDiv = document.createElement("div");
          newDiv.className = "boxContent " + "unic" + i + " " + data[i].type;
  
          // Створення елементів для відображення контенту
          const titleElement = document.createElement("span");
          titleElement.className = "titleContent";
          titleElement.textContent = data[i].title;
  
          // Creating element for showing price
          const price = document.createElement("span");
          price.className = "price";
          price.textContent = "Ціна:" + data[i].price + " грн.";
  
  
  
          const descriptionSpan = document.createElement("span");
          descriptionSpan.className = "descriptionContent";
          descriptionSpan.textContent = data[i].description;
  
          // Перевірка наявності зображення
          if (data[i].image) {
            const imgElement = document.createElement("img");
  
            imgElement.src = "http://localhost:3000/" + data[i].image; // Встановлення src для зображення
            imgElement.className = "imageContent"; // Встановлення класу
            newDiv.appendChild(imgElement); // Додавання зображення до newDiv
          }
      
          newDiv.appendChild(titleElement);
          newDiv.appendChild(descriptionSpan);
          newDiv.appendChild(price);
          // Додавання нового діву до вмісту
          contentDiv.appendChild(newDiv);
  
          // Обробка отриманих даних для кнопки едіт
  
         
        }
      })
      .catch((error) => {
        console.error("Помилка:", error);
      });
  
      // ---------- Why do we need this?
  
    // ОБРОБКА ДАНИХ З ФОРМИ
  
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    // Передача URL-адреси зображення, якщо вона є
  
    // Перевірка заповненості полів
    if (title.length > 0 && description.length > 0) {
      const newDiv = document.createElement("div");
      newDiv.className = "boxContent";
  
      // Очищення введених даних
      document.getElementById("descriptionType").value = "";
      document.getElementById("titleInput").value = "";
      document.getElementById("descriptionInput").value = "";
      document.getElementById("imageInput").value = "";
    }
}

window.onload = function () {
    addContent();
};