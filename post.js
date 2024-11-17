// var backgroundImg;
// function submitPost() {
// 	var postTitle = document.getElementById('post-title');
// 	var postDescription = document.getElementById('postdescrib');
// 	var time = new Date().toLocaleString();

// 	var posts = document.getElementById('posts');
// 	if (postTitle.value.trim() && postTitle.value.trim()) {
// 		Swal.fire({
// 			position: 'center',
// 			icon: 'success',
// 			title: 'Post has been created',
// 			showConfirmButton: false,
// 			timer: 1500,
// 		});
// 		setTimeout(function () {
// 			posts.innerHTML += `
                   
//                     <div class="card mt-3" style=" border: 2px solid #F81894;">
//                         <div class="card-header fontStyle" style=" border: 2px solid #F81894;">
//                             @Posts
//                         </div>
//                         <p class="ps-3">${time}</p>
//                         <div class="card-body" style="background-image:url(${backgroundImg});">
//                             <h5 class="card-title fontStyle" id="previousTitle">${postTitle.value}</h5>
//                             <p class="card-text fontStyle" id="previousDescription">${postDescription.value}</p>
//                         </div>
//                         <div class="mt-3 d-flex gap-2 p-3">
//                         <button type="button" class="btn btn-primary" onclick=editPost(event)>Edit</button>
//                         <button type="button" class="btn btn-danger" onclick=deletePost(event)>Delete</button>
//                         </div>
//                     </div>
                   
                   
//                 </div>`;

// 			postTitle.value = '';
// 			postDescription.value = '';
// 		}, 1500);
// 	} else {
// 		Swal.fire({
// 			title: 'No input data',
// 			text: 'Fill some data',
// 			icon: 'warning',
// 		});
// 	}
// }

// function selectImg(url) {
// 	backgroundImg = url;
// 	var images = document.getElementsByClassName('bg-img');
// 	for (var i = 0; i < images.length; i++) {
// 		images[i].className = ' bg-img';
// 	}
// 	event.target.className += ' image-list-selected';
// }

// async function editPost(event) {
// 	var previousTitle = document.getElementById('previousTitle');
// 	var previousDescription = document.getElementById('previousDescription');
// 	const { value: formValues } = await Swal.fire({
// 		title: 'Update Post',
// 		html: `
//   <label>
//   Title
//   <input id="swal-input1" class="swal2-input" value="${previousTitle.innerHTML}">
//   </label>
//   <label>
//   Description
//   <input id="swal-input2" class="swal2-input" value="${previousDescription.innerHTML}">
//   </label>
//   `,
// 		focusConfirm: false,
// 		preConfirm: () => {
// 			return [document.getElementById('swal-input1').value, document.getElementById('swal-input2').value];
// 		},
// 	});

//     Swal.fire({
// 			position: 'center',
// 			icon: 'success',
// 			title: 'Post has been updated',
// 			showConfirmButton: false,
// 			timer: 1500,
// 		});
//     setTimeout(function () {
    
//         previousTitle.innerHTML = formValues[0];
//         previousDescription.innerHTML = formValues[1];
// },1500)

// }

// function deletePost(event) {
// 	Swal.fire({
// 		title: 'Do you want to delete the post',
// 		showDenyButton: true,
// 		confirmButtonText: 'YES',
// 		denyButtonText: `NO`,
// 	}).then((result) => {
// 		if (result.isConfirmed) {
// 			event.target.parentNode.parentNode.remove();
// 		} else if (result.isDenied) {
// 		}
// 	});
// }




import{db,collection, addDoc ,setDoc,doc, getDocs,deleteDoc,updateDoc,getAuth, serverTimestamp}from"./firebase.js"
let postTitle = document.getElementById("postTitle")
let content = document.getElementById("postContent")



