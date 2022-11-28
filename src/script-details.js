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
	var meta = game.metacritic ? game.metacritic : "0"

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
			 <div id="rating" class="rating"><p>${meta}</p></div>
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
	colorRating(meta)
}

window.onload = function () {
	document.getElementById("search-bar").onchange = function () { pegarValor() };
	function pegarValor() {
		var x = document.getElementById("search-bar");
		window.location.href = `search.html?search=${x.value}`;
	}
	window.location.search
	const params = new URLSearchParams(window.location.search)
	const gameId = params.get('id')
	fetchGame(gameId).then(renderGame)
	fetchPlatform(platformId).then(renderPlatform)


}

function home() {
	window.location.href = `index.html`;
}

function colorRating(meta) {
	const metas = document.getElementsByClassName("rating")
	for (let i = 0; i < metas.length; i++) {
		const meta = parseInt(metas[i].children[0].outerText)

		if (meta >= 90) {
			metas[i].style.backgroundColor = "#006B3D";
		}

		else if (meta >= 80) {
			metas[i].style.backgroundColor = "#639754";
		}

		else if (meta >= 70) {
			metas[i].style.backgroundColor = "#7BB662";
		}

		else if (meta >= 60) {
			metas[i].style.backgroundColor = "#FFD301";
		}

		else if (meta >= 50) {
			metas[i].style.backgroundColor = "#E03C32";
		}

		else if (meta >= 1) {
			metas[i].style.backgroundColor = "red";
		}

		else if (meta == 0) {
			metas[i].style.backgroundColor = "#000000";
		}
	}
}