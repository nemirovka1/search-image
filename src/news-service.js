// key=28662427-1c9408a3a9576dce683ea6fdd
export default class NewsApiService{
    constructor(){
        this.searchQuery='';
        this.page=1
    }

    fetchArticles(){
       return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=21&page=${this.page}&key=28662427-1c9408a3a9576dce683ea6fdd`)
        .then(r=>r.json())
        .then(data=>{
            this.incrementPage()
            return data.hits
        
        });
    
    }
    incrementPage(){
        this.page+=1;
    }
    resetPage(){
        this.page=1;
    }
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery=newQuery;
    }
}