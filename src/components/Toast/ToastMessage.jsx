import React from 'react'
import './toast.css'
const ToastMessage = ({type,message}) => {
    return (
        <div className = "toast-custom">
            <i className = {`${type === 'success' ? 'bx bxs-check-circle':'bx bxs-info-circle'}`}></i>
            <span>{message}</span>
        </div>
    )
}
export default ToastMessage
