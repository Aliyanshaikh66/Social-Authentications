import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup, GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJuleBFwMYvvK4fpDu-Y1SpRcvO0D8Qvw",
    authDomain: "test-31b59.firebaseapp.com",
    projectId: "test-31b59",
    storageBucket: "test-31b59.firebasestorage.app",
    messagingSenderId: "855523655626",
    appId: "1:855523655626:web:3fd52f524b984f1e0d1933",
    measurementId: "G-7VD9M0YHX1"
  };


// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();  //condtructor function

// Register new user
let registeres_btn = document.getElementById("registeres_btn");
registeres_btn.addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;
        console.log("User signed up:", user);
        // add verification method to user

        const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
    // Email verification sent!
    // ...
    console.log("Email verified");
    
     });

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorMessage);
    });
});

// Sign in existing user
let login_btn = document.getElementById("login_btn");
login_btn.addEventListener("click", function () {
    let loginemail = document.getElementById("loginemail").value;
    let loginpassword = document.getElementById("loginpassword").value;

    signInWithEmailAndPassword(auth, loginemail, loginpassword)
    .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log("User signed in:", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorMessage);
    });
});

//google login

let LoginWithGoogle = document.getElementById("LoginWithGoogle");
LoginWithGoogle.addEventListener("click", function () {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("user-->" , user); // user check in console
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log("error-->" , error); // user check in console

  });


});
