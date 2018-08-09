import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var sistemas = [
    { valor: 'Sistema de Gestão Acadêmica - SGA' },
    { valor: 'Sistema de Gestão da Pós-Graduação - SGP' },
    { valor: 'Portal do Aluno' },
    { valor: 'Portal do Professor' },
    { valor: 'Sistema de Cartões Institucionais - SCI' },
    { valor: 'Moodle Acadêmico' },
    { valor: 'Moodle Colaboração' },
    { valor: 'Sistema de Gestão de Projetos PRISMA' },
    { valor: 'Sistema de Auxílios Socioeconômicos - SAS' },
    { valor: 'Sistema Eletrônico de Informações - SEI' },
    { valor: 'Sistema de Gestão do Organograma' },
    { valor: 'Sistema de Gestão de Certificados Eletrônicos - SGCE' },
    { valor: 'Sistema de Gestão de Dados da PROGESP - SPA' },
    { valor: 'Sistema de Gestão de Processos e Documentos - SGPD' },
    { valor: 'Sistema de Almoxarifado - ALX' },
    { valor: 'Sistema de Informações Patrimoniais - SIP' },
    { valor: 'Sistema de Compras e Licitações - SCL' },
    { valor: 'Sistema de Gestão Financeira e Contratos - SGF' }
];

var servicos = [
    { valor: 'VPN' },
    { valor: 'Internet' },
    { valor: 'WIFI' },
    { valor: 'webmail' },
    { valor: 'Telefonia' },
    { valor: 'Videoconferência' },
    { valor: 'Suporte a sistemas' }
];

var equipamentos = [
    { valor: 'Computadores Desktop' },
    { valor: 'Notebooks' },
    { valor: 'Impressoras' }
];

var contadorQ1;
var contadorQ2;
var contadorQ3;
var contadorQ7;
var contadorQ8;
var telaCadastro;
Template.formulario.onRendered(function() {
    contadorQ1 = 0;
    contadorQ2 = 0;
    contadorQ3 = 0;
    contadorQ7 = 0;
    contadorQ8 = 0;
    novoBloco(4, 0); // QUESTÃO 4
    novoBloco(5, 0); // QUESTÃO 5
    novoBloco(6, 0); // QUESTÃO 6
    telaCadastro = 0;
    renderizaTela(telaCadastro);
    $('select').material_select();
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
    'click #nova-resposta-q7': function(event){
        novoBloco(7, contadorQ7);
        contadorQ7 = contadorQ7 + 1;
    },
    'click #nova-resposta-q8': function(event){
        novoBloco(8, contadorQ8);
        contadorQ8 = contadorQ8 + 1;
    },
    'click #btn-avanca-cadastro': function(event){
        if(telaCadastro < 4){
            telaCadastro = telaCadastro + 1;
            renderizaTela(telaCadastro);
        }
    },
    'click #btn-volta-cadastro': function(event){
        if(telaCadastro > 0){
            telaCadastro = telaCadastro - 1;
            renderizaTela(telaCadastro);
        }
    },
    'submit .formulario-uffs': function(){
        let t = event.target.r4Grupo0.value;
        let t2 = event.target.r4Grupo1.value;
        console.log("valor do radio: " + t);
        console.log("valor do  2: " + t2);
        return false;
    }
})

var renderizaTela = function(tela){
    for(let t = 0; t < 5; t++){
        if(t == tela)
            document.getElementById("questoes-tela-" + t).style.display = "block";
        else
            document.getElementById("questoes-tela-" + t).style.display = "none";
    }
    if(tela == 4)
        document.getElementById("btn-enviar").style.display = "block";
    else
        document.getElementById("btn-enviar").style.display = "none";
}

var novoBloco = function(nQuestao, contador){
    let divResposta = "resposta-q" + nQuestao;

    Bert.alert("Nova resposta na questão ["+nQuestao+"]", "info", "growl-top-left");

    let mDiv = document.getElementById(divResposta);
    const block_to_insert = document.createElement('div');
    block_to_insert.innerHTML = blocoForm(nQuestao, contador);
    mDiv.appendChild( block_to_insert );

}

let blocoForm = function(nQuestao, contador){
    if(nQuestao == 1 || nQuestao == 2 || nQuestao == 7){
        return('<div class="input-field col s12 m12 l6">\
                    <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea>\
                    <label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label>\
                </div>\
                <div class="input-field col s12 m12 l6">\
                    <textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea>\
                    <label for="r'+nQuestao+'justificativa'+contador+'">Justificativa da necessidade</label>\
                </div>\
        ');
    } else if (nQuestao == 3){
        let result = '  <div class="row">\
                            <div class="input-field col s12 m12 l6">\
                                <select name="r'+nQuestao+'sistema'+contador+'">\
                                    <option value="outro" disabled selected>Outro</option>';
        sistemas.forEach((s) => {
            let opt =              '<option value="' + s['valor'] + '">' + s['valor'] + '</option>';
            result = result + opt;
        });

        return(result +         '</select><label for="r'+nQuestao+'sistema'+contador+'">Selecionar o Sistema</label>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="input-field col s12 m12 l6">\
                                <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea>\
                                <label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label>\
                            </div>\
                            <div class="input-field col s12 m12 l6">\
                                <textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea>\
                                <label for="r'+nQuestao+'justificativa'+contador+'">Justificativa</label>\
                            </div>\
                        </div>\
        ');
    } else if(nQuestao == 4 || nQuestao == 5 || nQuestao == 6){
        let itens = [];
        if(nQuestao == 4) itens = sistemas;
        else if(nQuestao == 5) itens = servicos;
        else itens = equipamentos;

        let result = '';
        let nGrupos = 0;
        itens.forEach((s) => {
            let aux = '<div class="row"><div class="col s12 m12 l4"><b>' + s['valor'] + ': </b></div>';
            for(let radioNum = 1; radioNum < 8; radioNum++){
                if(radioNum < 6){
                    aux = aux + '<div class="col s1 m1 l1">\
                                    <label><input value="' + radioNum + '" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span>' + radioNum + '</span>\
                                    </label>\
                                </div>';
                }else if(radioNum == 6){
                    aux = aux + '<div class="col s2 m2 l1">\
                                    <label>\
                                        <input value="não uso" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span>Não uso</span>\
                                    </label>\
                                </div>';
                }else{
                    aux = aux + '<div class="col s3 m3 l2">\
                                    <label>\
                                        <input value="não conheço" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span>Não conheço</span>\
                                    </label>\
                                </div>';
                }
            }
            result = result + aux + '</div>';
            nGrupos = nGrupos + 1;
        });
        return result;
    } else {
        return ('   <div class="input-field col s12 m12 l6 xl4">\
                        <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea>\
                        <label for="r'+nQuestao+'descricao'+contador+'">Necessidade</label>\
                    </div>\
                    <div class="input-field col s12 m12 l6 xl4">\
                        <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea>\
                        <label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label>\
                    </div>\
                    <div class="input-field col s12 m12 l12 xl4">\
                        <textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea>\
                        <label for="r'+nQuestao+'justificativa'+contador+'">Justificativa da necessidade</label>\
                    </div>\
        ');
    }
}
