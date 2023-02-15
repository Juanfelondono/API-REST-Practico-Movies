// CODIGO USANDO AXIOS
//data 
const api = axios.create ({
    baseURL: 'https://api.themoviedb.org/3/', //creo la url base 
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {   
            'api_key': API_KEY,
            
    },
});

function likedMovieList () { // el objetivo es que me devulva el arrays de ids de peliculas que tengo guardadas
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies; 

    if(item) { // si item tiene algun valor lo voy a guardar ene movies
        movies =item
    } else { // y si no que sea un objeto vacio 
        movies = {};
    }
    return movies
    
}

function likeMovie(movie) {
    const likedMovies = likedMovieList();
    
    if (likedMovies[movie.id]) {
        console.log('la pelicula ya estaba en locas storage')
        likedMovies[movie.id] = undefined
    } else {
        console.log(' la pelicula no estaba en local storage')
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
}

//Utils

function callback (entries) { 
    entries.forEach((entry) => {
        if(entry.isIntersecting) { // creo un if donde digo que si intersectiong es true que coja la url y cree el atributo src
        // console.log({entry.target.setAttribute})
        const url = entry.target.getAttribute('data-img') // con este consigo el valor que esta guardado en el atributo de la imagen para luego agregar el atributo src e insertalo ahi
        entry.target.setAttribute('src', url)
        }
        
    })
}
const lazyLoader = new IntersectionObserver(callback) // no pongo el options pq no voy a observar un contnedor en especifico

function createMovies(
    movies,
    container,
     { 
        lazyLoad = false,
         clean= true
        } ={},
)   { // creoe sta funcion para crear de una amnera ma simple,simpre recibo mubies y el contenedor donde desee agregarlo
    if (clean) {
        container.innerHTML = ''; // creo este if para n limpie mi html cuando indique que clean es false
    }
    

    movies.forEach(movie => { // asi hago que cree esto por cada pelicula que recorre, revio el html para saber que debo crear
        const movieContainer = document.createElement('div'); //creo un div para almacenar
        movieContainer.classList.add('movie-container'); //hago que le agregue la clase al div
        
        const movieImg = document.createElement('img'); // creo la imagen 
        movieImg.classList.add('movie-img'); // creo la clase de la imagen
        movieImg.setAttribute('alt', movie.title) // Primero se pone el atributo que deseo y luego el valor
        

        movieImg.setAttribute( // uso la escritura simplificada del if y digo si lazyload es true entonces cre data-img si no pongalo en src
            lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path) //creo el src y pongo la direccion de src para el poster

        movieImg.addEventListener('error', () => { // creo el evento de si se presenta un error le de un valor por defecto ala tributo utl 
            movieImg.setAttribute(
                'src',
                'https://images.pexels.com/photos/1102775/pexels-photo-1102775.jpeg?auto=compress&cs=tinysrgb&w=600'
            );
        }) // cuando se prensente un evento de error


        movieImg.addEventListener('click',() => { // cada vez que le de click a una pelicula tendre el id 
            location.hash= '#movie=' + movie.id
        })

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn')
        likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked'); // si esta pelucula ya esta se le agrega esa clase
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        })
        if(lazyLoad){ // para hacer si quiero lazyloader indico en la funcion que lazyload es true para que si se aplique el observe
            lazyLoader.observe(movieImg) //aca estoy diciendo que elemento debe observar
        }
        

        // aca los empiezo a adicionar
        movieContainer.appendChild(movieImg);  
        movieContainer.appendChild(movieBtn); 
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
    createMovies(movies,trendingPreviewMovieList, true); // ya solo llamo a la funcion y limpio el codido de abajo 

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
    createMovies(movies,genericSection, {lazyLoad: true, clean: true}); // cone sto remplazo el codigo de abajo
    maxPage = data.total_pages;
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

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement; // asi almanceno los valores que me ayuda a saber cuando estoy en el final de la pagina
    
        const scrollIsButton = ((scrollTop + clientHeight) >= (scrollHeight - 100)); // creo el if diciendo si eso es true entonces haga el llamado a la api
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsButton && pageIsNotMax) { 
            page++; // aca le sumo uno a cada vez que llame la funcion 
            const {data} = await api ('/discover/movie', {
                params: {
                    with_genres: id,
                    page
                }
        });
        const movies = data.results;
        createMovies(movies, genericSection, {lazyLoad: true, clean: false}); // ya solo llamo a la funcion y limpio el codido de abajo 
    
        }   
        // //aca estoy creando el boton para cargar mas 
        // const btnLoadMore = document.createElement('button'); // creo el elemento
        // btnLoadMore.innerText ='Cargar mas'; //indico que dira el boton
        // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies); // creo el evento de click yq ue llame a una funcion
        // genericSection.appendChild(btnLoadMore)// lo agrego al contenedor
    }
}

