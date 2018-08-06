import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var sistemas = [
    { sistema: 'Sistema de Gestão Acadêmica - SGA' },
    { sistema: 'Sistema de Gestão da Pós-Graduação - SGP' },
    { sistema: 'Portal do Aluno' },
    { sistema: 'Portal do Professor' },
    { sistema: 'Sistema de Cartões Institucionais - SCI' },
    { sistema: 'Moodle Acadêmico' },
    { sistema: 'Moodle Colaboração' },
    { sistema: 'Sistema de Gestão de Projetos PRISMA' },
    { sistema: 'Sistema de Auxílios Socioeconômicos - SAS' },
    { sistema: 'Sistema Eletrônico de Informações - SEI' },
    { sistema: 'Sistema de Gestão do Organograma' },
    { sistema: 'Sistema de Gestão de Certificados Eletrônicos - SGCE' },
    { sistema: 'Sistema de Gestão de Dados da PROGESP - SPA' },
    { sistema: 'Sistema de Gestão de Processos e Documentos - SGPD' },
    { sistema: 'Sistema de Almoxarifado - ALX' },
    { sistema: 'Sistema de Informações Patrimoniais - SIP' },
    { sistema: 'Sistema de Compras e Licitações - SCL' },
    { sistema: 'Sistema de Gestão Financeira e Contratos - SGF/CONTRATOS' },
];
var contadorQ1;
var contadorQ2;
var contadorQ3;

Template.formulario.onRendered(function() {
    contadorQ1 = 0;
    contadorQ2 = 0;
    contadorQ3 = 0;
});

Template.formulario.helpers({

});

Template.formulario.events({
    'click #nova-resposta-q1': function(event){
        novoBloco(1, contadorQ1);
        contadorQ1 = contadorQ1 + 1;
    },
    'click #nova-resposta-q2': function(event){
        novoBloco(2, contadorQ2);
        contadorQ2 = contadorQ2 + 1;
    },
    'click #nova-resposta-q3': function(event){
        novoBloco(3, contadorQ3);
        $('select').material_select();
        contadorQ3 = contadorQ3 + 1;
    },
    'submit .formulario-uffs': function(){
        return false;
    }
})

var novoBloco = function(nQuestao, contador){
    let divResposta = "resposta-q" + nQuestao;

    Bert.alert("Nova resposta na questão ["+nQuestao+"]", "info", "growl-top-left");

    let mDiv = document.getElementById(divResposta);
    const block_to_insert = document.createElement('div');
    block_to_insert.innerHTML = blocoForm(nQuestao, contador);
    mDiv.appendChild( block_to_insert );

}

let blocoForm = function(nQuestao, contador){
    if(nQuestao == 1 || nQuestao == 2){
        return('<div class="input-field col s12 m6"><textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label></div><div class="input-field col s12 m6"><textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'justificativa'+contador+'">Justificativa da necessidade</label></div>');
    } else if (nQuestao == 3){
        let result = '<div class="row"><div class="input-field col s12 m5"><select name="r'+nQuestao+'sistema'+contador+'"><option value="outro" disabled selected>Outro</option>';
        sistemas.forEach((s) => {
            let opt = '<option value="' + s['sistema'] + '">' + s['sistema'] + '</option>';
            result = result + opt;
        });

        return(result + '</select><label for="r'+nQuestao+'sistema'+contador+'">Selecionar o Sistema</label></div></div><div class="row"><div class="input-field col s12 m6"><textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label></div><div class="input-field col s12 m6"><textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'justificativa'+contador+'">Justificativa</label></div></div>');
    }
}
