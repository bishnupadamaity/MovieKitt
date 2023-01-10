const onlineLoader = document.querySelector(".onlineLoader");
const fetchButton = document.getElementById("fetch");
const offlineLoader = document.querySelector(".offlineLoader");
const notFound = document.querySelector(".notFound");

window.addEventListener('online', function () {
    onlineLoader.style.display = 'block';
})

var online = navigator.onLine;
if (online == false) {
    offlineLoader.style.display = 'block';
    onlineLoader.style.display = 'none';
} else {
    offlineLoader.style.display = 'none';
}
function notfound() {
    notFound.style.display = 'none';
}
function getFormData() {

    const form = document.querySelector("#myForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    let movieDetails = {
        name: "0",
        year: "0"
    };

    movieDetails.name = document.getElementById("movie-title").value;
    movieDetails.year = document.getElementById("released-year").value;
    if (!(movieDetails.year).includes(Number)) {
        movieDetails.year = "NA"
    }


    // Before submitting form details 
    if (movieDetails.name == 0) {

        const Random_Movies = [
            'Iron Man',
            'The Incredible Hulk',
            'Iron Man 2',
            'Thor',
            'Captain America: The First Avenger',
            'The Avengers',
            'Iron Man 3',
            'Thor: The Dark World',
            'Captain America: The Winter Soldier',
            'Guardians of the Galaxy',
            'Avengers: Age of Ultron',
            'Ant-Man',
            'Captain America: Civil War',
            'Doctor Strange',
            'Guardians of the Galaxy Vol. 2',
            'Spider-Man: Homecoming',
            'Thor: Ragnarok',
            'Black Panther',
            'Avengers: Infinity War',
            'Ant-Man and the Wasp',
            'Captain Marvel',
            'Avengers: Endgame',
            'Spider-Man: Far From Home',
            'Jurassic World',
            'Furious 7',
            'Minions',
            'Jurassic Park',
            'Despicable Me 2',
            'The Secret Life of Pets',
            'The Fate of the Furious',
            'E.T. the Extra-Terrestrial',
            'Fast & Furious 6',
            'Sing',
            'Fast Five',
            'The Lost World: Jurassic Park',
            'Mamma Mia!',
            'Fifty Shades of Grey',
            'King Kong',
            'Ted',
            'Despicable Me',
            'Meet the Fockers',
            'Bruce Almighty',
            'Jaws',
            'Lucy',
            'The Bourne Ultimatum',
            'Les Miserables',
            'Warcraft',
            'The Mummy Returns',
            'The Mummy',
            'Jason Bourne',
            'The Mummy: Tomb of the Dragon Emperor',
            'Snow White and the Huntsman',
            'Back to the Future',
        ]
        let randomNumber = Math.floor(Math.random() * 52);
        movieDetails.name = Random_Movies[randomNumber];
        movieDetails.year = "NA";
    }
    document.getElementById("movie-title").value = "";
    document.getElementById("released-year").value = "";
    return movieDetails;
};

const buildRequestUrl = (requestData) => {

    let url = "";
    if (requestData.year == "NA") {

        // without year
        url = `http://www.omdbapi.com/?t=${requestData.name}&apikey=76092b20`;
    } else {

        //year
        url = `http://www.omdbapi.com/?t=${requestData.name}&y=${requestData.year}&apikey=76092b20`;
    }

    return url;
};

const movieData = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    const movie = await response.json();

    console.log(movie);
    console.log(movie.Response);
    if (movie.Response === "False") {


        notFound.style.display = 'block';
    } else {
        document.querySelector(".Title").innerHTML = `Title:  ${movie.Title}`;
        document.querySelector(".Rating").innerHTML = `Rating:  ${movie.imdbRating}`;
        document.querySelector(".Released").innerHTML = `Released:  ${movie.Released}`;
        document.querySelector(".Language").innerHTML = `Language:  ${movie.Language}`;
        document.querySelector(".Actors").innerHTML = `Actors:  ${movie.Actors}`;
        document.querySelector(".Director").innerHTML = `Director:  ${movie.Director}`;
        document.querySelector(".Plot").innerHTML = `Plot:  ${movie.Plot}`;

        document.getElementById("movie-banner").src = movie.Poster;

        onlineLoader.style.display = 'none';
    }





};

// Driver
const ProcessMovieRequest = async () => {
    const requestData = getFormData();
    const requestUrl = buildRequestUrl(requestData);
    await movieData(requestUrl);
};
ProcessMovieRequest();
