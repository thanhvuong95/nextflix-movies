import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBo4sr2IXI1EKixfCYOZUCuxcLrKmAnJwc",
    authDomain: "flix-movies-9751c.firebaseapp.com",
    projectId: "flix-movies-9751c",
    storageBucket: "flix-movies-9751c.appspot.com",
    messagingSenderId: "235379092271",
    appId: "1:235379092271:web:424f775988f0b0d000cfda"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  
  const db = firebaseApp.firestore()
  
  export const auth = firebase.auth()
  export default db
  
