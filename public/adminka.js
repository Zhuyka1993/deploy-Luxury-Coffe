function krestik() {
  let sec = document.querySelector(".section");
  sec.style = "display:none";
}

function sendDataToServer(title, description, type, price, image) {
  const data = new FormData();
  data.append("image", image);
  data.append("title", title);
  data.append("description", description);
  data.append("type", type);
  data.append("price", price);

  fetch("https://luxure-coffee-2113161d1421.herokuapp.com/products", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: data,
  })
    .then((data) => {
      console.log("Дані успішно відправлені на сервер");
      //виклик функції, що оновлює дом при додаванні нового елементу
      updateDinamic();
      // Додаткові дії при успішній відправці
    })
    .catch((error) => {
      console.error("Помилка при відправці даних:", error);
    });
}
//function that dinamycly show new element after you add it
function updateDinamic() {
  fetch("https://luxure-coffee-2113161d1421.herokuapp.com/products")
    .then((response) => response.json())
    .then((data) => {
      const lastElement = data.length - 1;
      // Проходження через отримані дані
      for (let i = 0; i < 1; i++) {
        const type = document.querySelector('select[name="type"]');

        //Створення динамічного контенту:
        const contentDiv = document.querySelector(".content");
        const newDiv = document.createElement("div");
        newDiv.className =
          "boxContent " + "unic" + i + " " + data[lastElement].type;

        // Створення елементів для відображення контенту
        const titleElement = document.createElement("span");
        titleElement.className = "titleContent";
        titleElement.textContent = data[lastElement].title;

        // Creating element for showing price
        const price = document.createElement("span");
        price.className = "price";
        price.textContent = "Ціна:" + data[lastElement].price + " грн.";

        const descriptionSpan = document.createElement("span");
        descriptionSpan.className = "descriptionContent";
        descriptionSpan.textContent = data[lastElement].description;

        const imgElement = document.createElement("img");
        imgElement.src = "https://luxure-coffee-2113161d1421.herokuapp.com/" + data[lastElement].image; // Встановлення src для зображення
        imgElement.className = "imageContent"; // Встановлення класу

        const delBtn = document.createElement("button");
        delBtn.textContent = "del";

        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.className = "editButton";

        //create container for button "del and edit"
        const parrentBtn = document.createElement("div");
        parrentBtn.className = "parrentBtn";
        parrentBtn.appendChild(editBtn);
        parrentBtn.appendChild(delBtn);

        // Додавання елементів до нового діву
        newDiv.appendChild(imgElement); // Додавання зображення до newDiv
        newDiv.appendChild(parrentBtn);
        newDiv.appendChild(titleElement);
        newDiv.appendChild(descriptionSpan);
        newDiv.appendChild(price);

        // Додавання нового діву до вмісту
        contentDiv.appendChild(newDiv);
        //onclick on delbtn
        for (let i = 0; i < data.length; i++) {
          delBtn.addEventListener("click", (e) => {
            // відправити фетчом на делейт айді data[i].id

            const xhr = new XMLHttpRequest();
            // -----------------------------------------------
            xhr.open(
              "DELETE",
              "https://luxure-coffee-2113161d1421.herokuapp.com/products/" +
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
        }
      }
    })
    .catch((error) => console.error("Помилка JSON:", error));
}

const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", pop);

function pop() {
  let sec = document.querySelector(".section");
  sec.style = "display:block";
  const btnAdd = document.querySelector(".btnAdd");
  btnAdd.style.display = "block";
  const saveBtn = document.querySelector(".btnSave");
  saveBtn.style.display = "none";

  // get data from inputs
  const getAddBtn = document.getElementsByClassName("btnAdd")[0];

  getAddBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    // Отримати доступ до елемента select за допомогою його name або іншого атрибуту
    const type = document.querySelector('select[name="type"]').value;

    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const price = document.getElementById("priceInput").value;
    // Передача URL-адреси зображення, якщо вона є
    const image = document.getElementById("imageInput").files[0];

    // Відправка даних на сервер
    sendDataToServer(title, description, type, price, image);
    const btnAdd = document.querySelector(".btnAdd");
    btnAdd.style.display = "block";
    const saveBtn = document.querySelector(".btnSave");
    saveBtn.style.display = "none";
    document.querySelector(".section").style = "display:none";
  });
}

// Функція едіту
function updateProductToServer(id, title, description, type, price, image) {
  const data = new FormData();
  if (image) data.append("image", image);
  data.append("title", title);
  data.append("description", description);
  data.append("type", type);
  data.append("price", price);

  fetch(`https://luxure-coffee-2113161d1421.herokuapp.com/products/${id}`, {
    method: "PATCH",
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Дані продукту оновлено");
      } else {
        console.error("Помилка при оновленні даних:", response.status);
      }
    })
    .catch((error) => {
      console.error("Помилка при оновленні даних:", error);
    });
}

//Функція едіту

function editProduct(e, id) {
  const productDiv = e.target.closest(".boxContent");
  const title = productDiv.querySelector(".titleContent").textContent;
  const description = productDiv.querySelector(
    ".descriptionContent"
  ).textContent;
  const price = productDiv
    .querySelector(".price")
    .textContent.replace("Ціна:", "")
    .replace(" грн.", "");
  const type = productDiv.className.split(" ").pop();

  document.querySelector(".section").style.display = "block";
  document.getElementById("titleInput").value = title;
  document.getElementById("descriptionInput").value = description;
  document.querySelector('select[name="type"]').value = type;
  document.getElementById("priceInput").value = price;

  const btnAdd = document.querySelector(".btnAdd");
  btnAdd.style.display = "none";
  const saveBtn = document.querySelector(".btnSave");
  saveBtn.style.display = "block";

  saveBtn.addEventListener(
    "click",
    () => {
      krestik();
      const updatedTitle = document.getElementById("titleInput").value;
      const updatedDescription =
        document.getElementById("descriptionInput").value;
      const updatedType = document.querySelector('select[name="type"]').value;
      const updatedPrice = document.getElementById("priceInput").value;
      const updatedImage = document.getElementById("imageInput").files[0];

      updateProductToServer(
        id,
        updatedTitle,
        updatedDescription,
        updatedType,
        updatedPrice,
        updatedImage
      );

      document.querySelector(".section").style.display = "none";
      btnAdd.style.display = "block";
      saveBtn.style.display = "none";
    },
    { once: true }
  );
}
