import React from 'react'
import './pagination.css'
const Pagination = ({page, total, onChangePage}) => {
    return (
        <div className = "pagination">
            <i className='bx bx-chevrons-left'  onClick = {() =>onChangePage('first')}></i>
            <i className='bx bx-chevron-left' onClick = {()=>onChangePage('prev')}></i>
            {page} / {total}
            <i className='bx bx-chevron-right' onClick = {() =>onChangePage('next')}></i>
            <i className='bx bx-chevrons-right'  onClick = {()=>onChangePage('last')}></i>
        </div>
    )
}

export default Pagination
