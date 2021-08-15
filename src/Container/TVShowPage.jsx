import Grid from '../components/Grid/Grid'
import './moviesPage.css'
import Search from '../components/SearchBar/Search'
import MovieCard from '../components/MovieTVCard/MovieCard'
import Pagination from '../components/Pagination/Pagination'
import useMoviesTV from '../hook/useMoviesTV'
const TVShowPage = () => {
    const {data, loading, error, page, totalPage, genres, updateSorted, searchMovies, changePage} = useMoviesTV('tv')
    let content
    if(loading) {
        content = <div className="loading">
                    <div className="spin-icon spin-icon--sm"></div>
                </div>
    }
    else if(error) {
        content = <span>{error}</span>
    }
    else {
        content =(
            <>
                <Grid>
                    {
                        data.map(item => (
                        <MovieCard data = {item} key = {item.id} path = {'tv'}/>
                        ))
                    }
                </Grid>
                <Pagination page = {page} total = {totalPage} onChangePage = {changePage} />
            </>
        )  

    }


    return (
        <div className = "movies">
           <Search data = {genres} onSearch = {searchMovies}/>
            <div className="movies__contents">
                <div className="movies__header">
                    <span className="movies__header__title">Featured TV Shows</span>
                    <div className="movies__header__sort">
                        <span>Sort by: </span>
                        <select className="movies__header__selection" onChange = {updateSorted}>
                            <option value = "">Default</option>
                            <option value = "popularity.desc">Popularity &uarr;</option>
                            <option value = "popularity.asc">Popularity &darr;</option>
                            <option value = "vote_average.desc">Rating &uarr;</option>
                            <option value = "vote_average.desc">Rating &darr;</option>
                            <option value = "original_title.asc">Tile A-Z</option>
                            <option value = "original_title.desc">Tile Z-A</option>
                            <option value = "primary_release_date.desc">Release date &uarr;</option>
                            <option value = "primary_release_date.asc">Release date &darr;</option>
                        </select>
                    </div>
                </div>
                <div className="movies__body">
                    {content}
                </div>
            </div>
        </div>
    )
 }

export default TVShowPage
