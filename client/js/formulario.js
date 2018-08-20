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
// Essa localização eh para Estudante, docente e tecnicos.
var localizacaoGeral = [
    { loc: 'Campus Cerro Largo – RS' },
    { loc: 'Campus Chapecó – SC' },
    { loc: 'Campus Erechim – RS' },
    { loc: 'Campus Laranjeiras do Sul – PR' },
    { loc: 'Campus Realeza – PR' },
    { loc: 'Campus Passo Fundo - RS' }
];
// Essa localização eh somente para tecnicos.
var localizacaoTec = [
    { loc: 'Gabinete do Reitor' },
    { loc: 'Auditoria Interna' },
    { loc: 'Procuradoria Federal' },
    { loc: 'Procuradoria Educacional Institucional' },
    { loc: 'Assessoria para Assuntos Internacionais' },
    { loc: 'Diretoria de Comunicação' },
    { loc: 'Ouvidoria' },
    { loc: 'Pró-Reitoria de Graduação' },
    { loc: 'Pró-Reitoria de Pesquisa e Pós-Graduação' },
    { loc: 'Pró-Reitoria de Extensão e Cultura' },
    { loc: 'Pró-Reitoria de Administração e Infraestrutura' },
    { loc: 'Pró-Reitoria de Planejamento' },
    { loc: 'Pró-Reitoria de Assuntos Estudantis' },
    { loc: 'Pró-Reitoria de Gestão de Pessoas' },
    { loc: 'Secretaria Especial de Laboratórios' },
    { loc: 'Secretaria Especial de Obras' },
    { loc: 'Secretaria Especial de Tecnologia e Informação' }
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
var classificacao = {1: "Ruim", 2: "Razoável", 3: "Bom", 4: "Muito Bom", 5: "Ótimo", 6: "Não utilizo", 7: "Não conheço"}
var contadores;
var telaCadastro;
Template.formulario.onRendered(function() {
    contadores = {1: 0, 2: 0, 3: 0, 7: 0, 8: 0};
    novoBloco(4, false); // QUESTÃO 4
    novoBloco(5, false); // QUESTÃO 5
    novoBloco(6, false); // QUESTÃO 6
    telaCadastro = 0;
    renderizaTela(telaCadastro);
    $('select').material_select();
    $("#btn-nova-resposta-q1").text("Responder");
    $("#btn-nova-resposta-q2").text("Responder");
    $("#btn-nova-resposta-q3").text("Responder");
    $("#btn-nova-resposta-q7").text("Responder");
    $("#btn-nova-resposta-q8").text("Responder");
});

Template.formulario.events({
    'change #selectPerfil': function(event){
        let perfil = $("#selectPerfil").val();
        $('#selectLocalizacao').empty();
        let selectLoc = document.getElementById("selectLocalizacao");
        localizacaoGeral.forEach((local) => {
            let option = document.createElement("option");
            option.text = local['loc'];
            option.value = local['loc'];
            selectLoc.add(option);
        });
        if(perfil == 'tecnico'){
            localizacaoTec.forEach((local) => {
                let option = document.createElement("option");
                option.text = local['loc'];
                option.value = local['loc'];
                selectLoc.add(option);
            });
        }
        $('select').material_select();
    },
    'click #nova-resposta-q1': function(event){
        novoBloco(1, true);
    },
    'click #nova-resposta-q2': function(event){
        novoBloco(2, true);
    },
    'click #nova-resposta-q3': function(event){
        novoBloco(3, true);
        $('select').material_select();
    },
    'click #nova-resposta-q7': function(event){
        novoBloco(7, true);
    },
    'click #nova-resposta-q8': function(event){
        novoBloco(8, true);

    },
    'click #btn-avanca-cadastro': function(event){
        let perfil = $("#selectPerfil").val();
        let localizacao = $("#selectLocalizacao").val();
        let menssagemAlert = "";
        if(telaCadastro == 0){
            if(!perfil && !localizacao)    menssagemAlert = "Perfil e Localização";
            else if(!perfil)               menssagemAlert = "Perfil";
            else if(!localizacao)               menssagemAlert = "Localização";
            if(menssagemAlert !== ""){
                Bert.alert("Campo obrigatório: [" + menssagemAlert + "] não foi preenchido", "danger", "growl-top-right");
                return false;
            }
        }
        if(telaCadastro < 4){
            telaCadastro = telaCadastro + 1;
            renderizaTela(telaCadastro);
            jQuery('html, body').animate({scrollTop: 0}, 500);
        }
    },
    'click #btn-volta-cadastro': function(event){
        if(telaCadastro > 0){
            telaCadastro = telaCadastro - 1;
            renderizaTela(telaCadastro);
            jQuery('html, body').animate({scrollTop: 0}, 500);
        }
    },
    'submit .formulario-uffs': function(event){
        let respostas = {}
        let nomeIndividuo = event.target.nomeIndividuo.value || "Sem identificaçao";
        let perfil = event.target.perfilUFFS.value;
        let localizacao = event.target.localizacaoUFFS.value;
        if(isNotEmpty(perfil, "p") && isNotEmpty(localizacao, "c")){
            for(let question = 1; question < 9; question++)
                respostas[question] = obterRespostas(question, event.target);
            console.log(respostas);
            Meteor.call('novaResposta', nomeIndividuo, perfil, localizacao, respostas);
            Router.go("/obrigado");
        }
        return false;
    },
    "click #encerrar-sesao": function(event){
        Meteor.logout(function(err){
            if(err){
                Bert.alert(err.reason, "danger", "growl-top-right");
            }else{
                Bert.alert("Saiu de boas", "success", "growl-top-right");
                Router.go('/');
            }
        });
    },
})

var obterRespostas = function(nResposta, campo){
    let campos = {d: "descricao", j: "justificativa", s: "sistema", n: "necessidade"};
    let result = {};
    if(nResposta == 1 || nResposta == 2 || nResposta == 3 || nResposta == 7){
        for(let k = 0; k < contadores[nResposta]; k++){
            result[k] = {
                d: campo['r' + nResposta + campos['d'] + k].value.replace(/(\r\n|\n|\r)/gm," "),
                j: campo['r' + nResposta + campos['j'] + k].value.replace(/(\r\n|\n|\r)/gm," ")
            };
            if(nResposta == 3){
                result[k]['s'] = campo['r' + nResposta + campos['s'] + k].value;
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
    } else if(nResposta == 8){
        for(let k = 0; k < contadores[nResposta]; k++){
            result[k] = {
                n: campo['r' + nResposta + campos['n'] + k].value.replace(/(\r\n|\n|\r)/gm," ")
            };
        }
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
    if(tela == 4){
        document.getElementById("btn-enviar").style.display = "block";
        document.getElementById("btn-avanca-cadastro").style.display = "none";
    }else{
        if(tela == 0)
            document.getElementById("btn-volta-cadastro").style.display = "none";
        else
            document.getElementById("btn-volta-cadastro").style.display = "block";
        document.getElementById("btn-avanca-cadastro").style.display = "block";
        document.getElementById("btn-enviar").style.display = "none";
    }
}

var novoBloco = function(nQuestao, qIncremental){ // nQuestao = nº da questão, qIncremental = questões que pode-se incrementar várias respostas, caso ela for desse tipo tem um contador e a opção de notificação é habilitada
    let divResposta = "resposta-q" + nQuestao;

    let mDiv = document.getElementById(divResposta);
    const block_to_insert = document.createElement('div');
    block_to_insert.innerHTML = blocoForm(nQuestao);
    mDiv.appendChild( block_to_insert );
    mDiv.appendChild( document.createElement('br') );

    if(qIncremental){
        if(!contadores[nQuestao]) // Quando inserir um novo bloco, muda-se o rótulo do botão
            $("#btn-nova-resposta-q" + nQuestao).text("Nova Resposta");
        contadores[nQuestao] = contadores[nQuestao] + 1; // Incrementa-se o contador de input's de resposta da questão clicada
        Bert.alert("Nova resposta na questão ["+nQuestao+"]", "info", "growl-top-left");
    }
}

var blocoForm = function(nQuestao){
    let place = "";
    let perfil = $("#selectPerfil").val();
    if(nQuestao == 1){
        if(perfil == 'tecnico') place = '\nRelatório X no sistema Y com as seguintes informações.';
        else place = '\nComunicados do seu curso diretamente no portal do aluno';
    }else if(nQuestao == 2){
        if(perfil == 'tecnico') place = '\nComprovação de viagens com diárias e passagens.';
        else place = '\nEntrega de documentos para validação de ACCs.';
    }else if(nQuestao == 3){
        if(perfil == 'tecnico') place = '';
        else place = '\nConsulta de recebimento de auxílios no portal do aluno';
    }

    let contador = contadores[nQuestao];
    if(nQuestao == 1 || nQuestao == 2 || nQuestao == 7){ // QUESTÃO 1,2,7
        return('<div class="input-field col s12 m12 l6">\
                    <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea" placeholder="'+place+'"></textarea>\
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
                                <textarea id="r'+nQuestao+'descricao'+contador+'" class="materialize-textarea" placeholder="'+place+'"></textarea>\
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
        const rRadios = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 'NU', 7: 'NC'};
        const classLabel = {4:'col s12 m12 l5', 5:'col s5 m4 l5', 6: 'col s5 m4 l5'};
        // Rotúlo valores radio button
        result = '  <center class="form-radios-desktop">\
                        <div class="row">\
                            <div class="col l1 offset-l5">' + rRadios[1] + '</div>\
                            <div class="col l1">' + rRadios[2] + '</div>\
                            <div class="col l1">' + rRadios[3] + '</div>\
                            <div class="col l1">' + rRadios[4] + '</div>\
                            <div class="col l1">' + rRadios[5] + '</div>\
                            <div class="col l1">' + rRadios[6] + '</div>\
                            <div class="col l1">' + rRadios[7] + '</div>\
                        </div>\
                    </center>';
        itens.forEach((s) => {
            let aux = '<div class="row"><div class="' + classLabel[nQuestao] + '"><b>' + s['valor'] + ': </b></div>';
            for(let radioNum = 1; radioNum < 8; radioNum++){
                aux = aux + '<center>\
                                <div class="col s1 m1 l1">\
                                    <label>\
                                        <input value="' + radioNum + '" class="radio-form" name="r' + nQuestao + 'Grupo' + nGrupos + '" type="radio"/>\
                                        <span class="form-radios-mobile">' + rRadios[radioNum] + '</span>\
                                    </label>\
                                </div>\
                            </center>';
            }
            result = result + aux + '</div>';
            nGrupos = nGrupos + 1;
        });
        return result;
    } else { // QUESTÃO 8
        return ('   <div class="input-field col s12 m12 l12 xl12">\
                        <textarea id="r'+nQuestao+'necessidade'+contador+'" class="materialize-textarea"></textarea>\
                        <label for="r'+nQuestao+'necessidade'+contador+'">Necessidade</label>\
                    </div>\
        ');
    }
}

var isNotEmpty = function(valor, tipo){
    let alerta = "";
    if(tipo == "p") alerta = "Entidade";
    else if(tipo == "c") alerta = "Campus";

    if(valor && valor !== '') // Não está vazio
        return true;

    Bert.alert("Campo obrigatório: [" + alerta + "] não foi preenchido", "danger", "growl-top-right");
    return false;
};
