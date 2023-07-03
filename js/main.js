import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://bailey-s-bites-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const movieListEl = document.getElementById("movie-list")

onValue(moviesInDB, function(snapshot) {
  let booksArray = Object.values(snapshot.val())
  
  clearMovieListEl()
  
  for (let i = 0; i < booksArray.length; i++) {
    let currentMovie = booksArray[i]    
    appendMovieListEl(currentMovie)
  }

})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearMovieListEl()
    push(moviesInDB, inputValue)
    clearInput()
})

function clearInput() {
   inputFieldEl.value = ""
}

function clearMovieListEl() {
    movieListEl.innerHTML = ""
}

function appendMovieListEl(listItem) {
   movieListEl.innerHTML += ` <li>${listItem}</li>`
}