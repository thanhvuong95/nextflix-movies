import {useEffect} from 'react'
import './layout.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Routes from '../Route/Routes'
import Login from '../Login/Login'
import { useDispatch } from 'react-redux'
import {login, updateList } from '../../features/user/userSlice'
import db, { auth } from '../../firebase/firebase'
const Layout = () => {
    // const user = useSelector(selectUser)
    // const list = useSelector(selectList)

    const dispatch = useDispatch()
    // check user is logged
    useEffect(()=> {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                db.collection('favorite')
                .doc(userAuth.email)
                .get()
                .then(doc => {
                    if(doc.exists) {
                        console.log(doc.data().list);
                        dispatch(updateList(doc.data().list))
                    }
                    dispatch(login({
                        id:userAuth.id,
                        email:userAuth.email
                    }))
                }
                )
              // ...
            } 
    })
},[])
   
    return (
        <BrowserRouter>
            <Switch>
                    <Route path = "/login"  component = {LoginPage} />
                    <Route component = {Routes} />
            </Switch>
        </BrowserRouter>              

    )
}
const LoginPage = () => {
    return (
        <Route path ="/login" component = {Login} />
    )
}

export default Layout
