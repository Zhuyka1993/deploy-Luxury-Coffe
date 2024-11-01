window.onload = function () {
  addContent();
};

const port = "https://luxury-coffee.up.railway.app/upload/"

function addContent() {
  // Завантаження даних з сервера
  fetch(`${port}/products`)
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

        const delBtn = document.createElement("button");
        delBtn.textContent = "del";
        delBtn.addEventListener("click", (e) => {
          // відправити фетчом на делейт айді data[i].id

          const xhr = new XMLHttpRequest();
          // -----------------------------------------------
          xhr.open(
            "DELETE",
            `${port}/products/` +
              // ---------------- можливо замінити синтаксис _айді ( не міняю, оскільки оскільки в роутах айді стоїть products/:id)
              data[i]._id
          );
          xhr.send();

          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log("Користувач видалений");
            } else {
              console.error("Помилка при видаленні користувача:", xhr.status);
            }
          };
          //remove from array and from DOM
          data.splice(i, 1);

          const block = document.querySelector(".unic" + i);
          block.remove();
        });

        const descriptionSpan = document.createElement("span");
        descriptionSpan.className = "descriptionContent";
        descriptionSpan.textContent = data[i].description;

        // Перевірка наявності зображення
        if (data[i].image) {
          const imgElement = document.createElement("img");


          imgElement.src = `${port}/` + data[i].image; // Встановлення src для зображення
          //imgElement.src = `${port}/${item.image}`; // Використання згенерованого імені
          //imgElement.src = `${port}/${data[i]._id}-${data[i].image}`; 
         // Витягнення частини назви файлу без ID

          imgElement.className = "imageContent"; // Встановлення класу
          newDiv.appendChild(imgElement); // Додавання зображення до newDiv
        }
        // create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.className = "editButton";

        //create container for button "del and edit"
        const parrentBtn = document.createElement("div");
        parrentBtn.className = "parrentBtn";
        parrentBtn.appendChild(editBtn);
        parrentBtn.appendChild(delBtn);

        // Додавання елементів до нового діву

        newDiv.appendChild(parrentBtn);
        newDiv.appendChild(titleElement);
        newDiv.appendChild(descriptionSpan);
        newDiv.appendChild(price);
        // Додавання нового діву до вмісту
        contentDiv.appendChild(newDiv);

        // Обробка отриманих даних для кнопки едіт

        editBtn.addEventListener("click", (e) => {
          console.log(data[i]._id);
          editProduct(e, data[i]._id);
        });
      }
    })
    .catch((error) => {
      console.error("Помилка:", error);
    });

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
//BUTTONS
//clear

function clear() {
  const allElements = document.querySelectorAll(".boxContent");
  allElements.forEach((element) => {
    element.style.display = "none";
  });
}

//all button
const buttonAll = document.querySelector(".all");

buttonAll.onclick = f;
function f() {
  const allElements = document.querySelectorAll(".boxContent");
  allElements.forEach((element) => {
    element.style.display = "flex";
  });
}

//Coffe button

const buttonCoffe = document.querySelector(".coffee");

buttonCoffe.onclick = b;
function b() {
  clear();
  const allElements = document.querySelectorAll(".coffee");
  allElements.forEach((element) => {
    element.style.display = "flex";
  });
}
//Tea button

const buttonTea = document.querySelector(".tea");

buttonTea.onclick = c;
function c() {
  clear();
  const allElements = document.querySelectorAll(".tea");
  allElements.forEach((element) => {
    element.style.display = "flex";
  });
}
//coctail button
const buttonCoctail = document.querySelector(".coctail");

buttonCoctail.onclick = d;
function d() {
  clear();
  const allElements = document.querySelectorAll(".coctail");
  allElements.forEach((element) => {
    element.style.display = "flex";
  });
}

//cakes button

const buttonCakes = document.querySelector(".cakes");

buttonCakes.onclick = e;
function e() {
  clear();
  const allElements = document.querySelectorAll(".cakes");
  allElements.forEach((element) => {
    element.style.display = "flex";
  });
}
