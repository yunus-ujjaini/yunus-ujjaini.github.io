
//Code to handle Greetings
let greetings=["Hello!","Namaste!","Salaam!","Hola!","Bonjour!"]
let i=1;
let projectnamereceived;
setInterval(()=>{
    let greeting=document.getElementById("greeting");
    greeting.style.animation="hideText 0.5s 1 forwards";
    setTimeout(()=>{
        greeting.innerText=greetings[i];
        i++;
        if(i>=greetings.length)
        {
            i=0;
        }
        greeting.style.animation="bringText 0.5s 1 forwards";
    },1000)
    
},6000);



//Code to handle Cursor Actions

let cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", animation);
function animation (e){
    cursor.style.top = e.pageY  + "px";
    cursor.style.left = e.pageX  + "px";
  };


let makeBig=document.getElementById("bigCursor");

makeBig.addEventListener("mouseover",()=>{
    
    cursor.classList.add("cursor-grow");
})
makeBig.addEventListener("mouseleave",()=>{
    
    cursor.classList.remove("cursor-grow");
});

setInterval(addcursorlisteners,3000);

function addcursorlisteners(){
    let makeBigandChange=document.getElementsByClassName("image");
    let makeBig=document.getElementsByClassName("cursorBig");
  
    for(let k=0;k<makeBigandChange.length;k++)
    {
        makeBigandChange[k].addEventListener("mouseover",()=>{
        
            cursor.classList.add("cursor-grow-change");
        })
        makeBigandChange[k].addEventListener("mouseleave",()=>{
            
            cursor.classList.remove("cursor-grow-change");
        });
    }
    for(let m=0;m<makeBig.length;m++)
    {
        makeBig[m].addEventListener("mouseover",()=>{
        
            cursor.classList.add("cursor-grow");
        })
        makeBig[m].addEventListener("mouseleave",()=>{
            
            cursor.classList.remove("cursor-grow");
        });
    }
}






//Code to handle Scroll 


// // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
// setTimeout(()=>{
//     var lastScrollTop = 0;
//     window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
//         var st = window.pageYOffset 
//         if (st > lastScrollTop){
//            let introSec=document.getElementById("introSec");
//            introSec.classList.add("ScrollUp");
//            introSec.classList.remove("ScrollDown");
//         } else {
//            let introSec=document.getElementById("introSec");
//            introSec.classList.add("ScrollDown");
//            introSec.classList.remove("ScrollUp");
//         }
//         lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
//      }, false);
// },5000)


setTimeout(()=>{
    document.getElementById("main").style.display='flex';
},8000)
let scrolled=0;
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
            var st = window.pageYOffset 
            if(scrolled==0)
            {
                if (st > 50){
                    console.log("Executed");
                    let elem=document.getElementById("introSec");
                    elem.classList.remove("show");
                    elem.classList.add("hide");
                    scrolled=1;
                    setTimeout(()=>{
                        let elem2=document.getElementById("main");
                        elem2.scrollIntoView();
                        elem2.classList.add("main-visible");
                        let contact=document.getElementById("contact");
                        contact.classList.add("contact-visible");
                    },1000)
                    
                 }
                 
            }
            // else if(scrolled==1)
            // {
            //     if (st ==0 ){
            //         console.log("Executed");
            //         let elem=document.getElementById("introSec");
            //         elem.classList.remove("hide");
            //         elem.classList.add("show");
            //         scrolled=0;
            //      }
            // }
            
    
}, false);


//detect element in viewport
window.onscroll = function() {

    let el3=document.getElementsByClassName("proj");
    
        for(let m=7;m<el3.length;m++)
        {

            if(elementInViewport2(el3[m])==true)
            {
                setTimeout((t=m)=>{
                    if(el3[t].classList.contains("loadProj")==false)
                    {
                        console.log(`loading prog ${el3[t]}`);
                        el3[t].classList.add("loadProj");
                    }
                    
                },(m*10))
            }
            
            
        }
   
};
function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }



  //loading Images
