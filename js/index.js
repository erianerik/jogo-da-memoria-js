let nullField = "";
let inputName = $(".form__input");

function htmlErro(mensagem) {
    return `<p class="error">${mensagem}</p>`;
}

function validationName() {
    if(inputName.val() == nullField) {
        inputName.parent().append(htmlErro("Campo inválido"));
        return false;
    }
    
    inputName.parent().find("p").remove();
    localStorage.setItem('nomeJogador', inputName.val());
    return true;
}

$(".form__submit").click(function() {
    if(validationName()) {
       $(".content__form").submit();
    }
})