async function getMoviesBySearch(query) {
    const {data} = await api ('/search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies,genericSection, {lazyLoad: true, clean: true});
    maxPage = data.total_pages
};

// debo crear un funcion para poder almacenar el valor query que cuando sea el momento se haga el llamdo a la API
function getPaginatedMoviesBySearch(query) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement; // asi almanceno los valores que me ayuda a saber cuando estoy en el final de la pagina
    
        const scrollIsButton = ((scrollTop + clientHeight) >= (scrollHeight - 100)); // creo el if diciendo si eso es true entonces haga el llamado a la api
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsButton && pageIsNotMax) { 
            page++; // aca le sumo uno a cada vez que llame la funcion 
            const {data} = await api ('/search/movie', {
                params: {
                    query,
                    page
                }
        });
        const movies = data.results;
        createMovies(movies, genericSection, {lazyLoad: true, clean: false}); // ya solo llamo a la funcion y limpio el codido de abajo 
    
        }   
        // //aca estoy creando el boton para cargar mas 
        // const btnLoadMore = document.createElement('button'); // creo el elemento
        // btnLoadMore.innerText ='Cargar mas'; //indico que dira el boton
        // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies); // creo el evento de click yq ue llame a una funcion
        // genericSection.appendChild(btnLoadMore)// lo agrego al contenedor
    }
}

async function getTrendingMovies() {
    const {data} = await api ('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection, {lazyLoad: true, clean: true}); // ya solo llamo a la funcion y limpio el codido de abajo 

    maxPage = data.total_pages;
    // //aca estoy creando el boton para cargar mas 
    // const btnLoadMore = document.createElement('button'); // creo el elemento
    // btnLoadMore.innerText ='Cargar mas'; //indico que dira el boton
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies); // creo el evento de click yq ue llame a una funcion
    // genericSection.appendChild(btnLoadMore)// lo agrego al contenedor
      
};

// para elimanr el boton hago que el navegador escuche cada vez que se haga escroll y llame a la funcion paginated y asi ella verifica si esta en el final de la pantalla


//Funcion para el boton cargar mas
//let page = 1; // incializo la funcion en 1  y cada vez que la llame le sumare uno y se guardara ese valor, la quito y la porngo en el navigation para que funciones el infinete scroll en todoas las pantallas
async function getPaginatedTrendingMovies() { 
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement; // asi almanceno los valores que me ayuda a saber cuando estoy en el final de la pagina

    const scrollIsButton = ((scrollTop + clientHeight) >= (scrollHeight - 100)); // creo el if diciendo si eso es true entonces haga el llamado a la api
    const pageIsNotMax = page < maxPage;

    if (scrollIsButton && pageIsNotMax) { 
        page++; // aca le sumo uno a cada vez que llame la funcion 
        const {data} = await api ('trending/movie/day', {
            params: {
                page
            }
    });
    const movies = data.results;
    createMovies(movies, genericSection, {lazyLoad: true, clean: false}); // ya solo llamo a la funcion y limpio el codido de abajo 

    }   
    // //aca estoy creando el boton para cargar mas 
    // const btnLoadMore = document.createElement('button'); // creo el elemento
    // btnLoadMore.innerText ='Cargar mas'; //indico que dira el boton
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies); // creo el evento de click yq ue llame a una funcion
    // genericSection.appendChild(btnLoadMore)// lo agrego al contenedor
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

function getLikedMovies () {
    const likedMovies = likedMovieList();
    // {keys: 'values', keys: 'values2'}
    // ['values', 'values2'] lo vuelve un array de objetos 
    const moviesArray = Object.values(likedMovies);
    
    createMovies(moviesArray, likedMovieListArticule,{ lazyLoad:true, clean:true})
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