 // Set the configuration for your app
  // TODO: Replace with your project's config object

  var config = {
    apiKey: "AIzaSyDkqshvwgt7-YCcUB9hrUQUdJLk852OMjw",
    authDomain: "yunusujjainiportfolio.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://yunusujjainiportfolio-default-rtdb.firebaseio.com/",
    storageBucket: "gs://yunusujjainiportfolio.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

var user;
  function signIn(){
    firebase.auth().signInWithEmailAndPassword(document.getElementById("username").value, document.getElementById("password").value)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log(user);
      document.getElementById("login").style.display="none";
      document.getElementById("addDetailsSec").style.display='flex';
      document.getElementById("addDetailsSec").style.flexDirection='column';
      setTimeout(readData,5000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Incorrect Username or password");
    });
  }



  function signout(){
    firebase.auth().signOut().then(() => {
        
        document.getElementById("login").style.display="flex";
        document.getElementById("addDetailsSec").style.display='none';
      }).catch((error) => {
        alert("Something Went Wrong");
      });
      
  }


  function addss(){
      console.log("imin");
      let ssarea=document.getElementById("screenshots");
      let div=document.createElement("div");
      div.classList.add("newSSdiv")
      let input=document.createElement("input");
      input.classList.add("ss");
      input.type="file";
      let removebtn=document.createElement("button");
      removebtn.innerText="Remove";
      removebtn.classList.add("adddetailcontrols")
      removebtn.addEventListener("click",()=>{
        console.log("removecalled");
          ssarea.removeChild(div);
      });
      div.appendChild(input);
      div.appendChild(removebtn);
      ssarea.appendChild(div);
  }

  function uploadNewProj(){
      let projName=document.getElementById("projectname").value;
      let category=document.getElementById("category").value;
      let projDesc=document.getElementById("projectdesc").value;
      let projLink=document.getElementById("projectlink").value;
    //   let projMainImg=document.getElementById("mainimg").value;
      let ss=document.getElementsByClassName("ss");
      let sscollection=[];
      for(let i=0;i<ss.length;i++)
      {
          sscollection.push(ss[i].value);
      }
    writeUserData(projName,category,projDesc,projLink,ss.length);
    var imageref = storageRef.child(projName+'/MainImg');

    
    imageref.put(document.getElementById("mainimg").files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }); 

    for(let j=0;j<ss.length;j++)
    {
        var imageref = storageRef.child(projName+'/SS'+(j+1));
        imageref.put(ss[j].files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }); 
    }
    
    setTimeout(readData(),5000);

}

function writeUserData(projName,category,projDesc,projLink,sslength) {
    firebase.database().ref('myprojects/'+projName).set({
        "projName":projName,
        "category" : category,
        "projectDesc": projDesc,
        "projLink":projLink,
        "totalSS":sslength
    });
}

function readData()
{
    var projects;
    const dbRef = firebase.database().ref();
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            projects=snapshot.child("myprojects").val();
        } else {
            console.log("No data available");
        }
    }).then(()=>{
            let node=document.getElementById("projects");
            node.innerHTML="";
            
            console.log(projects);
            let projectsLength=Object.keys(projects).length;
            for (let [key, value] of Object.entries(projects)) {
                console.log("I am in");
                let projectdiv=document.createElement("div");
                projectdiv.classList.add("project");
                let projNamep=document.createElement("p");
                projNamep.classList.add("projectcontrol");
                projNamep.innerText=value['projName'];
                let projCatp=document.createElement("p");
                projCatp.classList.add("projectcontrol");
                projCatp.innerText=value['category'];
                let projDesp=document.createElement("p");
                projDesp.classList.add("projectcontrol");
                projDesp.innerText=value['projectDesc'];
                let projLinkp=document.createElement("p");
                projLinkp.classList.add("projectcontrol");
                projLinkp.innerText=value['projLink'];
                projectdiv.appendChild(projNamep);
                projectdiv.appendChild(projCatp);
                projectdiv.appendChild(projDesp);
                projectdiv.appendChild(projLinkp);
                
                let imagesDiv=document.createElement("div");
                imagesDiv.classList.add("images");
                storageRef.child(value['projName']+'/MainImg').getDownloadURL().then((url)=>{
                    
                    let mainImg=document.createElement("img");
                    mainImg.src=url;
                    mainImg.alt=value['projName'];
                    let ssImages=new Array(value['totalSS']);
                    imagesDiv.appendChild(mainImg);
                    for(let j=0;j<value['totalSS'];j++)
                    {
                        storageRef.child(value['projName']+'/SS'+(j+1)).getDownloadURL().then((url)=>{
                            ssImages[j]=document.createElement("img");
                            ssImages[j].src=url;
                            ssImages[j].alt=value['projName'];
                            imagesDiv.appendChild(ssImages[j]);
                        })
                    }
                    
                    projectdiv.appendChild(imagesDiv);
                    // for(let j=0;j<value['totalSS'];j++)
                    // {
                    //     imagesDiv.appendChild(ssImages[j]);
                    // }
                }).then(()=>{
                    let cardActionDiv=document.createElement("div");
                    cardActionDiv.classList.add("action");
                    var spanbtn1 = document.createElement('span');
                    spanbtn1.innerHTML = `<button class='edit' onclick="edit('${value['projName']}')">Edit</button>`;
                    var spanbtn2 = document.createElement('span');
                    spanbtn2.innerHTML = `<button class='delete' onclick="del('${value['projName']}')">Delete</button>`;
                    // let editbtn=document.createElement("button");
                    // editbtn.onclick=edit(); 
                    // editbtn.classList.add("edit");
                    // editbtn.innerHTML="Edit";
                    // let delbtn=document.createElement("button");
                    // delbtn.onclick=del(value['projName']);
                    // delbtn.classList.add("delete");
                    // delbtn.innerHTML='Delete';
                    cardActionDiv.appendChild(spanbtn1);
                    cardActionDiv.appendChild(spanbtn2);
                    projectdiv.appendChild(cardActionDiv);
                }).then(()=>{
                    node.appendChild(projectdiv);
                })
                
                
               
                
            }

    }).catch((error) => {
    console.error(error);
    });
    
    
}

function edit(projName){
    console.log("Edit :" +projName)
}
function del(projName){
    console.log("del :" +projName)
    const dbRef = firebase.database().ref();
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            projects=snapshot.child("myprojects").val();
        } else {
            console.log("No data available");
        }
    }).then(()=>{
        console.log(projects[projName]['totalSS']);
        var delref = storageRef.child(projects[projName]['projName']+'/MainImg');
        // Delete the file
        delref.delete().then(() => {
            console.log("file deleted");
            
        }).catch((error) => {
            console.log(error);
        // Uh-oh, an error occurred!
        });
        for (let i = 0; i < projects[projName]['totalSS']; i++) {
            
            let delref2 = storageRef.child(projName+'/SS'+(i+1));
            // Delete the file
            delref2.delete().then(() => {
                console.log("file deleted");
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });
        }
        firebase.database().ref('myprojects/'+projName).remove();
        setTimeout(readData(),5000);
    });
   

}


