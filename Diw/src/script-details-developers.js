function fetchDeveloper(developerId) {
  return fetch(`https://api.rawg.io/api/developers/${developerId}?key=a3c8d2a979da4298a948094832a174f3&page_size=8`)
    .then(function (response) {
      return response.json();
    })
    .then(function (developer) {
      return developer
    })
}

function renderDeveloper(developer) {
  let containerDeveloper = document.getElementById("js-container-details")
  let generalTemplate = ''
  const name = developer.name
  const image = developer.image_background
  const about = developer.description
  const gamesCount = developer.games_count
  generalTemplate += `<div class="details">
  <div class="container">
    <div class="title">
  <h1>Detalhes</h1>
</div>
  <div class="content">
    <img class="img" src="${image}" alt="">
    <div class="text">
    <p><b>Nome:</b> ${name}</p>
    <p><b>Sobre:</b> ${about}</p>
    <p><b>Quantidade de Jogos:</b> ${gamesCount}</p>
  </div>
  </div>
</div>
</div>`
  containerDeveloper.insertAdjacentHTML("beforeend", generalTemplate)
}

window.onload = function () {
  window.location.search
  const params = new URLSearchParams(window.location.search)
  const developerId = params.get('id')
  fetchDeveloper(developerId).then(renderDeveloper)

  window.location.search
  const param = new URLSearchParams(window.location.search)
  const searchId = param.get('search')
  fetchGames(searchId).then(renderGames)
  document.getElementById("search-bar").onchange = function () { pegarValor() };
  function pegarValor() {
    var x = document.getElementById("search-bar");
    x.value = x.value.toLowerCase()
    window.location.href = `search.html?search=${x.value}`;
  }
}

function home() {
  window.location.href = `index.html`;
}