

$(".start").on("click",startGame);
let sequence=[];
let userSequence=[];
let highscore;
let level=0;
let colors=['red','green','blue','yellow'];
let btnPressCount;
let newHighscore=false;
let celebrateaudio;
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
            celebrateaudio.pause();
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
    let audio=new Audio("sounds/"+color+".mp3");
    audio.play();
    setTimeout(()=>{
        $("."+color).removeClass("highlight");
    },500)
}

$(".main").on("click",(evt)=>{
    
    if(level>0){
        btnPressCount++;
        let className= $(evt.target).attr('class');
        className=className.slice(0,className.indexOf(" main"));
        console.log(className);
        blinkColor(className);
        userSequence.push(className);
        console.log("Sequence",sequence,"User Sequence",userSequence,"btn press count",btnPressCount,"level",level);
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
        let audio=new Audio("sounds/wrong.mp3");
        audio.play();
        userSequence=[];
        sequence=[];
        level=0;
        console.log("I am here");
        $(".start").removeAttr("disabled");
        if(newHighscore){
            celebrateaudio=new Audio("sounds/celebration.wav");
            celebrateaudio.play();
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