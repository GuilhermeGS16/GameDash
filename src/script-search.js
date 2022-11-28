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
    var rating = games[i].metacritic ? games[i].metacritic : "0"

    generalTemplate += `<div class="video2">
				<h2>${name}</h2>
        <div id="rating" class="rating"><p>${rating}</p></div>  
				<a href="details.html?id=${id}"><img class="img2" src="${image}" alt="Imagem"></a>
				<a href="details.html?id=${id}"><p>Mais detalhes...</p></a>
		</div>`
  }
  containerGames.insertAdjacentHTML("beforeend", generalTemplate)
  colorRating(rating)
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

