const BASE_URL = "https://mmo-games.p.rapidapi.com/games"

const gameTitle = document.getElementById("game_title")
const gameImg = document.querySelector("#game_thumbnail")
const gameDesc = document.querySelector("#game_description")
const gameGenre = document.querySelector("#game_genre")
const gamePlatform = document.querySelector("#game_platform")
const gameDeveloper = document.querySelector("#game_developer")
const releaseDate = document.querySelector("#release_date")
const userReview = document.querySelector("#user_review")
const formReview = document.querySelector("#review_form")
const inputReview = document.querySelector("#review")


const searchBar = document.querySelector("#searchBar")
const searchBarForm = document.querySelector("#search_bar_form")
const menu = document.querySelector("#myMenu")

const apiKey = config.api_key


document.addEventListener("DOMContentLoaded", fetchData)

//Function that fetches the api data and runs the function that displays a random game
function fetchData () {

fetch(BASE_URL+'?sort-by=alphabetical', {
    headers: {
        'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
        'x-rapidapi-key': apiKey
    }
})
.then(resp => resp.json())
.then(gamesData => {
    console.log(gamesData);
    (renderSomething(gamesData))
})
}

function renderSomething (data) {

    data.forEach((game) => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="#">${game.title}</a>`
        li.className = "game"
                li.id = game.title
        // function sort(ul) {
        //     let liArr = menu.children
        //     let arr = new Array()
        //     for (let i = 0; i < liArr.length; i++) {
        //         arr.push(liArr[i].innerText)
        //     }
        //     arr.sort()
        //     arr.forEach(function(content, index) {
        //         liArr[index].innerHTML = `<a href="#">${content}</a>`;
        //     })
        // }
        
        // sort("list")
        li.addEventListener(`click`, (e) => {
            e.preventDefault()
            gameTitle.textContent = game.title
            gameImg.src = game.thumbnail
                 gameImg.alt = game.title
                 //Makes the image clickable and opens a new tab to the game page
                 gameImg.addEventListener("click", () => openImageLink(game))
            gameDesc.textContent = game.short_description
            gameGenre.textContent = "Genre: "+game.genre
            gamePlatform.textContent = "Platform: "+game.platform
            gameDeveloper.textContent = "Developer: "+game.developer
            releaseDate.textContent = "Release Date: "+game.release_date
            gameImg.dataset.url = game.game_url
        })
        menu.append(li)
    })
    //Random Number generator that randomly selects a game Id
    let randomId = Math.floor(Math.random() * (369))
    //Takes the random Number and sets all the data on the page accordingly
    gameTitle.textContent = data[randomId].title
    gameImg.src = data[randomId].thumbnail
         gameImg.alt = data[randomId].title
         gameImg.href = "#"
         gameImg.dataset.url = data[randomId].game_url
         gameImg.addEventListener('click', openImageLink)
         //Makes the image clickable and opens a new tab to the game page
         //gameImg.addEventListener("click", () => openImageLink(data[randomId]),
         //{signal: abortController.signal}
         //)
    gameDesc.textContent = data[randomId].short_description
    gameGenre.textContent = "Genre: "+data[randomId].genre
    gamePlatform.textContent = "Platform: "+data[randomId].platform
    gameDeveloper.textContent = "Developer: "+data[randomId].developer
    releaseDate.textContent = "Release Date: "+data[randomId].release_date
}

function openImageLink(event){
    window.open(event.target.dataset.url)
}
//Function that opens a new tab on the image
//function openImageLink (imageLink) {
  //  window.open(imageLink.game_url)
//}

searchBarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchRequest = document.querySelector("#mySearch").value
    fetch(BASE_URL, {
        headers: {
            'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    })
    .then(resp => resp.json())
    .then(gamesData => {
        let result = gamesData.find(gamesData => gamesData.title === searchRequest) 
        console.log(result);
        
        //Set game info so it matches the game searched
        gameTitle.textContent = result.title
        gameImg.src = result.thumbnail
        gameImg.alt = result.title
        gameDesc.textContent = result.short_description
        gameGenre.textContent = "Genre: "+result.genre
        gamePlatform.textContent = "Platform: "+result.platform
        gameDeveloper.textContent = "Developer: "+result.developer
        releaseDate.textContent = "Release Date: "+result.release_date
        gameImg.dataset.url = result.game_url
        
    })
// .catch(console.log("Game not found!"))
// e.target.reset()
})

function myFunction() {
    // Declare letiables
    let input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  formReview.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    const formValue = document.createElement('li')
    formValue.id = "singleComment"
    formValue.textContent = inputReview.value;
    userReview.append(formValue)
    e.target.reset()


}
//Just having fun
const adTisement = document.querySelector("#addy")

adTisement.addEventListener('click', goToSource)

function goToSource (e) {
    window.open('https://www.snickers.com/')
}