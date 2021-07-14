setTimeout(()=>{
    let dices=document.querySelectorAll(".dice");
    dices[0].classList.remove("slideIn");
    dices[0].classList.remove("onlybg");
    dices[1].classList.remove("slideIn");
    dices[1].classList.remove("onlybg");
},700)
function addDice(){
    let dices=document.querySelector(".dices");
    let dice=document.createElement("div");
    dice.classList.add("dice");
    dice.classList.add("slideIn");
    dice.classList.add("onlybg");
    dice.classList.add(`circle${Math.floor(Math.random()*6)+1}`)
    dices.appendChild(dice);
    let totalDices=document.querySelectorAll(".dice");
    document.querySelector(".remove").disabled=false;
    if(totalDices.length == 6)
    {
        document.querySelector(".add").disabled=true;
    }
    setTimeout(()=>{
        dice.classList.remove("slideIn");
        dice.classList.remove("onlybg");
    },500)
}

function removeDice(){
    document.querySelector(".dice:last-child").classList.add("slideOut");
    setTimeout(()=>{
        document.querySelector(".dice:last-child").remove();
        document.querySelector(".add").disabled=false;
        let totalDices=document.querySelectorAll(".dice");
        
        if(totalDices.length == 1)
        {
            document.querySelector(".remove").disabled=true;
        }
    },500);
    
}
function toss(){
    let dices=document.querySelectorAll(".dice");
    let Random=new Array(dices.length);
    for(let i=0;i<dices.length;i++){
        dices[i].classList.add("default");
        let unique;
        do{
            unique=true;
            Random[i]=Math.floor(Math.random()*6)+1;
            for(j=0;j<i;j++){
                if(Random[j]==Random[i])
                {
                    unique=false;
                    break;
                }
            }
        }while(unique!=true);
        setTimeout(()=>{
            dices[i].className=`dice circle${Random[i]}`;
            // dices[i].classList.add(`circle${Random[i]}`);
            setTimeout(()=>{
                dices[i].classList.remove("default");
            },50)
        },1000)

    }
    
    
}
