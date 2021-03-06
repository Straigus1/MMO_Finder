const BASE_URL = "https://mmo-games.p.rapidapi.com/games"
const apiKey = config.api_key

// Function for querySelector
function qs(query) {
    return document.querySelector(query)
}
const gameTitle = qs("#game_title")
const gameImg = qs("#game_thumbnail")
const gameDesc = qs("#game_description")
const gameGenre = qs("#game_genre")
const gamePlatform = qs("#game_platform")
const gameDeveloper = qs("#game_developer")
const releaseDate = qs("#release_date")
const userReview = qs("#user_review")
const formReview = qs("#review_form")
const inputReview = qs("#review")


const searchBar = qs("#searchBar")
const searchBarForm = qs("#search_bar_form")
const menu = qs("#myMenu")

const filterbutton = qs("#filters")
const filtersList = qs(".filtersList")
const filterReset = qs("#reset")


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
// Refactored image click/link/new tab into one function
function imageClickableNewTab(game) {
        const li = document.createElement("li")
        li.innerHTML = `<a href="#">${game.title}</a>`
        li.className = "game"
                li.id = game.title
        li.addEventListener(`click`, (e) => {
            e.preventDefault()
            gameTitle.textContent = game.title
            gameImg.src = game.thumbnail
                 gameImg.alt = game.title
                 //Makes the image clickable and opens a new tab to the game page
                 gameImg.addEventListener("click", () => openImageLink(game))
            gameDesc.textContent = game.short_description
            gameGenre.textContent = game.genre
            gamePlatform.textContent = game.platform
            gameDeveloper.textContent = game.developer
            releaseDate.textContent = game.release_date
            gameImg.dataset.url = game.game_url
        })
        menu.append(li)

}
//Function that makes the list of games and makes each one interactive
function renderSomething (data) {
    data.forEach((game) => {
        imageClickableNewTab(game);
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
    gameGenre.textContent = data[randomId].genre
    gamePlatform.textContent = data[randomId].platform
    gameDeveloper.textContent = data[randomId].developer
    releaseDate.textContent = data[randomId].release_date
}
//Opens new game webpage
function openImageLink(event){
    window.open(event.target.dataset.url)
}
//If you type the whole game name in and submit it, it'll load it
searchBarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchRequest = qs("#mySearch").value
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
        gameGenre.textContent = result.genre
        gamePlatform.textContent = result.platform
        gameDeveloper.textContent = result.developer
        releaseDate.textContent = result.release_date
        gameImg.dataset.url = result.game_url
        
    })
e.target.reset()
})

function myFunction() {
    // Declare variables
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
//Event Listner for comment section
  formReview.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    const formValue = document.createElement('li')
    formValue.id = "singleComment"
    formValue.textContent = inputReview.value;
    userReview.append(formValue)
    e.target.reset()


}
//Filter Functionality
// console.log(filtersList.children)
filterbutton.addEventListener(`click`, () => {
    filtersList.toggleAttribute("hidden")
    filterReset.toggleAttribute("hidden")
})
    //All Filters Button functionality
filtersList.childNodes.forEach((filter) => {
 filter.addEventListener(`click`, () => {
     fetch(BASE_URL+`?category=${filter.id}&sort-by=alphabetical`, {
        headers: {
            'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    })
     .then(resp => resp.json())
     .then(genreData => {
         console.log(genreData)
         menu.replaceChildren();
         genreData.forEach((game) => {
            imageClickableNewTab(game);
        })
         
     })
 })
})
    //Reset button
filterReset.addEventListener("click", () => {
    menu.replaceChildren()
    fetch(BASE_URL+'?sort-by=alphabetical', {
        headers: {
            'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
            'x-rapidapi-key': apiKey 
    }})
    .then(resp => resp.json())
    .then(data => {
        data.forEach((game) => {
            imageClickableNewTab(game);
        })
    })
}
)

//Just having fun
const adTisement = qs("#addy")

adTisement.addEventListener('click', () => {
    window.open('https://www.snickers.com/')
}
)
const donateUs = qs('#donate')

donateUs.addEventListener('click', () => {
    window.open('https://make-some-noise.com/support-us/')
}
)
const flatironSchool = qs('#school')

flatironSchool.addEventListener('click', () => {
    window.open('https://flatironschool.com/')
})