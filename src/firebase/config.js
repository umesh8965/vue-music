import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC9lzBDi_TV879mXua31dOFPFhyaJX5Yl4",
    authDomain: "vue-music-1d48b.firebaseapp.com",
    projectId: "vue-music-1d48b",
    storageBucket: "vue-music-1d48b.appspot.com",
    messagingSenderId: "579981599553",
    appId: "1:579981599553:web:8e578368dc30461bdeb7c0"
  };

  // init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }