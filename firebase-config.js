import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDbHSJZy1Ji5ceo3ef7jV2f7FmgPcXlnFw",
    authDomain: "ofishotips.firebaseapp.com",
    projectId: "ofishotips",
    storageBucket: "ofishotips.appspot.com",
    messagingSenderId: "141732183092",
    appId: "1:141732183092:web:8b4bfeb1c4410c9d0d5e61",
    measurementId: "G-2NB27SSVXW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const store = firebase.firestore()
const auth = firebase.auth()
export { store, auth };