let work=document.getElementById("work");


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
    readData();
    var projects;
    function readData()
    {
        
        let work=document.getElementById("work");
        work.innerHTML="";
        const dbRef = firebase.database().ref();
        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                projects=snapshot.child("myprojects").val();
            } else {
                console.log("No data available");
            }
        }).then(()=>{
                console.log(projects);
                for (let [key, value] of Object.entries(projects)) {
                    console.log(key,value);
                    storageRef.child(value['projName']+'/MainImg').getDownloadURL().then((url)=>{
                        work.innerHTML+=`<div class='proj ${value['category']}' data-attr='${value['projName']}' id='${value['projName']}'>
                            <img onclick="openDetails('${value['projName']}');" class="image" src="${url}" alt='${value['projName']}'>
                        </div>`;
                    });
                    
                }
    
        }).catch((error) => {
            console.error(error);
        });
        
        
    }

    function openDetails(projectName)
    {
        setTimeout(()=>{
            let work=document.getElementById("work");
            work.classList.add("work-dhide");

            console.log("Main display none");
        },2000)
        
        projectnamereceived=projectName;
        let projectDetails_Name=document.getElementById("projectDetails_Name");
        let projectDetails_MainImg=document.getElementById("projectDetails_MainImg");
        let projectDetails_Desc=document.getElementById("projectDetails_Desc");
        let projectDetails_Link=document.getElementById("projectDetails_Link");
        let projectDetails_SS=document.getElementById("projectDetails_SS");
        projectDetails_Name.innerHTML=projects[projectName]['projName'];
        storageRef.child(projects[projectName]['projName']+'/MainImg').getDownloadURL().then((url)=>{
            projectDetails_MainImg.innerHTML=`
                <img class="cursorBig" src="${url}" alt='${projects[projectName]['projName']}'>`;
        });
        projectDetails_SS.innerHTML="";
        for(let i=0;i<projects[projectName]['totalSS'];i++)
        {
            storageRef.child(projects[projectName]['projName']+'/SS'+(i+1)).getDownloadURL().then((url)=>{
                projectDetails_SS.innerHTML+=`<div class="project-ss">
                <img class="cursorBig" src="${url}" alt="${projects[projectName]['projName']}">
            </div>`;
            })
        }
        projectDetails_Desc.innerHTML=projects[projectName]['projectDesc'];
        projectDetails_Link.href=projects[projectName]['projLink'];

        document.getElementById("main").classList.add("haveLayer");
        console.log("Added Layer to main");
        setTimeout(()=>{
            document.getElementById("main").classList.remove("haveLayer");
            console.log("Remove Layer from main");
           

                document.getElementById("detailsSec").classList.remove("hideDetails");
                document.getElementById("detailsSec").classList.add("showDetails");
                let elem=document.getElementById("detailsSec");
                elem.scrollIntoView();
                console.log("Project display show");
            
            
        },1000)
       
    }
    function closeDetails()
    {   document.getElementById("detailsSec").classList.add("beforehideDetails");
        let work=document.getElementById("work");
        work.classList.remove("work-dhide");
        document.getElementById("detailsSec").classList.remove("showDetails");
        setTimeout(()=>{
            setTimeout(()=>{
                document.getElementById("detailsSec").classList.remove("beforehideDetails");
                document.getElementById("main").classList.add("removeLayer");
                document.getElementById("detailsSec").classList.add("hideDetails");
                let elem=document.getElementById(projectnamereceived);
                const yOffset = -30; 
                const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({top: y, behavior: 'smooth'});
                // elem.scrollIntoView();
                setTimeout(()=>{
                    document.getElementById("main").classList.remove("removeLayer");
                    
                },1500);
            },500);
        },500)
        

    }


function filter(filterstring){
    let btns=document.getElementsByClassName("filter-btn");
    for(let i=0;i<btns.length;i++)
    {
        btns[i].classList.remove("filter-btn-active");
    }
    let selectedBtn=document.getElementById(filterstring);
    selectedBtn.classList.add("filter-btn-active");

    let projects=document.getElementsByClassName("proj");
    for(let i=0;i<projects.length;i++)
    {   
        projects[i].classList.remove("filter-show");
        projects[i].classList.add("filter-hide");
        setTimeout((x=i)=>{
            projects[x].classList.add("filter-dhide");
        },500)
            
    }
    setTimeout(()=>{
        if(filterstring!='All')
        {
            for(let i=0;i<projects.length;i++)
            {
                if(projects[i].classList.contains(filterstring)==true)
                {   projects[i].classList.remove("filter-dhide");
                    
                    // setTimeout((x=i)=>{
                        projects[i].classList.remove("filter-hide");
                        projects[i].classList.add("filter-show");
                    // },500);
                
                }
            }
        }
        else{
            for(let i=0;i<projects.length;i++)
            {
                projects[i].classList.remove("filter-dhide")
                    
                    // setTimeout((x=i)=>{
                        projects[i].classList.remove("filter-hide");
                        projects[i].classList.add("filter-show");
                    // },500);
            }
        }
    },1000)
    
    
    
}

// function HandleBackFunctionality()
// {
//     console.log("Im In back button functionality");
//     if(window.event)
//    {
//         if(window.event.clientX < 40 && window.event.clientY < 0)
//         {
//             closeDetails();
//         }
//         else
//         {
//             closeDetails();
//         }
//     }
//     else
//     {
//         if(event.currentTarget.performance.navigation.type == 1)
//         {
//             closeDetails();
//         }
//         if(event.currentTarget.performance.navigation.type == 2)
//         {
//             closeDetails();
//         }
//     }
// }

if (window.history && window.history.pushState) {
    setTimeout(()=>{
        window.history.pushState("forward", null, "./#forward");
    },1000)
    

    window.onpopstate = function(event) {
        if(document.getElementById("detailsSec").classList.contains("showDetails")==true)
        {
            let backbtn=document.getElementById("detailsSec");
            backbtn.scrollIntoView({ behavior: 'smooth' });
            setTimeout(()=>{
                closeDetails();
                window.history.pushState("forward", null, "./#forward");
            },1000)
            
        }
      };
}