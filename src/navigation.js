let page = 1;
let infiniteScroll;
let maxPage;
// hagao que si den clich cambie el hash a donde lo deseo 
searchBtn.addEventListener('click', () =>  {
    location.hash ="#search=" + searchFormInput.value; // le que escribieron el buscado y lo concateno
});

trendingPreviewBtn.addEventListener('click', () =>{
    location.hash = "#trends="
})

arrowBtn.addEventListener('click', () =>{
    history.back(); // asi hago que me devulva al al ultima url buscada
    const [_, query] = location.hash.split('=');  
    searchFormInput.value = query;
    // location.hash = "#home="
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// para elimanr el boton hago que el navegador escuche cada vez que se haga escroll y llame a la funcion paginated y asi ella verifica si esta en el final de la pantalla
window.addEventListener('scroll', infiniteScroll, false); // esa es la funcion que llamaremos cada vez que se el scroll llegue al final



// con esta creo que la navegacion sepa en que parte estoy gracias al de hash 
function navigator () {
    console.log({location});

    if (infiniteScroll) {  // para elminar el que se empiece a escuchar el scroll y que si tiene algin valor qu elo borre
        window.removeEventListener('scroll', infiniteScroll, {
            passive: false
        });
        infiniteScroll = undefined;
    }

    if ( location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    } 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; // Asi muestra la parte uperior de la pagina siempre 

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {
            passive: false
        }) // aca estamos diciendo que en algina d elas paginas se le asigno un valor a infiniteScroll entonces escuche el evento de scroll y el hara el llaamdo de esa funcion 
    }

}

function homePage() {
    console.log ('Home!!')
    searchFormInput.value =  "";
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive')
    headerTitleCategory.classList.add('inactive');
    searchFormInput.classList.remove('inactive'); 
    searchBtn.classList.remove('inactive')
    
    trendingPreviwSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();   // las hago cargar solo cuando hash esta en el home  
    getCategoriesPreview();
    getLikedMovies();

}
function categoriesPage() {
    console.log ('categories!!')
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.remove('inactive');
    searchFormInput.classList.add('inactive'); 
    searchBtn.classList.add('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); // ['#category, 'id-nanme']// le digo que cree un array separandolo por cada = que encuentre ejemplo #category=12-Adventure

    const [categoryId, categoryName] = categoryData.split('-'); //  vuelvo a separalo para obtener el id
    headerTitleCategory.innerHTML = categoryName; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion  
    

    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory (categoryId);
}

function trendsPage() {
    console.log ('TRENDS!!')
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.remove('inactive');
    searchFormInput.classList.add('inactive'); 
    searchBtn.classList.add('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerTitleCategory.innerHTML = "Tendencias" //asi cambio el titulo de la pag 
    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}

function searchPage() {
    console.log ('Search!!')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerTitleCategory.classList.add('inactive');
    searchFormInput.classList.remove('inactive'); 
    searchBtn.classList.remove('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search, 'busqueda']// le digo que cree un array separandolo por cada = que encuentre ejemplo #search=busqueda, asi saco el valor 
    const [_, query] = location.hash.split('='); 
    getMoviesBySearch(query);

    // como en esta si hay que envia un argunto creo un funcion qu eme llame a un funcion asincrona que queda esccuchando y se ejecuta cuando se activa el scroll
    infiniteScroll = getPaginatedMoviesBySearch (query);
    
}

function movieDetailsPage() {
    console.log ('Movie!!')

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.add('inactive');
    searchFormInput.classList.add('inactive'); 
    searchBtn.classList.add('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('='); // asi saco al id
    getMovieById(movieId);
}





