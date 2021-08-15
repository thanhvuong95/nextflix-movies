const API_KEY = 'c2d49f85996e546299e6fef11fea5978'
const requests = {
    getUpComingMovies:(page) => `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page || 1}`,

    getTrendingAllByDay: (page) => `/trending/all/day?api_key=${API_KEY}&language=en-US&&page=${page || 1}`,
    getTrendingAllByWeek:(page) => `/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTrendingMoviesByDay:(page) => `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTrendingMovieByDay:(page) => `/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTrendingTVByDay:(page) => `/trending/tv/day?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTrendingTVByWeek:(page) => `/trending/tv/week?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    
    getMoviesPopular:(page) => `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getMoviesTopRated:(page) => `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getMoviesNowPlaying: (page) => `movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    
    getTVPopular:(page) =>`/tv/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTVTopRated:(page) => `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTVAiringToday:(page) =>`/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTVOnAir:(page) => `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    getTVLatest:(page) => `tv/latest?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    
    // search
    searchAll: (queryString, page) => `/search/multi?api_key=${API_KEY}&language=en-US&query=${queryString}&page=${page ||1}`,
    // searchByKeyWord: (key, page) => `/search/keyword?api_key=${API_KEY}&query=${key}&page=${page ||1}`,
    searchMoviesByCategory:(id, page) =>`/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page || 1}`,
    
    // people
    getPeoplePopular: (page) => `/person/popular?api_key=${API_KEY}&language=en-US&page=${page ||1}`,
    getPeopleInfoById: (id) => `/person/${id}/images?api_key=${API_KEY}`,

    
    getById: (id, options) => `/${options}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,recommendations,similar`,

    
    getGenresByOptions:(options) => `/genre/${options}/list?api_key=${API_KEY}&language=en-US`,
    getGenresMovie: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    getGenresTV: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,

    getVideos: (category,id) => `/${category}/${id}/videos?api_key=${API_KEY}&language=en-US`,
    getReviews:(category,id) =>`/${category}/${id}/reviews?api_key=${API_KEY}&language=en-US`,

}
export const checkSearchParams = (sorted =[] , queryParams = {year:null, genres:[]} , page, options ) => {
            let url
            if(sorted && queryParams?.year && queryParams?.genres.length>0) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&sort_by=${sorted}&year=${queryParams?.year}&with_genres=${queryParams?.genres.join(',')}&page=${page || 1}`
            }
            else if (sorted && queryParams?.year) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&sort_by=${sorted}&year=${queryParams?.year}&page=${page || 1}`
            }
            else if (sorted && queryParams?.genres.length>0) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&sort_by=${sorted}&with_genres=${queryParams?.genres.join(',')}&page=${page || 1}`
            }
            else if (queryParams?.year && queryParams?.genres.length>0) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&year=${queryParams?.year}&with_genres=${queryParams?.genres.join(',')}&page=${page || 1}`

            }
            else if (sorted){
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&sort_by=${sorted}&page=${page || 1}`
            }
            else if (queryParams?.year) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&year=${queryParams?.year}&page=${page || 1}`

            }
            else if (queryParams?.genres.length > 0) {
                url = `/discover/${options}?api_key=${API_KEY}&language=en-US&with_genres=${queryParams?.genres.join(',')}&page=${page || 1}`
                
            }
            else {
                url = `https://api.themoviedb.org/3/discover/${options}?api_key=c2d49f85996e546299e6fef11fea5978&language=en-US&page=${page || 1}`

            }
            return url
}
export default requests
