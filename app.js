// SignUp

// importing
import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";
const auth = getAuth();

let signUpBtn = document.getElementById("signupBtn");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword = document.getElementById("signupPassword");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

signUpBtn.addEventListener("click", () => {
    if (signUpEmail.value && signUpPassword.value) {
         
        if (emailRegex.test(signupEmail.value)) {
            Swal.fire({
                icon: "success",
                title: "Signup successfully!",
                showConfirmButton: false,
                timer: 1500
            });
if(signUpPassword.value.length < 6){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
    });
}

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter an email address that ends with @gmail.com",
            });
        } 
    } else {
        Swal.fire({
            icon: "error",
            text: "Please fill in all fields",
            icon: "question"
        });
    }
});

signUpBtn.addEventListener("click",()=>{
    if(signUpEmail.value.trim() && signUpPassword.value.trim()){
        createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          switch (errorMessage){
           case "Firebase: Error (auth/email-already-in-use).":
            Swal.fire("Use Other Email!");
            console.log("use other email");
            break;
            
          }
          
        });

    }
    else{
        Swal.fire("Insert Your Data!");
        console.log("insert your data");
        
    }

    location.href = "signin.html"
    
})

