import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD0NCOOcz7TPIjFm4DLpbZceT56RNvqsqU",
    authDomain: "chatapp-899b6.firebaseapp.com",
    projectId: "chatapp-899b6",
    storageBucket: "chatapp-899b6.appspot.com",
    messagingSenderId: "753205434503",
    appId: "1:753205434503:web:59dd2c71a66d357f8c4022",
    measurementId: "G-RMTK09SEHH"
};
// Export the initialized app
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()   