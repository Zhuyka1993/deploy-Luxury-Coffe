window.onload = function () {
  addContent();
};


const port = "https://luxure-coffee-2113161d1421.herokuapp.com" || 3000;
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



        const descriptionSpan = document.createElement("span");
        descriptionSpan.className = "descriptionContent";
        descriptionSpan.textContent = data[i].description;

        // Перевірка наявності зображення
        if (data[i].image) {
          const imgElement = document.createElement("img");


          imgElement.src = `${port}/` + data[i].image; // Встановлення src для зображення

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

//function for change background video
function changeVideo(videoPath) {
  const videoSource = document.getElementById('video-source');
  videoSource.src = videoPath;

  // Перезавантажити відео, щоб нове джерело почало відтворюватися
  const video = document.getElementById('background-video');
  video.load();
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
  changeVideo('video/videoplayback.mp4');
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
  changeVideo('video/tea2.mp4');
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
  changeVideo('video/coctailCut.mp4');
    
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
  changeVideo('video/cakes.mp4');
}


// Burger menu 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => { 
  sections.forEach(sec => { 
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(link => { 
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
}

menuIcon.onclick = () => { 
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}
