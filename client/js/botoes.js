import { Template } from 'meteor/templating';

var tuplas = [];

Template.botoes.events({
    'click #gerar-sql': function(event){
        const result = Respostas.find({}, {sort:  {numero: 1}});
            result.forEach((resposta) => {
                const usuarioID = resposta._id;
                tuplas.push("INSERT INTO identificacao_pdtic (id_usuario, nome, localizacao, perfil)  VALUES ('" + usuarioID + "', '" + resposta.nome + "', '" + resposta.localizacao + "', '" + resposta.papel + "');");
                for(let k = 1; k < 9; k++){
                    const aux = 'questao'+k;
                    obterRespostas(usuarioID, resposta[aux], k);
                }
        });
        Router.go("/text/"+tuplas);
    },
    'click #encerrar-sesao': function(event){
        Meteor.logout(function(err){
            if(err){
                Bert.alert(err.reason, "danger", "growl-top-right");
            }else{
                Bert.alert("Saiu de boas", "success", "growl-top-right");
                Router.go('/');
            }
        });
    },
});

const obterRespostas = (usuarioID, respostas, nQuestao) =>{
    if(respostas == 'Sem resposta'){
        tuplas.push("INSERT INTO sem_resposta (num_questao, id_usuario) VALUES (" + nQuestao + ", '"+ usuarioID + "');");
    } else {
        for(r in respostas){
            if(nQuestao < 4 || nQuestao == 7){ // QUESTÕES: 1,2,3,7
                if(nQuestao == 3){
                    tuplas.push("INSERT INTO questao3 (descricao, justificativa, sistema, id_usuario) VALUES ('" + respostas[r]['d'] + "', '" + respostas[r]['j'] + "', '" + respostas[r]['s'] + "', '" + usuarioID + "');");
                } else {
                    tuplas.push("INSERT INTO questao" + nQuestao + " (descricao, justificativa, id_usuario) VALUES ('" + respostas[r]['d'] + "', '" + respostas[r]['j'] + "', '"+ usuarioID + "');");
                }
            } else if(nQuestao > 3 && nQuestao < 7){ // QUESTÕES: 4,5,6
                if('c' in respostas[r]){
                    let aux;
                    if(nQuestao == 4) aux = "sistema";
                    else if(nQuestao == 5) aux = "servico";
                    else aux = "equipamento";
                    tuplas.push("INSERT INTO questao" + nQuestao + " (" + aux + ", classificacao, id_usuario) VALUES ('" + respostas[r]['s'].replace("/", "_") + "', '" + respostas[r]['c'] + "', '" + usuarioID + "');");
                }
            } else { // QUESTÃO: 8
                tuplas.push("INSERT INTO questao8 (consideracao, id_usuario) VALUES ('" + respostas[r]['n'] + "', '" + usuarioID + "');");
            }
        }
    }
};
