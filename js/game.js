let imagesCard = ["angularjs", "css3", "html5", "nodejs"];
let container = $(".container");

function htmlCard(imageName) {
    return `
    <section class="container__card">
        <section class="card card-verso">
            <img src="./img/${imageName}.png" alt="" class="card-image">
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

$(function() {
    showCards();
    
    $(".container__card").click(function() {
        $(this).toggleClass("rotate");
    });
})
