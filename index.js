const searchBar = document.querySelector(".search-field")
const searchBtn = document.querySelector(".search-btn")
const movieFeedContainer = document.querySelector(".bottom-div")
let movies = [] // only holds movies loaded from search input

searchBtn.addEventListener("click", () => {
    const searchInput = searchBar.value
    movieFeedContainer.classList.remove("blank")
    movieFeedContainer.innerHTML = "<div class='movie-feed'></div>"
    movies = []

    fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=162c08a4`)
        .then(res => res.json())
        .then(async data => {
            for (let [index, movie] of data.Search.entries()){
                const movieRes = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=162c08a4`)
                const movieData = await movieRes.json()

                document.querySelector(".movie-feed").innerHTML += generateMovieHtml(movieData, index)
                movies.push(movieData)
            }
        })
        .catch(error => {
            movieFeedContainer.classList.add("blank")
            movieFeedContainer.innerHTML = `
            <p class="blank-feed-text">Unable to find what you're looking for. Please try another search.</p>
            `
            return
        })
    
    document.querySelector(".bottom-div").addEventListener("click", (event) => {
        if (event.target.classList.contains("watchlist-btn")) {
            // retreives watchlist array from local storage or creates new one (if local storage is empty)
            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
            
            // add new movie to watchlist
            watchlist.push(movies[event.target.id])

            // update local storage w/ new list
            localStorage.setItem("watchlist", JSON.stringify(watchlist))
        }
    });
})

function generateMovieHtml({Poster, Title, imdbRating, Runtime, Genre, Plot}, index){
    
    return `
    <div class="movie">
        <img src="${Poster}" alt="" class="movie-poster">
        <div class="movie-details">
            <div class="movie-header">
                <h2 class="movie-title">${Title}</h2>
                <p><i class="fa-solid fa-star star-icon"></i>${imdbRating}</p>
            </div>
            <div class="movie-specs">
                <p class="duration">${Runtime}</p>
                <p class="genre">${Genre}</p>
                <button class="watchlist-btn" id="${index}"><i class="fa-solid fa-circle-plus add-icon"></i>Watchlist</button>
            </div>
            <p class="movie-blurb">${Plot}</p>
        </div>
    </div>
    `
}