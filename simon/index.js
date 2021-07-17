

$(".start").on("click",startGame);
let sequence=[];
let userSequence=[];
let highscore;
let level=0;
let colors=['red','green','blue','yellow'];
let btnPressCount;
let newHighscore=false;
getHighScore();
function getHighScore(){
    let storage=localStorage.getItem("highscore");
    if(storage==null)
    {
        localStorage.setItem("highscore",0);
        highscore=0;
    }
    else{
        highscore=storage;
    }
    $(".highscore").text("level "+highscore);
}
function updateHighscore(){
    localStorage.setItem("highscore",level);
    getHighScore();
}
function startGame(){
    if(level==0){
        if(newHighscore){
            $(".celebrate").addClass("hidecelebrate");
            $(".celebrate-text").addClass("hidecelebrate-text"); 
            $(".celebrate").removeClass("showcelebrate");
            $(".celebrate-text").removeClass("showcelebrate-text"); 
            newHighscore=false;
            document.getElementById("celebrate").pause();
        }
    }
    level++;
    $(".currentscore").text(level);
    if(highscore<level){
        newHighscore=true;
        
        updateHighscore();
        
    }
    let randomNum=Math.floor(Math.random()*4);
    blinkColor(colors[randomNum]);
    sequence.push(colors[randomNum]);
    btnPressCount=0;
    $(".start").attr("disabled","true");
}

function blinkColor(color){
    $("."+color).addClass("highlight");
    document.getElementById(color).play();
    setTimeout(()=>{
        $("."+color).removeClass("highlight");
    },500)
}

$(".main").on("click",(evt)=>{
    
    if(level>0){
        btnPressCount++;
        let className= $(evt.target).attr('class');
        className=className.slice(0,className.indexOf(" main"));
        
        blinkColor(className);
        userSequence.push(className);
        // console.log("Sequence",sequence,"User Sequence",userSequence,"btn press count",btnPressCount,"level",level);
        checkSeq(btnPressCount);
    }
})

function checkSeq(btnPressCount){
    let wrong=0;
    for(let i=0;i<btnPressCount;i++)
    {
        if(sequence[i]!=userSequence[i]){
            wrong=1;
            break;
        }
    }
    if(wrong==1){
        document.getElementById("wrong").play();
        userSequence=[];
        sequence=[];
        level=0;
        // console.log("I am here"); 
        $(".start").removeAttr("disabled");
        if(newHighscore){
            document.getElementById("celebrate").play();
            $(".celebrate").removeClass("hidecelebrate");
            $(".celebrate-text").removeClass("hidecelebrate-text"); 
            $(".celebrate").addClass("showcelebrate");
            $(".celebrate-text").addClass("showcelebrate-text");
        }
    }
    else{
        if(btnPressCount==level){
            setTimeout(()=>{
                userSequence=[];
                startGame();
            },2000);
        }
        
        
    }
}

$('.reset').on("click",()=>{
    let confirmation=confirm("Are you sure you want to reset your highscore?");
    if(confirmation){
        localStorage.setItem("highscore",0);
        getHighScore();
    }
    
});