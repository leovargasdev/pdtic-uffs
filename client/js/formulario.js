import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var contadorQ1;
var contadorQ2;

Template.formulario.onRendered(function() {
    contadorQ1 = 0;
    contadorQ2 = 0;
});

Template.formulario.helpers({

});

Template.formulario.events({
    'click #nova-resposta-q1': function(event){
        novoBloco(1);
    },
    'click #nova-resposta-q2': function(event){
        novoBloco(2);
    },
    'submit .formulario-uffs': function(){
        return false;
    }
})

var novoBloco = function(nQuestao){
    let valorID_1 = "", valorID_2 = "", divResposta = "resposta-q" + nQuestao;
    if(nQuestao == 1){
        valorID_1 = "r1descricao"+ contadorQ1;
        valorID_2 = "r1justificativa"+ contadorQ1;
        contadorQ1 = contadorQ1 + 1;
    } else if(nQuestao == 2){
        valorID_1 = "r2descricao"+ contadorQ2;
        valorID_2 = "r2justificativa"+ contadorQ2;
        contadorQ2 = contadorQ2 + 1;
    }

    Bert.alert("Nova resposta na questão ["+nQuestao+"]", "info", "growl-top-left");

    let mDiv = document.getElementById(divResposta);
    const block_to_insert = document.createElement('div');
    block_to_insert.innerHTML = blocoForm(valorID_1, valorID_2);
    mDiv.appendChild( block_to_insert );

}

let blocoForm = function(valorID_1, valorID_2){
    return('<div class="input-field col s12 m6"><textarea id="'+valorID_1+'" class="materialize-textarea"></textarea><label for="'+valorID_1+'">Descrição detalhada</label></div><div class="input-field col s12 m6"><textarea id="'+valorID_2+'" class="materialize-textarea"></textarea><label for="'+valorID_2+'">Justificativa da necessidade</label></div>');
}
