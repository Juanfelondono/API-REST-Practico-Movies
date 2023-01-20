// CODIGO USANDO AXIOS

const api = axios.create ({
    baseURL: 'https://api.themoviedb.org/3/', //creo la url base 
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

//Utils

function createMovies(movies,container) { // creoe sta funcion para crear de una amnera ma simple,simpre recibo mubies y el contenedor donde desee agregarlo
    container.innerHTML = '';

    movies.forEach(movie => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        const movieContainer = document.createElement('div'); //creo un div para almacenar
        movieContainer.classList.add('movie-container'); //hago que le agregue la clase al div
        
        movieContainer.addEventListener('click',() => { // cada vez que le de click a una pelicula tendre el id 
            location.hash= '#movie=' + movie.id
        })
        const movieImg = document.createElement('img'); // creo la imagen 
        movieImg.classList.add('movie-img'); // creo la clase de la imagen
        movieImg.setAttribute('alt', movie.title) // Primero se pone el atributo que deseo y luego el valor
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path) //creo el srcc y pongo la direccion de src para el poster

        // aca los empiezo a adicionar
        movieContainer.appendChild(movieImg);  
        container.appendChild(movieContainer); 
    });   
}

function createCategories(categories,container) { 
    
    container.innerHTML = ""; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion

    categories.forEach(category => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
        
        const categoryContainer = document.createElement('div'); //creo un div para almacenar
        categoryContainer.classList.add('category-container'); //hago que le agregue la clase al div

        const categoryTitle = document.createElement('h3'); // creo el titulo h3
        categoryTitle.classList.add('category-title'); // creo la clase de al titulo
        categoryTitle.setAttribute('id', 'id'+ category.id); // Primero se pone el atributo que deseo y luego el valor
        categoryTitle.addEventListener('click', () => { // creo una funcion para cuando le den click se vaya a category al genero que deseo esto me manda al navegation
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        // aca los empiezo a adicionar
        categoryTitle.appendChild(categoryTitleText); //agrego al h3 el titulo que deseo
        categoryContainer.appendChild(categoryTitle); // agrego el h3 al div
        container.appendChild(categoryContainer); // agrego el div al artcule
    });      
}

// Llamados a la API

async function getTrendingMoviesPreview() {
    const {data} = await api ('trending/movie/day');

    //trendingPreviewMovieList.innerHTML = ""; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion
    const movies = data.results;
    createMovies(movies,trendingPreviewMovieList); // ya solo llamo a la funcion y limpio el codido de abajo 

    // movies.forEach(movie => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
    //     const trendingPreviewMovieList = document.querySelector('#trendingPreview .trendingPreview-movieList') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
    //     const movieContainer = document.createElement('div'); //creo un div para almacenar
    //     movieContainer.classList.add('movie-container'); //hago que le agregue la clase al div

    //     const movieImg = document.createElement('img'); // creo la imagen 
    //     movieImg.classList.add('movie-img'); // creo la clase de la imagen
    //     movieImg.setAttribute('alt', movie.title) // Primero se pone el atributo que deseo y luego el valor
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path) //creo el srcc y pongo la direccion de src para el poster

    //     // aca los empiezo a adicionar
    //     movieContainer.appendChild(movieImg);  
    //     trendingPreviewMovieList.appendChild(movieContainer); 
    // });   
};

