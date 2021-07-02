let imagesCard = ["angularjs", "css3", "git-hub", "git", "html5", "nodejs"];
let container = $(".container");
let playerName = localStorage.getItem("playerNome");
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

function htmlWinPanel(playerName, countErrors) {
    return `
        <section class="win-panel">
            <h2 class="win-panel__message">Parabéns <span> ${playerName} </span> Você ganhou!</h2>
            <p class="win-panel__description">Você teve o total de erros de: ${countErrors}</p>
            <a class="win-panel__play-again">Jogar novamente</a>
        </section>
    `
}

function showCards() {
    for (let index = 0; index < 2 ; index++){
        imagesCard.sort(()=> Math.random() - 0.5);
    
        $.each(imagesCard, (index) => {
            container.append(htmlCard(imagesCard[index]));
        });
    }
}

function removeCards() {
    $.each($(".container__card"), () => {
        $(".container__card").remove();
    });
}

function flipCards(initial) {

    if(initial == "initial") {
        setTimeout(() => {
            $(".not-active").addClass("rotate")
            setTimeout(() => $(".not-active").removeClass("rotate"), 1000);
        }, 1000);

        return true;
    }

    setTimeout(() => $(".not-active").removeClass("rotate"), 1000);
};

function validationWin() {
    let active = 0;
    
    $.each($(".container__card"), (index, element) => {
        if(!$(element).is( ".not-active" )) {
            active += 1;
        }
    });

   $(".container__card").length == active ? $(".content").append(htmlWinPanel(playerName, countErrors)) : false;
};

function removeClass(card) {
    $(card).removeClass("memory");
    $(card).parent().parent().addClass("click-unbind").removeClass("not-active")
    $(card).parent().addClass("click-unbind");
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

let refreshGame = function refresh() {
    countActiveRotate = 0;
    countErrors = 0;
    
    $.each($(".container__card"), (index, elemnent) => {
        elemnent.remove();
    });
    
    showCards();
    flipCards("initial");
    $(".errors").text("Quantidade de erros: " + countErrors);
}

$(function() {
    $(".player-name").text("Nome: " + playerName);
    $(".errors").text("Quantidade de erros: " + countErrors);
    flipCards("initial");
    showCards();

    $(document).on("click", '.container__card', function() {
        if(!$(this).is(".click-unbind ")) {
            countActiveRotate += 1;
            countActiveRotate >= 3 ? countActiveRotate = countActiveRotate - 1  : false;
            countActiveRotate <= 2 ? $(this).toggleClass("rotate") : false;
            countActiveRotate == 2 ?  validationPoint($(this)) : false;
        }

        $(".errors").text("Quantidade de erros: " + countErrors);
    });

    $(".refresh").click(refreshGame);
    $(document).on("click", '.win-panel__play-again', function() {
        refreshGame();
        $(".win-panel").fadeOut();
    });
})
