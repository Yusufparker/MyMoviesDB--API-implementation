$('.btn-search').on('click', function(){
    let cari = $('.input-movie1').val();

    if (cari == ''){
        cari = $('.input-movie2').val()
        if (cari == ''){
            cari = $('.input-movie3').val()
        }
    }
    $.ajax({
        url:'https://www.omdbapi.com/?apikey=e77e96f4&s='+cari,
        success : result =>{
            $('.input-movie1').val('')
            $('.input-movie2').val('')
            $('.input-movie3').val('')
            let movies = result.Search
            let card = ''
            try {
                movies.forEach(m => {
                    card += showCards(m);
                });
                $('.body-card-movie').html(card);

                $('.btn-show-detail').on('click', function(){
                    $.ajax({
                        url: 'https://www.omdbapi.com/?apikey=e77e96f4&i=' + $(this).data('imdbid'),
                        success : m =>{
                            const movieDetail = modalBody(m)  ;
                            $('.modal-body').html(movieDetail);
                        },
                        error: (e)=> {
                            console.log(e.responseText)
                        }
                        
                    })
                })
            } catch (error) {
                //handling error

                $('.body-card-movie').html(notFound(cari));
                
            }
            
    
    
    
        },
        error : e => console.log(e.responseText)
    })

})





function showCards(m){
    return `<div class="col-md-2 bg-white ms-1 me-1 mb-3 pt-2 pb-2 movie-card">
                <div class="img-card">
                    <img src="${m.Poster}" class="w-100 h-100" alt="">
                </div>
                <p><span class="fw-bold">${m.Title}</span> (${m.Year})</p>
                <a href="" class="btn btn-dark btn-show-detail" data-bs-toggle="modal" data-imdbid="${m.imdbID}" data-bs-target="#movieDetailModal">Show Details</a>
            </div>`

}


function notFound(cari){
    return `<div class="col-md-8 text-center">
                <h3 class="text-white">Search Results : ${cari}</h3>
                <h3 class="text-white">Data Not Found</h3>
            </div>`
}


function modalBody(m){
    return `<div class="row">
    <div class="col-md-3">
        <img src="${m.Poster}"  class="w-100" alt="" srcset="">
    </div>
    <div class="col-md">
        <ul class="list-group">
            <li class="list-group-item bg-dark text-white">${m.Title} (${m.Year})</li>
            <li class="list-group-item bg-dark text-white"><strong>Director : </strong>${m.Director}</li>
            <li class="list-group-item bg-dark text-white"><strong>Actors : </strong>${m.Actors}</li>
            <li class="list-group-item bg-dark text-white"><strong>Writers : </strong>${m.Writer}</li>
            <li class="list-group-item bg-dark text-white"><strong>Plot : </strong><br>${m.Plot}</li>
        </ul>
    </div>
</div>`
}