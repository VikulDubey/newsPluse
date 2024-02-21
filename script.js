const API_Key = "6150c1a83fcf499296cef1f952fd9c8e";
// Search on keyword

const newsSection = document.querySelector(".newsSection");
const inputBox = document.querySelector("#inputBox");
const searchBtn = document.querySelector("#searchBtn");
const ipl = document.querySelector("#ipl");
const bollywood = document.querySelector("#bollywood");
const politics = document.querySelector("#politics");
const xmark = document.querySelector(".fa-xmark");
const ul = document.querySelector("nav ul");

ipl.addEventListener("click", () => {
  newsSection.innerHTML = "";
  getData("ipl");
});
bollywood.addEventListener("click", () => {
  newsSection.innerHTML = "";
  getData("bollywood");
});
politics.addEventListener("click", () => {
  newsSection.innerHTML = "";
  getData("politics");
});
searchBtn.addEventListener("click", () => {
  const userInput = inputBox.value;
  console.log(userInput);
  if (userInput === "" || userInput === undefined || userInput === null) {
  } else {
    newsSection.innerHTML = "";
    getData(userInput);
  }
  inputBox.value = "";
});

async function getData(query) {
  const URL = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=popularity&apiKey=6150c1a83fcf499296cef1f952fd9c8e`;
  const response = await fetch(URL);
  const data = await response.json();
  const arrayOfArticles = data.articles;
  console.log(arrayOfArticles);
  arrayOfArticles.forEach((article) => {
    if (!(article.urlToImage === null)) {
      newsSection.innerHTML += `<div class="newsCard">
  <img src="${article.urlToImage}" onerror = "defaultImg" alt="${
        article.title
      }">
  <div class="content">
      <h2>${article.title}</h2>
      <p>${article.publishedAt}</p>
      <p>${addDots(article.description, 90)}</p>
  </div>
  <a href="${article.url}" target = "_blank">Read more</a>
  </div>`;
    }
  });
}

getData("ipl");

function addDots(string, limit) {
  let dots = "...";
  let newString;
  if (string.length > limit) {
    newString = string.substring(0, limit) + dots;
  } else {
    newString = string;
  }
  return newString;
}

const defaultImg = () => {
  const defaultURL = "./images/defaultNews.jpg";
  img.src = defaultURL;
  img.alt = "default";
};

xmark.addEventListener("click", () => {
  if (xmark.classList.contains("fa-xmark")) {
    ul.classList.add("hideNavLinks");
    xmark.classList.remove("fa-xmark");
    xmark.classList.add("fa-bars");
  } else {
    xmark.classList.add("fa-xmark");
    xmark.classList.remove("fa-bars");
    ul.classList.remove("hideNavLinks");
  }
});
