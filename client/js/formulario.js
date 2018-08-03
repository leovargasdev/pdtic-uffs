import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var contador = 0;

Template.formulario.onRendered(function() {
    contador = 0;
});

Template.formulario.helpers({

});

Template.formulario.events({
    'click #novo-item': function(event){
        Bert.alert("Novo item", "info", "growl-bottom-left");

        let mDiv = document.getElementById('itens-servico');
        const block_to_insert = document.createElement('div');
        block_to_insert.innerHTML = blocoForm();
        mDiv.appendChild( block_to_insert );

        contador = contador + 1;
    },
    'submit .formulario-uffs': function(){
        // let aux = 'descItem' + 1;
        // let teste = event.target.testeForm.value;
        // let teste2 = event.target[aux].value;
        // alert("saida: " + saida);
    },
    'click #btn-teste': function(event){
        let aux = "";
        for (let i = 0; i < contador; i++) {
            aux = aux + " " + i;
        }
        Bert.alert("teste:" + aux, "danger", "growl-top-left");
    }
})

let blocoForm = function(){
    return('<div class="input-field col m12"><input name="descItem'+contador+'" type="text"><label for="descItem'+contador+'">Descrição</label></div>');
}
