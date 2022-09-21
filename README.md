# Betting tips app

add firebse-config.js file in the root of the project<br/>
edit your credentials for the firebase<br/>
```
import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaging sender id",
    appId: "your app id",
    measurementId: "your measurement id"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const store = firebase.firestore()
const auth = firebase.auth()
export { store, auth };
```