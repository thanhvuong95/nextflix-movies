import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { auth } from '../../firebase/firebase'
import {schemaSignUp} from '../../hook/validate'
import './signup.css'
import { useState } from "react";
const SignUp = (props) => {

    const [loading, setLoading] =useState(false)
    const [error, setError] = useState(null)

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schemaSignUp)
      });
    const onCreateAccount = ({email, password}) => {
       const createAccount = async() => {
           setLoading(true)
           setError(null)
            try {
                await auth.createUserWithEmailAndPassword(email,password)   
                setLoading(false)
            }
            catch(e) {      
                setLoading(false)
                setError(e.message)
            }
                
        }
        createAccount()
    }
    return (
        <form className = "sign sign-up" onSubmit = {handleSubmit(onCreateAccount)}>
            <div className="sign__form">
                <h2 className="sign__title">Sign Up</h2>
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
                <div className="sign__input">
                    <span className="sign__label">Repeat Password</span>
                    <input type="password" placeholder= "Confirm Password" {...register('confirmPassword')} />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                
                </div>
                <button className="login__button sign__button" type = "submit">
                    
                    {
                        loading ? <i className="fa fa-spinner fa-spin"></i> : 'Sign Up'
                    }
                    
                    
                </button>
                <div className = "sign__redirect">
                        <span className="sign__text">
                            Already have an account? 
                        </span>
                        <span  className="sign__link" onClick = {props.onChangeForm}> 
                            Sign in now
                        </span>
                    </div>
            </div>
    </form>
    )
}

export default SignUp
