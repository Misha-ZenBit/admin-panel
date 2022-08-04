import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9-2FexPmK0BZcr6cMa3McmK54kozjtZ4',
  authDomain: 'ur-enough.firebaseapp.com',
  databaseURL: 'https://ur-enough-default-rtdb.firebaseio.com',
  projectId: 'ur-enough',
  storageBucket: 'ur-enough.appspot.com',
  messagingSenderId: '856453174877',
  appId: '1:856453174877:web:626175fce7cc5872c11fb4',
  measurementId: 'G-HEWKKMMTXE',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const adminRef = collection(db, 'admin');
export const usersRef = collection(db, 'User');
export const categoriesRef = collection(db, 'Categories');
export const affirmationRef = collection(db, 'Affirmation');
