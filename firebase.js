import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC-hGbNVn0wRSS8fIZXXkUT1eisc-iQcKc",
  authDomain: "next-whatsapp-337ea.firebaseapp.com",
  projectId: "next-whatsapp-337ea",
  storageBucket: "next-whatsapp-337ea.appspot.com",
  messagingSenderId: "809134607947",
  appId: "1:809134607947:web:3d8104eac9ae15928c87ce"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()

const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider}