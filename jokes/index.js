$(document).ready(() => {
    $('.icon').on('click', () => {
        $('.main-content').toggleClass("overlay");
        $('.categories').toggleClass("categories-visible");
        $('.icon').toggleClass("icon-open");
        $('.item').each(function (i) {
            var elm = $(this);
            setTimeout(function () {
                elm.toggleClass('item-visible');
            }, i * 100);
        });

    });

    let localstore = localStorage.getItem("Category");
    if (localstore == null) {
        localStorage.setItem("Category", "Any");
        localstore = "Any";
    }


    $(".item").removeClass("active");
    $(`.item:contains('${localstore}')`).addClass("active");

    $(".item").on("click", (event) => {
        localstore = event.target.innerText;
        localStorage.setItem("Category", localstore);
        $(".item").removeClass("active");
        $(`.item:contains('${localstore}')`).addClass("active");
    })
    fetchJoke(localstore);


    $(".refresh").on("click", () => {
        fetchJoke(localstore);
    })

    


})

function fetchJoke(localstore) {
    $('.joke-container').addClass("animate-joke");
    setTimeout(()=>{
        fetch(`https://v2.jokeapi.dev/joke/${localstore}`).then((res) => {
            
            res.json().then(data => {
                $('.cat').text(data.category);
                if (data.type == 'single') {
                    $('.joke').text(data.joke);
                }
                else {
                    $('.joke').html(data.setup + "<br/><br/>" + data.delivery);
                    
                }
                $('.joke-container').removeClass("animate-joke");
            });
        })
    },500);
    
    
}




