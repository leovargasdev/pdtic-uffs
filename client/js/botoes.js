import { Template } from 'meteor/templating';
// import { pdfMake } from 'pdfmake';
// var fs = require('fs');

Template.botoes.events({
    'click #gerar-sql': function(event){
        const result = Respostas.find({}, {sort:  {numero: 1}});
         result.forEach((resposta) => {
            console.log("\n\n\nUser: " + resposta.nome);
            for(let k = 1; k < 9; k++){
                const aux = 'questao'+k;
                obterRespostas(resposta[aux], k);
            }
        });
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

const obterRespostas = (respostas, nQuestao) =>{
    if(nQuestao < 4 || nQuestao == 7){
        if(respostas == 'Sem resposta'){
            console.log("Sem resposta");
        }else if(nQuestao == 3){
            console.log("[if] questão 3");
        } else {
            console.log("[if] questão " + nQuestao);
        }
    } else if(nQuestao > 3 && nQuestao < 8){
        for(r in respostas){
            if('c' in respostas[r]){
                console.log("sistema: " + respostas[r]['s'] + ", classificacao: " + respostas[r]['c']);
            }
        }
        console.log("[else if] questão " + nQuestao);
    } else {
        if(respostas == 'Sem resposta'){
            console.log("Sem resposta");
        } else {
            console.log("[else] questão " + nQuestao);
        }
    }
};
