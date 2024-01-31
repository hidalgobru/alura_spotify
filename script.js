//iniciar a API local: json-server --watch api-artists/artists.json

const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))

}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {  // Se o campo de busca estiver vazio, vamos esconder a div de resultados de artistas e mostrar a de playlists
        mostrarResultPlaylist(true);
        mostrarResultArtists(false);
    } else {
        mostrarResultPlaylist(false);
        mostrarResultArtists(true);

        // Vamos fazer a requisição para a API apenas quando houver texto no campo de busca
        requestApi(searchTerm);
    }
});

function mostrarResultPlaylist(mostrar) {
    if (mostrar) {
        resultPlaylist.classList.remove('hidden');
    } else {
        resultPlaylist.classList.add('hidden');
    }
}

function mostrarResultArtists(mostrar) {
    if (mostrar) {
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden');
    }
}

