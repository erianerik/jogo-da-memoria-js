let imagesCard = ["angularjs", "css3", "html5", "nodejs", "git", "git-hub"];
let container = $(".container");
let countActiveRotate = 0;
let countErrors = 0;

function htmlCard(imageName) {
    return `
    <section class="container__card not-active">
        <section class="card card-verso">
            <img src="./img/${imageName}.png" alt="" class="card-image memory">
        </section>

        <section class="card card-frente">
            <img src="./img/logo-brq.png" alt="" class="card-image">
        </section>
    </section>
`
}

function showCards() {
    for (let index = 0; index < 2 ; index++){
        imagesCard.sort(()=> Math.random() - 0.5);
    
        $.each(imagesCard, (index) => {
            container.append(htmlCard(imagesCard[index]));
        })
    }
}

function flipCards(cards) {
    setTimeout(() => $(".not-active").removeClass("rotate"), 1000);
};

function validationWin() {
    let active = 0;
    
    $.each($(".container__card"), (index, element) => {
        if(!$(element).is( ".not-active" )) {
            active += 1;
        }
    })

   $(".container__card").length == active;
};

function flipCardsInitial() {
    setTimeout(() => {
        $(".not-active").addClass("rotate")
        setTimeout(() => $(".not-active").removeClass("rotate"), 1000);
    }, 1000);
}


function removeClass(card) {
    $(card).removeClass("memory");
    $(card).parent().parent().removeClass("not-active")
}


function validationPoint(element) {
    let activeElements = element.parent().find(".rotate .memory");
    activeElements.length == 0 ? countActiveRotate = 0 : false;

    activeElements.sort(function(primaryCard, secondCard) {
        if($(primaryCard).attr("src") != $(secondCard).attr("src")) {
            countErrors += 1; 
            countActiveRotate = 0;
            flipCards()
            return true;
        }
        removeClass(primaryCard);
        removeClass(secondCard);
        countActiveRotate = 0;
        validationWin();
    })

};

$(function() {
    $(".player-name").text("Nome: " + localStorage.getItem("nomeJogador"));
    $(".errors").text("Quantidade de erros: " + countErrors);
    flipCardsInitial();
    showCards();
    
    $(".container__card").click(function() {
        countActiveRotate += 1;
        countActiveRotate <= 2 ? $(this).toggleClass("rotate") : false;
        countActiveRotate == 2 ?  validationPoint($(this)) : false;
        $(".errors").text("Quantidade de erros: " + countErrors);
    });
})
