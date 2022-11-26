function fetchGames() {
	return fetch('https://api.rawg.io/api/games?key=a3c8d2a979da4298a948094832a174f3&page_size=8')
		.then(function (response) {
			return response.json();
		})
		.then(function (games) {
			return games.results
		})
}

function fetchDevelopers() {
	return fetch('https://api.rawg.io/api/developers?key=a3c8d2a979da4298a948094832a174f3&page_size=3')
		.then(function (response) {
			return response.json();
		})
		.then(function (developers) {
			return developers.results
		})
}

function fetchPlatforms() {
	return fetch('https://api.rawg.io/api/platforms?key=a3c8d2a979da4298a948094832a174f3&page_size=3')
		.then(function (response) {
			return response.json();
		})
		.then(function (platforms) {
			return platforms.results
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

function renderDevelopers(developers) {
	let containerDevelopers = document.getElementById("js-container-developers")
	let generalTemplate = ''
	for (let i = 0; i < developers.length; i++) {
		const name = developers[i].name
		const image = developers[i].image_background
		const topgames = developers[i].games
		const id = developers[i].id
		generalTemplate += `<div class="grid-box">
		<h2>${name}</h2>
		<img class="img3" src="${image}" alt="Imagem">
		<h3>Principais Jogos:</h3>
		<ul class="menu-game">
				<li>
						<p>${topgames[0].name}</p>
				</li>
				<li>
						<p>${topgames[1].name}</p>
				</li>
				<li>
						<p>${topgames[2].name}</p>
				</li>
		</ul>
		<a class="more" href="details-developers.html?id=${id}"><p>Mais detalhes...</p></a>
</div>`
	}
	containerDevelopers.insertAdjacentHTML("beforeend", generalTemplate)
}

function renderPlatforms(platforms) {
	let containerPlatforms = document.getElementById("js-container-platforms")
	let generalTemplate = ''
	for (let i = 0; i < platforms.length; i++) {
		const name = platforms[i].name
		const image = platforms[i].image_background
		const gamename = platforms[i].games
		const id = platforms[i].id

		generalTemplate += `<div class="grid-box">
		<h2>${name}</h2>
		<img class="img3" src="${image}" alt="Imagem">
		<h3>Principais Jogos:</h3>
		<ul class="menu-game">
				<li>
						<p>${gamename[0].name}</p>
				</li>
				<li>
						<p>${gamename[1].name}</p>
				</li>
				<li>
						<p>${gamename[2].name}</p>
				</li>
		</ul>
		<a class="more" href="details-platforms.html?id=${id}"><p>Mais detalhes...</p></a>
</div>`
	}
	containerPlatforms.insertAdjacentHTML("beforeend", generalTemplate)
}

function fetchDestaque() {
	return fetch(`https://api.rawg.io/api/games/28?key=a3c8d2a979da4298a948094832a174f3&page_size=1`)
		.then(function (response) {
			return response.json();
		})
		.then(function (destaque) {
			return destaque
		})
}

function renderDestaque(destaque) {
	let containerDestaque = document.getElementById("destaque")
	let generalTemplate = ''
	const name = destaque.name
	const image = destaque.background_image
	const about = destaque.description
	const rating = destaque.rating
	const releasedDate = new Date(destaque.released + "T00:00")
	const released = new Intl.DateTimeFormat('pt-BR').format(releasedDate)
	let developers = ""
	for (let i = 0; i < destaque.developers.length; i++) {
		developers += destaque.developers[i].name + ", "
	}
	let genres = ""
	for (let i = 0; i < destaque.genres.length; i++) {
		genres += destaque.genres[i].name + ", "
	}

	let platforms = ""
	for (let i = 0; i < destaque.platforms.length; i++) {
		platforms += destaque.platforms[i].platform.name + ", "
	}
	generalTemplate += `<div class="container">
	<h1 id="destaques">Destaques</h1>
	<div class="videotexto">
		<div class="video">
			<img src="${image}" alt="">
		</div>
		<div class="text">
			<h2>${name}</h2>
			<p><b>Sobre:</b> ${about}
			</p>
			<p><b>Publishers:</b> ${developers}</p>
			<p><b>Lançamento:</b> ${released}</p>
			<p><b>Plataformas:</b> ${platforms}
			</p>
			<p><b>Gêneros:</b> ${genres}</p>
			<p><b>Avaliação: ${rating}</b></p>
		</div>
	</div>
</div>
	`
	containerDestaque.insertAdjacentHTML("beforeend", generalTemplate)
}

window.onload = function () {
	fetchGames().then(renderGames)
	fetchDevelopers().then(renderDevelopers)
	fetchPlatforms().then(renderPlatforms)
	fetchDestaque().then(renderDestaque)

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