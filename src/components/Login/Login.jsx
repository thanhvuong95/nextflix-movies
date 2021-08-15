import React, { useEffect, useState} from 'react'
import './login.css'
import logo from '../../assets/images/logo.png'
import bgImg from "../../assets/images/bg-img.jpg"
import SignIn from '../Sign/SignIn'
import SignUp from '../Sign/SignUp'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
const Login = () => {
    const [isSignIn, setIsSignIn] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const user = useSelector(selectUser)
    const history = useHistory()
    const showSignIn = () => {
        setIsSignIn(true)
        setIsSignUp(false)
    }
    const showSignUp = () => {
        setIsSignIn(false)
        setIsSignUp(true)
    }
    let content
    if(isSignIn) {
        content = <SignIn onChangeForm = {showSignUp}/>
    }
    else if (isSignUp) {
        content = <SignUp onChangeForm =  {showSignIn}/>
    }
    else {
        content =(
            <>
                <h1 className="login__title ">
                    Unlimited movies, TV shows, and more.
                </h1>
                <h2 className="login__subtitle ">
                    Watch anywhere. Cancel anytime.
                </h2>
                
                <form className="login__form">
                    <h3 className="login__form-title ">
                        Ready to watch? Enter your email to create or restart your membership
                    </h3>
                    <div className ="login__form-email">
                        <input type="text" placeholder ="Enter your email" className = "login__form-input"/>
                        <button className="login__button login__form-button" onClick = {showSignIn}>Get started</button>
                    </div>
                </form>
            </>
        )

        }
 
       
    useEffect(() => {
        if(user) {
            history.push('/')
        }

    },[user,history])
        
    return (
        
        <div className = "login" style = {{
            backgroundImage:`url("${bgImg}")`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
        }}>
            <div className="overlay login__overlay"></div>
            <div className="container login__container">
                <div className="login__header">
                    <Link to = "/" >
                        <img src= {logo} alt="" className = "login__logo"/> 
                    </Link>
                    <div className="login__wrap__button">
                        <button className="login__button" onClick = {showSignIn}>Sign In</button>  
                        <button className="login__button" onClick = {showSignUp}>Sign Up</button>  

                    </div>
                
                </div>
                <div className="login__contents">   
                    {content} 
                </div>
            </div>
            
            
        </div>
       
    )
}

export default Login
