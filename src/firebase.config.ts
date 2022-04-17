import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPLw2uhepdYN061OAzOamuxQiVg66Bfg0',
  authDomain: 'house-marketplace-f6b05.firebaseapp.com',
  projectId: 'house-marketplace-f6b05',
  storageBucket: 'house-marketplace-f6b05.appspot.com',
  messagingSenderId: '10413331891',
  appId: '1:10413331891:web:b5761b74ca949b714fa7c6',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
