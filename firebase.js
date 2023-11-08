import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDun8vH1Mqq163ZVp3-2vdJM6ZYWLi3bhA",
    authDomain: "twitter-clone-1fadc.firebaseapp.com",
    projectId: "twitter-clone-1fadc",
    storageBucket: "twitter-clone-1fadc.appspot.com",
    messagingSenderId: "381980133944",
    appId: "1:381980133944:web:115245a0edde031903b4cd"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };