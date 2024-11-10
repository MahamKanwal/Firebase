// SignUp

// importing
import { getAuth, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,collection, addDoc,db} from "./firebase.js";
const auth = getAuth();
const provider = new GoogleAuthProvider();

let signUpBtn = document.getElementById("signupBtn");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword = document.getElementById("signupPassword");

// Firestore work
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let phoneNo = document.getElementById("phoneNo");

// const users ={
//   firstName : firstName.value,
//   lastName : lastName.value,
//   phoneNumber : phoneNo.value,
// }


signUpBtn.addEventListener('click', async() => {
  
  const users ={
    firstName : firstName.value,
    lastName : lastName.value,
    phoneNumber : phoneNo.value,
  }

  // Firestore work
  try {
    const docRef = await addDoc(collection(db, "users"), {
     ...users
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  // Firestore work

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


  const googleBtn = document.getElementById("signUpGoogle");

  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        const email = error.customData?.email; 
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  });