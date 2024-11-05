// SignUp

// importing
import { getAuth, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "./firebase.js";
const auth = getAuth();
const provider = new GoogleAuthProvider();

let signUpBtn = document.getElementById("signupBtn");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword = document.getElementById("signupPassword");

signUpBtn.addEventListener('click', () => {
    if (signUpEmail.value === "" || signUpPassword.value === "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "enter your all credentials",
        showConfirmButton: false,
        timer: 1500
      });
    }
        else if (signUpEmail.value.trim() && signUpPassword.value.trim()) {
      createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "SignUp successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
         location.href = "signin.html"
          }, 3000)
  
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error:" + errorCode)
          switch (errorCode) {
            case "auth/missing-email":
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "ERROR:" + errorMessage,
                showConfirmButton: false,
                timer: 1500
              });
              break;
            case "auth/missing-password":
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "ERROR:" + errorMessage,
                showConfirmButton: false,
                timer: 1500
              });
              break;
            case "auth/email-already-in-use":
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "ERROR:" + errorMessage,
                showConfirmButton: false,
                timer: 1500
              });
              break;
            case "auth/weak-password":
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "ERROR:" + errorMessage,
                showConfirmButton: false,
                timer: 1500
              });
          }
  
        });
    }
  
  
  })


  const signUpGoogle = document.getElementById("signUpGoogle");

  signUpGoogle.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("Access Token:", token);
        const user = result.user;
        console.log("User:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code:", errorCode);
        console.log("Error Message:", errorMessage);
        const email = error.customData?.email; 
        console.log("Email:", email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Credential:", credential);
      });
  });