const url = "http://www.omdbapi.com/?apikey=a7e8da44&";
const app = document.getElementById("app");
const modalWrapper = document.getElementById("modal-wrapper");
const modal = document.getElementById("modal");
let close = document.getElementById("close");
let resp;

async function getApi(uri){
  let response = await fetch((uri), {})
    .then(response => response.json());
  handleResponse(response);
}

const handleResponse = (response) => {
  console.log(response);
  resp = response;
  response.Search.forEach(movie => {
    createMovie(movie);
  });
}

const createMovie = (movie) => {

  let w = document.createElement("div");
  app.appendChild(w);
  w.classList.add("movie");
  let img = document.createElement("img");
  w.appendChild(img);
  img.classList.add("pic");
  img.src = movie.Poster;
  let text = document.createElement("div");
  w.appendChild(text);
  text.classList.add("text")
  let t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("title");
  t.innerText = movie.Title;
  t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("release");
  t.innerText = movie.Year;
  let btn = document.createElement("button")
  text.appendChild(btn);
  btn.classList.add("cta");
  btn.innerText = "voir plus";
  btn.addEventListener("click", (e) => {
  openModal(movie);
  })
}

async function openModal(movie) {
  modal.innerHTML = '<div class="close" id="close">+</div>';
  close = document.getElementById("close")
  modalWrapper.style.display = "flex";
  close.addEventListener("click", (e) => {
    closeModal()
  })
  modalWrapper.addEventListener("click", (e) => {
    closeModal()
  })
  let w = document.createElement("div");
  modal.appendChild(w);
  w.classList.add("wrapper")
  console.log(url + `i=${movie.imdbID}`);
  let response = await fetch((url + `i=${movie.imdbID}`), {})
    .then(response => response.json());
  console.log(response);
  let img = document.createElement("img")
  w.appendChild(img); 
  img.classList.add("pic");
  img.src = response.Poster;
  let text = document.createElement("div");
  w.appendChild(text);
  text.classList.add("text")
  let t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("title");
  t.innerText = response.Title;
  t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("release");
  t.innerText = response.Year;
  t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("plot");
  t.innerText = "synopsys : " + response.Plot;
  t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("director");
  t.innerText = "realisateurs : " + response.Director;
  t = document.createElement("div");
  text.appendChild(t);
  t.classList.add("actors");
  t.innerText ="acteurs : " + response.Actors;

}

const closeModal = () => {
  modalWrapper.style.display = "none";
}

document.getElementById("form").addEventListener("submit", (e) =>{
  e.preventDefault();
  console.log(url + `s=${e.target[0].value}`);
  getApi(url + `s=${e.target[0].value}`)
});