function fetchGames(loadGame) {
	return fetch(`https://api.rawg.io/api/games?key=a3c8d2a979da4298a948094832a174f3&page=${loadGame}&page_size=8`)
		.then(function (response) {
			return response.json();
		})
		.then(function (games) {
			return games.results
		})
}

function fetchDevelopers(loadDev) {
	return fetch(`https://api.rawg.io/api/developers?key=a3c8d2a979da4298a948094832a174f3&page=${loadDev}&page_size=3`)
		.then(function (response) {
			return response.json();
		})
		.then(function (developers) {
			return developers.results
		})
}

function fetchPlatforms(loadPlat) {
	return fetch(`https://api.rawg.io/api/platforms?key=a3c8d2a979da4298a948094832a174f3&page=${loadPlat}&page_size=3`)
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
		var rating = games[i].metacritic ? games[i].metacritic : "0"
		const releasedDate = new Date(games[i].released + "T00:00")
		const released = new Intl.DateTimeFormat('pt-BR').format(releasedDate)
		generalTemplate += `<div class="video2">
				<h2>${name}</h2>
				<div id="rating" class="rating"><p>${rating}</p></div>  
				<a href="details.html?id=${id}"><img class="img2" src="${image}" alt="Imagem"></a>
				<p>Lançamento: ${released}</p>
				<a href="details.html?id=${id}"><p>Mais detalhes...</p></a>
		</div>`
	}
	containerGames.insertAdjacentHTML("beforeend", generalTemplate)
	colorRating(rating)
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
		<a href="details-developers.html?id=${id}"><img class="img3" src="${image}" alt="Imagem"></a>
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
		<a href="details-platforms.html?id=${id}"><img class="img3" src="${image}" alt="Imagem"></a>
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
	const meta = destaque.metacritic ? destaque.metacritic : "0"
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
		<div id="rating" class="rating"><p>${meta}</p></div>
		<a href="details.html?id=28"><img class="img-destaque" src="${image}" alt="Imagem"></a>
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
	let loadGame = 8
	document.getElementById("loadGame").onclick = function load() {
		loadGame += 4
		fetchGames(loadGame).then(renderGames)
	}

	let loadDev = 6
	document.getElementById("loadDev").onclick = function load() {
		loadDev += 3
		fetchDevelopers(loadDev).then(renderDevelopers)
	}

	let loadPlat = 6
	document.getElementById("loadPlat").onclick = function load() {
		loadPlat += 3
		fetchPlatforms(loadPlat).then(renderPlatforms)
	}

	fetchGames(loadGame).then(renderGames)
	fetchDevelopers(loadDev).then(renderDevelopers)
	fetchPlatforms(loadPlat).then(renderPlatforms)
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

function wpp() {
	window.open("https://wa.me/5531987540482")
}

function insta() {
	window.open("https://www.instagram.com/gui_gs21/")
}

function face() {
	window.open("https://pt-br.facebook.com")
}

function colorRating() {
	const ratings = document.getElementsByClassName("rating")
	for (let i = 0; i < ratings.length; i++) {
		const rating = parseInt(ratings[i].children[0].outerText)

		if (rating >= 90) {
			ratings[i].style.backgroundColor = "#006B3D";
		}

		else if (rating >= 80) {
			ratings[i].style.backgroundColor = "#639754";
		}

		else if (rating >= 70) {
			ratings[i].style.backgroundColor = "#7BB662";
		}

		else if (rating >= 60) {
			ratings[i].style.backgroundColor = "#FFD301";
		}

		else if (rating >= 50) {
			ratings[i].style.backgroundColor = "#E03C32";
		}

		else if (rating >= 1) {
			ratings[i].style.backgroundColor = "red";
		}

		else if (rating == 0) {
			ratings[i].style.backgroundColor = "#000000";
		}
	}
}