let post = document.getElementById("post")
post.addEventListener("click",async()=>{
    let postTitle = document.getElementById("postTitle")
let content = document.getElementById("postContent")

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        const uid = user.uid;
        let savedata={
          postTitle:postTitle.value,
          content:content.value, 
          uid:uid,
          time:  new Date()
        }
      
        console.log(savedata);
        
        
        
          await setDoc(doc(db, "posts", uid), {
            postTitle:postTitle.value,
            content:content.value, 
            uid:uid,
            time:  new Date()
          });
      
        //  inputs:inputs.value,
        //  text:text.value
        
        console.log("Document written with ID: ", uid);
          
        }else {
          console.error("User not authenticated");
      }
        
       
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
      document.getElementById("displayTitle").innerText = postTitle.value;
      document.getElementById("displayContent").innerText = content.value;
      document.getElementById("postForm").classList.add("hidden");

      document.getElementById("postDisplay").classList.remove("hidden");

     let getposts= document.createElement("button")
     getposts.setAttribute("id","allpost")
     getposts.setAttribute("class","w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10")
     getposts.textContent="Get All Post"
     let postDisplay = document.getElementById("postDisplay")
     postDisplay.appendChild(getposts)
     //let getpost = document.getElementById("allpost")

     getposts.addEventListener("click",async()=>{
      
      
         try {
             // const docRef = await addDoc(collection(db, "posts"), {
             //  inputs:inputs.value,
             //  text:text.value
             
             const querySnapshot = await getDocs(collection(db, "posts"));
             let postsContainer=document.getElementById("postDisplay")
     postsContainer.innerHTML = "";
             querySnapshot.forEach((doc) => {
             let docss=`${doc.id} => ${doc.data()}`
             let postData = doc.data();
             let postElement = document.createElement("div")
             postElement.classList = "bg-white shadow-lg rounded-lg p-6 mb-4";
     
             postElement.innerHTML= `<h2 class="text-2xl font-semibold text-gray-800 mb-2">${postData.postTitle}</h2>
             <p class="text-gray-700 mb-4">${postData.content}</p>
             <span class="text-gray-500 text-sm">Post ID: ${doc.id}</span>
         `;
             postsContainer.appendChild(postElement)
             
             });
          
           } catch (e) {
             console.error("Error adding document: ", e);
           }
         
          
     })
     let delpost= document.createElement("button")
     delpost.setAttribute("id","delpost")
     delpost.setAttribute("class","w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-10")
     delpost.textContent="Delete Post"
    // let postDisplay = document.getElementById("postDisplay")
     postDisplay.appendChild(delpost)
     delpost.addEventListener("click",async()=>{
     
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          await deleteDoc(doc(db, "posts", uid));
          console.log("Document deleted for user with ID:", uid);
         // const postElement=document.getElementById(`post-${uid}`)
         
         let postDisplay= document.getElementById("postDisplay")
         
         postDisplay.innerHTML="";
         
        } 
           
        //   }else{
        //     console.log("Post element not found")
        //   }
        // } else {
        //   console.log("No user is signed in.");
        // }
      } catch (e) {
        console.error("Error deleting document:", e);
      }
    });
  //location.href="showpost.js" 
})

// let getpost = document.getElementById("allpost")

// getpost.addEventListener("click",async()=>{
//     try {
//         // const docRef = await addDoc(collection(db, "posts"), {
//         //  inputs:inputs.value,
//         //  text:text.value
        
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         let postsContainer=document.getElementById("postsContainer")
// postsContainer.innerHTML = "";
//         querySnapshot.forEach((doc) => {
//         let docss=`${doc.id} => ${doc.data()}`
//         let postData = doc.data();
//         let postElement = document.createElement("div")
//         postElement.classList = "bg-white shadow-lg rounded-lg p-6 mb-4";

//         postElement.innerHTML= `<h2 class="text-2xl font-semibold text-gray-800 mb-2">${postData.postTitle}</h2>
//         <p class="text-gray-700 mb-4">${postData.content}</p>
//         <span class="text-gray-500 text-sm">Post ID: ${doc.id}</span>
//     `;
//         postsContainer.appendChild(postElement)
        
//         });
     
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
    
     
// })

// let delpost= document.getElementById("delpost")
// delpost.addEventListener("click",async()=>{
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//       const uid = user.uid;
//       await deleteDoc(doc(db, "posts", uid));
//       console.log("Document deleted for user with ID:", uid);
//     } else {
//       console.log("No user is signed in.");
//     }
//   } catch (e) {
//     console.error("Error deleting document:", e);
//   }
// });

    
let updpost = document.getElementById("updpost");

updpost.addEventListener("click", async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
  
  const userRef = doc(db, "posts", uid); 

  try {
  
    await updateDoc(userRef, {
      postTitle: prompt("Update title") ,
      content: prompt("Update content") 
    });
    console.log("Data updated successfully"); 
  } catch (e) {
    console.error("Error updating data:", e); 
  }
  } else {
    console.log("No user is signed in.");
    }

});