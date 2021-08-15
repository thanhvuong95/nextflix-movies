import React, {useState} from 'react'
const Search = (props) => {
    const [selected,setSelected] = useState({
        genres:[],
        year:null
    })
    // const isSearch = selected.genres.length !== 0 || selected.year !== null 

    const [toggleGenres, setToggleGenres] = useState(false)

    const updateSelectedState = (e) => {
        const val = e.target.value?Number(e.target.value):null;
        const type = e.target.type
        const newSelected = Object.assign({}, selected)
        if(type === 'checkbox') {
            const index = newSelected.genres.findIndex(item => item === val)
            if(index === -1) {
                newSelected.genres.push(val)
                setSelected(newSelected)
            }
            else {
                newSelected.genres.splice(index,1)
                setSelected(newSelected)
            }
        }
        else {
            setSelected({...newSelected, year:val})
        }
    }
    
    const filterMovies = () => {
        props.onSearch(selected)
    }
    const clearFilter = () => {
        setSelected({
            genres:[],
            year:null
        })
        
    }

    return (
        <>
        <div className="movies__filter">
            <span>Filter</span>
            <div className= "movies__filter__type">
                    <div className="movies__filter__title" onClick = {() =>setToggleGenres(!toggleGenres)}>
                        <span>Genres ({selected.genres.length})</span>
                        <i className={`bx ${toggleGenres?'bxs-chevron-up':'bxs-chevron-down'}`} ></i>
                    </div>
                    <div className={`movies__filter__wrap ${toggleGenres ? 'active' :''}`} >
                        {
                        props.data.map(item => (
                            <div className="movies__filter__group" key = {item.id}>
                                <input type="checkbox" checked = {selected.genres.includes(item.id)} value = {item.id} id={item.id} onChange = {updateSelectedState} />
                                <label htmlFor={item.id}>{item?.name}</label>
                            </div>

                        ))
                        }
                    </div>
            </div>
            <div className="movies__filter__year">
                <select className="movies__filter__selection"  value = {selected.year ? selected.year : 'Year'} onChange = {updateSelectedState}>
                    <option value = "">Year</option>
                    <option value = "2017">2017</option>
                    <option value = "2018">2018</option>
                    <option value = "2019">2019</option>
                    <option value = "2020">2020</option>
                    <option value = "2021">2021</option>

                </select>
            </div>
            <button className = "movies__btn-search"  onClick = {filterMovies}>Search</button>
            <button className = "movies__btn-search"  onClick = {clearFilter}>Clear Filter</button>
                        
        </div>
    </>
    )
}

export default Search
