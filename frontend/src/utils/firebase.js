import { initializeApp,getApp,getApps } from "firebase/app";
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyDpfzIfMu5O1G9VuBWLaoheIxLFiHMNPnc",
  authDomain: "e-books-a6e3d.firebaseapp.com",
  projectId: "e-books-a6e3d",
  storageBucket: "e-books-a6e3d.appspot.com",
  messagingSenderId: "194539507140",
  appId: "1:194539507140:web:7b02705164a33e662d6891"
};

const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const storage=getStorage()

export {app,storage}