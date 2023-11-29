import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3RjQ74j4Prr_7q1dMX7385IncnraYJ_8",
  authDomain: "bibliotecacuc-43187.firebaseapp.com",
  projectId: "bibliotecacuc-43187",
  storageBucket: "bibliotecacuc-43187.appspot.com",
  messagingSenderId: "605339261085",
  appId: "1:605339261085:web:0c7e396154389cb3f85c74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app, getFirestore };