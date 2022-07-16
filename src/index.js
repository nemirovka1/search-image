//848e9754bca048af8a7f13a118ea5d9f
import NewsApiService from '../src/news-service.js'
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm.js";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs={
    seachForm:document.querySelector('.js-search-form'),
    contanier:document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('[data-action="load-more"]')
}
const newsApiService=new NewsApiService();

refs.seachForm.addEventListener('submit',onSearchForm);
// refs.loadMoreBtn.addEventListener('click',onLoadMore);


function onSearchForm(event){
    event.preventDefault();

    newsApiService.query=event.currentTarget.elements.query.value;
    if (newsApiService.query === ' '){
      return alert('Некоректный запрос')
    }
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(appendArticlesMarkup);
    resetCard(event);
    gallery(event);
}

// function onLoadMore(){
//     newsApiService.fetchArticles().then(appendArticlesMarkup)
// }
function appendArticlesMarkup(hits){
    console.log(hits)
    const mapEl=hits.map(el=>{
        const{webformatURL,largeImageURL,likes,views,comments,downloads}=el;
        return `<li>
        <div class="photo-card">
        <div class="card" >
        <a href ="${largeImageURL}">
        <img src="${largeImageURL}" alt="" />
        </a>
        </div>
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons"> thumb_up</i>
             ${likes}
          </p>
          <p class="stats-item">
          <i class="material-icons">visibility</i>
          ${views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>
            ${comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${downloads}
          </p>
        </div>
      </div>
    
      </li>`
    }).join('')
    refs.contanier.insertAdjacentHTML('beforeend',mapEl)
    new SimpleLightbox(".gallery a",{
      captionsData: "alt",
      captionDelay: 250,
      spinner:true,
      uniqueImages:true,
      showCounter:true,
      overlayOpacity:0.9,
    })
}
function resetCard(el){
    const page=document.querySelector('.gallery');
    page.innerHTML=''
}

window.addEventListener('scroll',()=>{
  const documentRect=document.documentElement.getBoundingClientRect()

  if (documentRect.bottom < document.documentElement.clientHeight +150 ){
    newsApiService.fetchArticles().then(appendArticlesMarkup)
  }
})