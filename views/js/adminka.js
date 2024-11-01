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


  fetch(`https://luxury-coffee.up.railway.app/products`, {

    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: data,
  })
    .then((data) => {
      console.log("Дані успішно відправлені на сервер");
      //виклик функції, що оновлює дом при додаванні нового елементу
      // updateDinamic();
      // Додаткові дії при успішній відправці
    })
    .catch((error) => {
      console.error("Помилка при відправці даних:", error);
    });
}
//function that dinamyc show new element after you add it
function updateDinamic(data) {



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

    const imgElement = document.createElement("img");
    imgElement.src = `${port}/` + data[i].image; // Встановлення src для зображення

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

    editBtn.addEventListener("click", (e) => {
      console.log(data[i]._id);
      editProduct(e, data[i]._id);
    });
  }
  // })
  // .catch((error) => console.error("Помилка JSON:", error));
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

// Функція едіту з серверу
async function updateProductToServer(
  id,
  title,
  description,
  type,
  price,
  image
) {
  const data = new FormData();
  if (image) data.append("image", image);
  data.append("title", title);
  data.append("description", description);
  data.append("type", type);
  data.append("price", price);



  let response = await fetch(`${port}/products/${id}`, {
    method: "PATCH",
    body: data,
  });

  if (response.ok) {
    let json = await response.json();
    const updatedShopData = shopData.map((el) =>
      el._id == id ? { ...el, ...json } : el
    );
    shopData = updatedShopData;

    const boxContent = document.getElementsByClassName("boxContent");

    [...boxContent].forEach((item) => {
      item.remove();
    });

    updateDinamic(updatedShopData);
  } else {
    console.error("Ошибка HTTP: " + response.status);
  }
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
