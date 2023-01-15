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

async function getTrendingMoviesPreview() {
    const {data} = await api ('trending/movie/day');

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
};

async function getCategoriesPreview() {
    const { data } = await api ('genre/movie/list');
    
    const categories = data.genres;
    categories.forEach(category => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        
        const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list') // esto lo realizo para poder seleccionar al articule donde esta guardado el div 
        
        const categoryContainer = document.createElement('div'); //creo un div para almacenar
        categoryContainer.classList.add('category-container'); //hago que le agregue la clase al div

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
getCategoriesPreview();


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