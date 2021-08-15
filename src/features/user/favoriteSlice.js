import db from "../../firebase/firebase"
import {toast } from 'react-toastify';
import ToastMessage from "../../components/Toast/ToastMessage";

const query = db.collection('favorite')
const checkExistData = (existsData, data) => {
    return existsData?.some(item => item.id === data.id)
  }
  
const addData = (userId, data) => {
  const docRef = query.doc(userId)
    docRef
    .get()
    .then(doc => {
      if(doc.exists) {
        if(checkExistData(doc.data().list, data)) {
          throw new Error("Data is exists.")
        }
        else {
          docRef.set({
              list:doc.data().list.concat({id:data.id,category:data.category})
          })
        }
      }
      else {
        docRef.set({
          list:[{id:data.id, category:data.category}]
        })
      }
    })
    .catch(e => 
        toast.error(
            <ToastMessage type = 'error' message = {e.message} />
        , {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }))
}