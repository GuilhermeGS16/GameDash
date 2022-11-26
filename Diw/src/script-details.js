function fetchGame(gameId) {
	return fetch(`https://api.rawg.io/api/games/${gameId}?key=a3c8d2a979da4298a948094832a174f3&page_size=8`)
		.then(function (response) {
			return response.json();
		})
		.then(function (game) {
			return game
		})
}

function renderGame(game) {
	let containerGame = document.getElementById("js-container-details")
	let generalTemplate = ''
	const name = game.name
	const image = game.background_image
	const about = game.description
	const rating = game.rating
	const releasedDate = new Date(game.released + "T00:00")
	const released = new Intl.DateTimeFormat('pt-BR').format(releasedDate)

	let developers = ""
	for (let i = 0; i < game.developers.length; i++) {
		developers += game.developers[i].name + ", "
	}

	let genres = ""
	for (let i = 0; i < game.genres.length; i++) {
		genres += game.genres[i].name + ", "
	}

	let platforms = ""
	for (let i = 0; i < game.platforms.length; i++) {
		platforms += game.platforms[i].platform.name + ", "
	}

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
				<p><b>Publishers:</b> ${developers}</p>
				<p><b>Lançamento:</b> ${released}</p>
				<p><b>Plataformas:</b> ${platforms}</p>
				<p><b>Gêneros:</b> ${genres}</p>
				<p><b>Avaliação:</b> ${rating}</p>
			</div>
			</div>
		</div>
	</div>`

	containerGame.insertAdjacentHTML("beforeend", generalTemplate)
}

window.onload = function () {
	window.location.search
	const params = new URLSearchParams(window.location.search)
	const gameId = params.get('id')
	fetchGame(gameId).then(renderGame)
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