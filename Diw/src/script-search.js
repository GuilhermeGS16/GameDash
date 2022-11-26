function fetchGames(searchId) {
  return fetch(`https://api.rawg.io/api/games?key=a3c8d2a979da4298a948094832a174f3&page_size=100&search=${searchId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (games) {
      return games.results
    })
}

function renderGames(games) {
  let containerGames = document.getElementById("js-container-games")
  let generalTemplate = ''
  for (let i = 0; i < games.length; i++) {
    const name = games[i].name
    const image = games[i].background_image
    const id = games[i].id
    generalTemplate += `<div class="video2">
				<h2>${name}</h2>
				<img class="img2" src="${image}" alt="Imagem">
				<a href="details.html?id=${id}"><p>Mais detalhes...</p></a>
		</div>`
  }
  containerGames.insertAdjacentHTML("beforeend", generalTemplate)
}


window.onload = function () {
  window.location.search
  const params = new URLSearchParams(window.location.search)
  const searchId = params.get('search')
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
