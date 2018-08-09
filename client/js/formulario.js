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
var classificacao = {1: "Ruim", 2: "Razoável", 3: "Médio", 4: "Satisfatório", 5: "Ótimo", 6: "Não uso", 7: "Não conheço"}
var contadores;
var telaCadastro;
Template.formulario.onRendered(function() {
    contadores = {1: 0, 2: 0, 3: 0, 7: 0, 8: 0};
    novoBloco(4, 0, false); // QUESTÃO 4
    novoBloco(5, 0, false); // QUESTÃO 5
    novoBloco(6, 0, false); // QUESTÃO 6
    telaCadastro = 0;
    renderizaTela(telaCadastro);
    $('select').material_select();
});

Template.formulario.events({
    'click #nova-resposta-q1': function(event){
        novoBloco(1, contadores['1'], true);
        contadores['1'] = contadores['1'] + 1;
    },
    'click #nova-resposta-q2': function(event){
        novoBloco(2, contadores['2'], true);
        contadores['2'] = contadores['2'] + 1;
    },
    'click #nova-resposta-q3': function(event){
        novoBloco(3, contadores['3'], true);
        $('select').material_select();
        contadores['3'] = contadores['3'] + 1;
    },
    'click #nova-resposta-q7': function(event){
        novoBloco(7, contadores['7'], true);
        contadores['7'] = contadores['7'] + 1;
    },
    'click #nova-resposta-q8': function(event){
        novoBloco(8, contadores['8'], true);
        contadores['8'] = contadores['8'] + 1;
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
        let respostas = {}
        let papel = event.target.papelUFFS.value;
        let turno = event.target.turnoUFFS.value;
        for(let question = 1; question < 9; question++)
            respostas[question] = obterRespostas(question, event.target);
        console.log(respostas);
        Meteor.call('novaResposta', papel, turno, respostas);
        // return false;
    }
})

var obterRespostas = function(nResposta, campo){
    let campos = {d: "descricao", j: "justificativa", s: "sistema", n: "necessidade"};
    let result = {};
    if(nResposta == 1 || nResposta == 2 || nResposta == 3 || nResposta == 7 || nResposta == 8){
        for(let k = 0; k < contadores[nResposta]; k++){
            result[k] = {
                d: campo['r' + nResposta + campos['d'] + k].value,
                j: campo['r' + nResposta + campos['j'] + k].value
            };
            if(nResposta == 3){
                result[k]['s'] = campo['r' + nResposta + campos['s'] + k].value;
            }else if(nResposta == 8){
                result[k]['n'] = campo['r' + nResposta + campos['n'] + k].value;
            }
        }
    } else if(nResposta == 4 || nResposta == 5 || nResposta == 6){
        let grupo = 0;
        let itens = [];
        if(nResposta == 4)      itens = sistemas;
        else if(nResposta == 5) itens = servicos;
        else                    itens = equipamentos;
        itens.forEach((item) => {
            result[grupo] = {
                s: item['valor'],
                c: classificacao[campo['r' + nResposta + 'Grupo' + grupo].value]
            };
            grupo = grupo + 1;
        });
    }
    if(!Object.keys(result).length)
        return "Sem resposta";
    return result;
}

var renderizaTela = function(tela){
    for(let t = 0; t < 5; t++){
        if(t == tela)
            document.getElementById("questoes-tela-" + t).style.display = "block";
        else
            document.getElementById("questoes-tela-" + t).style.display = "none";
    }
    // if(tela == 4)
        document.getElementById("btn-enviar").style.display = "block";
    // else
    //     document.getElementById("btn-enviar").style.display = "none";
}

var novoBloco = function(nQuestao, contador, notificacao){
    let divResposta = "resposta-q" + nQuestao;

    if(notificacao)
        Bert.alert("Nova resposta na questão ["+nQuestao+"]", "info", "growl-top-left");

    let mDiv = document.getElementById(divResposta);
    const block_to_insert = document.createElement('div');
    block_to_insert.innerHTML = blocoForm(nQuestao, contador);
    mDiv.appendChild( block_to_insert );

}

var blocoForm = function(nQuestao, contador){
    if(nQuestao == 1 || nQuestao == 2 || nQuestao == 7){ // QUESTÃO 1,2,7
        return('<div class="input-field col s12 m12 l6">\
                    <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea"></textarea>\
                    <label for="r'+nQuestao+'descricao'+contador+'">Descrição detalhada</label>\
                </div>\
                <div class="input-field col s12 m12 l6">\
                    <textarea id="r'+nQuestao+'justificativa'+contador+'" class="materialize-textarea"></textarea>\
                    <label for="r'+nQuestao+'justificativa'+contador+'">Justificativa da necessidade</label>\
                </div>\
        ');
    } else if (nQuestao == 3){ // QUESTÃO 3
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
    } else if(nQuestao == 4 || nQuestao == 5 || nQuestao == 6){ // QUESTÃO 4,5,6
        let itens = [];
        if(nQuestao == 4)       itens = sistemas;
        else if(nQuestao == 5)  itens = servicos;
        else                    itens = equipamentos;
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
                                        <input value="' + radioNum + '" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span>Não uso</span>\
                                    </label>\
                                </div>';
                }else{
                    aux = aux + '<div class="col s3 m3 l2">\
                                    <label>\
                                        <input value="' + radioNum + '" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span>Não conheço</span>\
                                    </label>\
                                </div>';
                }
            }
            result = result + aux + '</div>';
            nGrupos = nGrupos + 1;
        });
        return result;
    } else { // QUESTÃO 8
        return ('   <div class="input-field col s12 m12 l6 xl4">\
                        <textarea id="r'+nQuestao+'necessidade'+contador+'" class="materialize-textarea"></textarea>\
                        <label for="r'+nQuestao+'necessidade'+contador+'">Necessidade</label>\
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
