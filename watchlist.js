const watchlistContainer = document.querySelector(".bottom-div")
let watchlist = JSON.parse(localStorage.getItem("watchlist"))

// if local storage is not empty, render watchlist array to page
function renderWatchlist() {
    if (watchlist) {
        watchlistContainer.classList.remove("blank")
        watchlistContainer.innerHTML = "<div class='watchlist'></div>"
        
        let watchlistStr = ``
        for (let [index, {Poster, Title, imdbRating, Runtime, Genre, Plot}] of watchlist.entries()) {
            watchlistStr += `
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
                    <button class="watchlist-btn" id="${index}"><i class="fa-solid fa-circle-minus remove-icon"></i>Remove</button>
                </div>
                <p class="movie-blurb">${Plot}</p>
            </div>
        </div>
            `
        }
    
        document.querySelector(".watchlist").innerHTML = watchlistStr
    } else {
        watchlistContainer.classList.add("blank")
        watchlistContainer.innerHTML = `
            <p class="blank-main-text">Your watchlist is looking a little empty...</p>
            <a href="index.html" class="blank-subtext"><i class="fa-solid fa-circle-plus remove-icon"></i>Let's add some movies!</a>
        `
    }
}

renderWatchlist()

// remove movie from page + watchlist array > update local storage > re-render watchlist onto page
document.querySelector(".bottom-div").addEventListener("click", (event) => {
    if (event.target.classList.contains("watchlist-btn")) {
        watchlist.splice(event.target.id, 1)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        if (watchlist.length == 0) {
            localStorage.clear()
            watchlist = JSON.parse(localStorage.getItem("watchlist"))
        }
    }
    renderWatchlist()
})


