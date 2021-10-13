// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQl8x1cPCDPWpnHMeihdqIjnZTEnWc3-U",
    authDomain: "instagramappbyvinay.firebaseapp.com",
    projectId: "instagramappbyvinay",
    storageBucket: "instagramappbyvinay.appspot.com",
    messagingSenderId: "129626750783",
    appId: "1:129626750783:web:4116662fdb2cd9bc291d8a"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore();

export { firebase, db }