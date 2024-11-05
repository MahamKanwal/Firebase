import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification,
   updateProfile, signOut,signInWithPopup,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDx0kN7NeaKQtUqmNx98psxm2SrBmqM6OY",
  authDomain: "signup-signin-form-a226b.firebaseapp.com",
  projectId: "signup-signin-form-a226b",
  storageBucket: "signup-signin-form-a226b.firebasestorage.app",
  messagingSenderId: "737612878916",
  appId: "1:737612878916:web:b7a453e59e7e3ab9319811"
};

const app = initializeApp(firebaseConfig);
export {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification, updateProfile,
   signOut,signInWithPopup,GoogleAuthProvider};
