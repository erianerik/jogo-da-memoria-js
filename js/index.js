let nullField = "";
let inputName = $(".form__input");
localStorage.removeItem("playerNome");
function htmlErro(mensagem) {
    return `<p class="error">${mensagem}</p>`;
}

function validationName() {
    if(inputName.val() == nullField) {
        inputName.parent().append(htmlErro("Campo inválido"));
        return false;
    }
    
    inputName.parent().find("p").remove();
    localStorage.setItem('playerNome', inputName.val());
    return true;
}

$(".form__submit").click(function() {
    if(validationName()) {
       $(".content__form").submit();
    }
})