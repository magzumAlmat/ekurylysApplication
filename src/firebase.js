import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD0Z2DzlrHE3oSumppOAUcFA51fOQfdfqk",
  authDomain: "betonn-8560a.firebaseapp.com",
  projectId: "betonn-8560a",
  storageBucket: "betonn-8560a.appspot.com",
  messagingSenderId: "404130189314",
  appId: "1:404130189314:web:3858ef293056d14e88171b",
  measurementId: "G-C5QXXF1SJ3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)

export default (app);




// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyD0Z2DzlrHE3oSumppOAUcFA51fOQfdfqk",
//   authDomain: "betonn-8560a.firebaseapp.com",
//   projectId: "betonn-8560a",
//   storageBucket: "betonn-8560a.appspot.com",
//   messagingSenderId: "404130189314",
//   appId: "1:404130189314:web:3858ef293056d14e88171b",
//   measurementId: "G-C5QXXF1SJ3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);


// export default (app);