async function getCategoriesPreview() {
    const { data } = await api ('genre/movie/list');
    
   // categoriesPreviewList.innerHTML = ""; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion

    const categories = data.genres;
    createCategories(categories, categoriesPreviewList); // cone sto remplazo el codigo de abajo 

    // categories.forEach(category => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        
    //     const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
        
    //     const categoryContainer = document.createElement('div'); //creo un div para almacenar
    //     categoryContainer.classList.add('category-container'); //hago que le agregue la clase al div

    //     const categoryTitle = document.createElement('h3'); // creo el titulo h3
    //     categoryTitle.classList.add('category-title'); // creo la clase de al titulo
    //     categoryTitle.setAttribute('id', 'id'+ category.id); // Primero se pone el atributo que deseo y luego el valor
    //     categoryTitle.addEventListener('click', () => { // creo una funcion para cuando le den click se vaya a category al genero que deseo esto me manda al navegation
    //         location.hash = `#category=${category.id}-${category.name}`;
    //     });
    //     const categoryTitleText = document.createTextNode(category.name);

    //     // aca los empiezo a adicionar
    //     categoryTitle.appendChild(categoryTitleText); //agrego al h3 el titulo que deseo
    //     categoryContainer.appendChild(categoryTitle); // agrego el h3 al div
    //     categoriesPreviewList.appendChild(categoryContainer); // agrego el div al artcule
    // });   
}

async function getMoviesByCategory(id) {
    const {data} = await api ('/discover/movie', {
        params: {
            with_genres: id,
        },
    });

    //genericSection.innerHTML = ""; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion
    
    const movies = data.results;
    createMovies(movies,genericSection); // cone sto remplazo el codigo de abajo

    // movies.forEach(movie => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        

    //     const movieContainer = document.createElement('div'); //creo un div para almacenar
    //     movieContainer.classList.add('movie-container'); //hago que le agregue la clase al div

    //     const movieImg = document.createElement('img'); // creo la imagen 
    //     movieImg.classList.add('movie-img'); // creo la clase de la imagen
    //     movieImg.setAttribute('alt', movie.title) // Primero se pone el atributo que deseo y luego el valor
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path) //creo el srcc y pongo la direccion de src para el poster

    //     // aca los empiezo a adicionar
    //     movieContainer.appendChild(movieImg);  
    //     genericSection.appendChild(movieContainer); 
    // });   
};

async function getMoviesBySearch(query) {
    const {data} = await api ('/search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies,genericSection);

};

async function getTrendingMovies() {
    const {data} = await api ('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection); // ya solo llamo a la funcion y limpio el codido de abajo 

      
};

async function getMovieById(movieId) {
    const { data: movie} = await api ('/movie/' + movieId); // ya solo es un objeto no un array 
    
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    headerSection.style.background=  `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})` //asi agrego la imagen de la pelicula y el sombreado para que se vea la flecha
    
    movieDetailTitle.textContent = movie.original_title; // asi le asigno el valor del titulo a cada pelicula 
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList); // asi hago que se cree la lsita de categorias de cada pelicula

    getRelatedMoviesById (movieId)
}

async function getRelatedMoviesById (movieId) {
    const { data } = await api ('/movie/' + movieId + '/recommendations'); // 
    const relatesMovies = data.results;

    createMovies(relatesMovies, relatedMoviesContainer); // uso la funcion para crear las peliculas 
}













// consulta usando fetch
/*
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

async function getCategoriesPreview() {
    const res = await fetch ('https://api.themoviedb.org/3/genre/movie/list?api_key='+ API_KEY);
    const data = await res.json(); // en data me quedan guardados todos los valores de la repsuesta de la api

    const categories = data.genres;
    categories.forEach(category => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        
        const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
        
        const categoryContainer = document.createElement('div'); //creo un div para almacenar
        categoryContainer.classList.add('category-contai    ner'); //hago que le agregue la clase al div

        const categoryTitle = document.createElement('h3'); // creo el titulo h3
        categoryTitle.classList.add('category-title'); // creo la clase de al titulo
        categoryTitle.setAttribute('id', 'id'+ category.id); // Primero se pone el atributo que deseo y luego el valor
        const categoryTitleText = document.createTextNode(category.name);

        // aca los empiezo a adicionar
        categoryTitle.appendChild(categoryTitleText); //agrego al h3 el titulo que deseo
        categoryContainer.appendChild(categoryTitle); // agrego el h3 al div
        categoriesPreviewContainer.appendChild(categoryContainer); // agrego el div al artcule
    });   
}
getTrendingMoviesPreview();     
getCategoriesPreview(); */