function fetchPlatform(platformId) {
  return fetch(`https://api.rawg.io/api/platforms/${platformId}?key=a3c8d2a979da4298a948094832a174f3&page_size=8`)
    .then(function (response) {
      return response.json();
    })
    .then(function (platform) {
      return platform
    })
}

function renderPlatform(platform) {
  let containerPlatform = document.getElementById("js-container-details")
  let generalTemplate = ''
  const name = platform.name
  const image = platform.image_background
  const about = platform.description
  const gamesCount = platform.games_count
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
  containerPlatform.insertAdjacentHTML("beforeend", generalTemplate)
}

window.onload = function () {
  window.location.search
  const params = new URLSearchParams(window.location.search)
  const platformId = params.get('id')
  fetchPlatform(platformId).then(renderPlatform)

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