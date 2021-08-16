import React, { useEffect, useRef, useState } from 'react'
import './nav.css'
import logo from '../../assets/images/logo.png'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectList, selectUser } from '../../features/user/userSlice'
import { auth } from '../../firebase/firebase'
const nav_Links = [
    {
        display:"Movies",
        path: "/movie"
    },
    {
        display:"TV Shows",
        path: "/tv"
    },
    {
        display:"Peoples",
        path: "/peoples"
    },
    {
        display:"About me",
        path: "/about"
    },
]
const Nav = () => {
   
    const [isShow, setIsShow] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const history = useHistory()
    const searchRef = useRef()
    const user = useSelector(selectUser)
    const list = useSelector(selectList)
    const showSearchBar = () => {
        setIsSearch(!isSearch)
    }
    const dispatch = useDispatch()
    const changeBackground = () => {
        if(window.scrollY > 70) {
            setIsShow(true)
        }
        else {
            setIsShow(false)
        }
    }
    const {pathname} = useLocation()
    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
        return () => window.removeEventListener('scroll', changeBackground)
    }, [])
    const onLogOut = () => {
        const isLogout = async () => {
            auth.signOut()
            dispatch(logout())
        }
        isLogout()
        
    }
    const onMyList = () => {
        history.push('/mylist')
    }
    const changeRoute = (path) => {
        history.push(`${path}`)
    }
    return (
        <div className = {`nav ${isShow && 'nav__shadow'}` }>
            <div className="container nav__container">

                <input type="checkbox" id= "nav-menu" hidden />
                <label htmlFor="nav-menu" className = "nav-toggle">
                    <span className = "nav-hamburger"></span>
                </label>

                <Link to = '/'>
                     <img src= {logo} alt="logo" className="nav__logo" />    
                </Link>
                <ul className = "nav__list">
                     {
                         nav_Links.map((item, index) => (
                            <li key = {index} className={`nav__item ${pathname === item.path ? 'active' : ''}`}>
                                {/* <Link to = {item.path} >
                                    <label htmlFor="nav-menu"></label>
                                        {item.display}  
                                </Link> */}
                                <label htmlFor="nav-menu" onClick = {() => changeRoute(item.path)}>
                                    {item.display}  
                                </label>
                            </li>
                         ))
                     }

                </ul>
               
                {/* <div className={`nav__search ${isSearch ? 'show' : ''}`}>
                    <input type="text" placeholder = "Search ....." ref= {searchRef}/>
                    <i className='bx bx-search nav__btn__search' ></i>
                </div> */}
                <div className="nav__icon">
                    {/* <i className='bx bx-search nav__icon__search' onClick = {showSearchBar} ></i> */}
                    <span className = "nav__profile"><i className="bx bx-user nav__avatar" ></i></span>
                    <ul className="nav__icon__menu">
                        {
                            !user
                            ?
                            <li>
                            <Link to = "/login">
                                Sign In
                            </Link>
                            </li>
                            :
                            <>
                            <li onClick = {onMyList}>My list({list?.length?list?.length : '0'})</li>
                            <li onClick = {onLogOut}>Logout</li>
                            </>

                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav
