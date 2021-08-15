import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login } from '../../features/user/userSlice'
import { selectUser} from '../../features/user/userSlice'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { auth } from '../../firebase/firebase'
import './signup.css'
import {schemaSignIn} from '../../hook/validate'

const SignIn = (props) => {
    const [loading, setLoading] =useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schemaSignIn)
      });
    const onLogin = ({email, password}) => {
        const authUser = async () => {
            setLoading(true)
            setError(null)
            try {
                const userAuth = await auth.signInWithEmailAndPassword(email, password)
                dispatch(login({
                    id:userAuth.uid,
                    email:userAuth.email,
                }))
                setLoading(false)
                history.push('/')
            }
            catch(e) {
                setLoading(false)
                setError(e.message)
            }
        }
        authUser()
    }

    return (
        <form className = "sign sign-up" onSubmit = {handleSubmit(onLogin)}>
            <div className="sign__form">
                <h2 className="sign__title">Sign In</h2>
                <div className="sign__notification">
                        {error}
                </div>    
                <div className="sign__input">
                    <span className="sign__label">Email Address</span>
                    <input type="text" placeholder= "example@gmail.com" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="sign__input">
                    <span className="sign__label">Password</span>
                    <input type="password" placeholder= "Password" {...register('password')}  />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button className="login__button sign__button" type = "submit" >
                    
                    {
                        loading ? <i className="fa fa-spinner fa-spin"></i> : 'Sign In'
                    }
                    
                    
                </button>
                <div className = "sign__redirect">
                        <span className="sign__text">
                            Do not have an account? 
                        </span>
                        <span  className="sign__link" onClick = {props.onChangeForm}> 
                            Sign up now
                        </span>
                    </div>
            </div>
    </form>
    )
}

export default SignIn
