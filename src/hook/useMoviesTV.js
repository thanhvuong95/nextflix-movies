import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { checkSearchParams } from '../api/requests'
import requests from '../api/requests'
const useMoviesTV = (options) => {
    // const [movies, setMovies] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading]  = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const [genres, setGenres] = useState([])
    const [sorted, setSorted] = useState("")
    const [querySearch, setQuerySearch] = useState({
        year:null,
        genres:[],
    })
    // updated Sorted
    const updateSorted = (e) => {
        setSorted(e.target.value)
    }

    // search
    const searchMovies = ({year,genres}) => {
        if(year !== querySearch.year || JSON.stringify(genres)!==JSON.stringify(querySearch.genres)) {
            setQuerySearch({year,genres:genres.slice()})

        }
    }

    const changePage = (string) => {
        switch (string) {
            case 'first':
                setPage(1)
                break;
            case 'prev':
                page > 1 ? setPage(page-1) : setPage(page)
                break
            case 'next':
                page < totalPage ? setPage(page+1) : setPage(page)
                break;
            case 'last':
                setPage(totalPage)
                break;
            default:
                break;
        }
    }
    // get genres
    const getGenresMovie = async () => {
            try { 
                const res = await axios.get(requests.getGenresMovie)
                setGenres(res.data.genres)
            }
            catch (e) {
                console.log("fetch Genres:",e.message)
            }

        }
    const getGenresTV = async () => {
        try { 
            const res = await axios.get(requests.getGenresTV)
            setGenres(res.data.genres)
        }
        catch (e) {
            console.log("fetch Genres:",e.message)
        }

    }

    useEffect(() => {
        options === 'movie' ? getGenresMovie() : getGenresTV()
    }, [options])


    // get data movies by default
    useEffect(() => {
        const fetchMovies = async () =>{
            setLoading(true)
            setError(null)
            const url = checkSearchParams(sorted, querySearch, page, options) 
            try {
                const res = await axios.get(url)
                if(res.data.results.length === 0) {
                    throw new Error("No data result")
                }
                else {
                    setData(res.data.results)
                    setTotalPage(res.data?.total_pages) 
                    setLoading(false)
                }
            }
            catch(e) {
                setLoading(false)
                setError(e.message)
            }      
       }
       fetchMovies()
    }, [sorted, querySearch, page,options])
    return {data, loading, error, page, totalPage, genres, sorted, updateSorted, searchMovies, changePage}
}
export default useMoviesTV
