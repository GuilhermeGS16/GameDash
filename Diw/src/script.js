function fetchGames() {
	return fetch('https://api.rawg.io/api/games/?key=a3c8d2a979da4298a948094832a174f3&page_size=8')
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
		generalTemplate += `<div class="video2">
				<h2>${name}</h2>
				<img class="img2" src="${image}" alt="Imagem">
				<a href="detalhes.html"><p>Mais detalhes...</p></a>
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
		<a class="more" href="detalhes.html?id=665"><p>Mais detalhes...</p></a>
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
		<a class="more" href="detalhes.html"><p>Mais detalhes...</p></a>
</div>`
	}
	containerPlatforms.insertAdjacentHTML("beforeend", generalTemplate)
}



window.onload = function () {
	fetchGames().then(renderGames)
	fetchDevelopers().then(renderDevelopers)
	fetchPlatforms().then(renderPlatforms)
}

/*
	Armazenar o elemento do container em uma variavel (document.get...)
	Criar uma variável para armazenar as templates strings
	Montar um for para cada item você jogar um vídeo dentro da template string
		let generalTemplate = ''
		for (games)
			let gameItem = games[i]
			generalTemplate += '
				[...]
			'
	Pegar o generalTemplate e renderizar dentro do container (insertAdjacent)
*/
