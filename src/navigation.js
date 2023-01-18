// hagao que si den clich cambie el hash a donde lo deseo 
searchBtn.addEventListener('click', () =>  {
    location.hash ="#search="
});

trendingPreviewBtn.addEventListener('click', () =>{
    location.hash = "#trends="
})

arrowBtn.addEventListener('click', () =>{
    location.hash = "#home="
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);



// con esta creo que la navegacion sepa en que parte estoy gracias al de hash 
function navigator () {
    console.log({location});

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
}

function homePage() {
    console.log ('Home!!')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive')
    headerTitleCategory.classList.add('inactive');
    searchFormInput.classList.remove('inactive'); 
    searchBtn.classList.remove('inactive')
    
    trendingPreviwSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();   // las hago cargar solo cuando hash esta en el home  
    getCategoriesPreview();

}
function categoriesPage() {
    console.log ('categories!!')
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.remove('inactive');
    searchFormInput.classList.add('inactive'); 
    searchBtn.classList.add('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); // ['#category, 'id-nanme']// le digo que cree un array separandolo por cada = que encuentre ejemplo #category=12-Adventure

    const [categoryId, categoryName] = categoryData.split('-'); //  vuelvo a separalo para obtener el id
    headerTitleCategory.innerHTML = categoryName; // con esto garantizo limpiar para que cada vez que entre no se vuelva a cargar todo de la api y se duplque la informacion  
    

    getMoviesByCategory(categoryId);
}

function trendsPage() {
    console.log ('TRENDS!!')
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.remove('inactive');
    searchFormInput.classList.add('inactive'); 
    searchBtn.classList.add('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function searchPage() {
    console.log ('Search!!')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive')
    headerTitleCategory.classList.remove('inactive');
    searchFormInput.classList.remove('inactive'); 
    searchBtn.classList.remove('inactive');
    
    trendingPreviwSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}





