async function getTrendingMoviesPreview() {
    const res = await fetch ('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY);
    const data = await res.json(); // en data me quedan guardados todos los valores de la repsuesta de la api

    const movies = data.results;
    movies.forEach(movie => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        const trendingPreviewMovieContainer = document.querySelector('#trendingPreview .trendingPreview-movieList') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
        const movieContainer = document.createElement('div'); //creo un div para almacenar
        movieContainer.classList.add('movie-container'); //hago que le agregue la clase al div

        const movieImg = document.createElement('img'); // creo la imagen 
        movieImg.classList.add('movie-img'); // creo la clase de la imagen
        movieImg.setAttribute('alt', movie.title) // Primero se pone el atributo que deseo y luego el valor
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path) //creo el srcc y pongo la direccion de src para el poster

        // aca los empiezo a adicionar
        movieContainer.appendChild(movieImg);  
        trendingPreviewMovieContainer.appendChild(movieContainer); 
    });
    

}
getTrendingMoviesPreview();     