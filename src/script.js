const gameTitle = document.getElementById("game_title")

fetch('https://www.mmobomb.com/api1/games')
.then(res => res.json())
.then(renderSomething)

function renderSomething (data) {
    gameTitle.textContent = data.title
}