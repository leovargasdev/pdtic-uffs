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
    { sistema: 'Sistema de Gestão Financeira e Contratos - SGF' },
];
var contadorQ1;
var contadorQ2;
var contadorQ3;

Template.formulario.onRendered(function() {
    contadorQ1 = 0;
    contadorQ2 = 0;
    contadorQ3 = 0;
    novoBloco(4, 0);
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
        let t = event.target.r4Grupo0.value;
        let t2 = event.target.r4Grupo1.value;
        console.log("valor do radio: " + t);
        console.log("valor do  2: " + t2);
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
        return('<div class="input-field col s12 m12 l6">\
        <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label></div><div class="input-field col s12 m12 l6"><textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'justificativa'+contador+'">Justificativa da necessidade</label></div>');
    } else if (nQuestao == 3){
        let result = '<div class="row"><div class="input-field col s12 m12 l6"><select name="r'+nQuestao+'sistema'+contador+'"><option value="outro" disabled selected>Outro</option>';
        sistemas.forEach((s) => {
            let opt = '<option value="' + s['sistema'] + '">' + s['sistema'] + '</option>';
            result = result + opt;
        });

        return(result + '</select><label for="r'+nQuestao+'sistema'+contador+'">Selecionar o Sistema</label></div></div><div class="row"><div class="input-field col s12 m12 l6"><textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label></div><div class="input-field col s12 m12 l6"><textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea><label for="r'+nQuestao+'justificativa'+contador+'">Justificativa</label></div></div>');
    } else if(nQuestao == 4){
        let result = '';
        let nGrupos = 0;
        sistemas.forEach((s) => {
            let aux = '<div class="row"><div class="col s12 m12 l4"><b>' + s['sistema'] + ': </b></div>';
            for(let radioNum = 1; radioNum < 8; radioNum++){
                if(radioNum < 6){
                    aux = aux + '<div class="col s1 m1 l1"><label><input value="' + radioNum + '" class="radio-form" name="r4Grupo' + nGrupos + '" type="radio"/><span>' + radioNum + '</span></label></div>';
                }else if(radioNum == 6){
                    aux = aux + '<div class="col s2 m2 l1"><label><input value="não uso" class="radio-form" name="r4Grupo' + nGrupos + '" type="radio"/><span>Não uso</span></label></div>';
                }else{
                    aux = aux + '<div class="col s3 m3 l2"><label><input value="não conheço" class="radio-form" name="r4Grupo' + nGrupos + '" type="radio"/><span>Não conheço</span></label></div>';
                }
            }
            result = result + aux + '</div>';
            nGrupos = nGrupos + 1;
        });
        return result;
    }
}
