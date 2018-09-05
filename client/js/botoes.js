import { Template } from 'meteor/templating';
Template.botoes.events({
    'click #gerar-sql': function(event){
        const result = Respostas.find({}, {sort:  {numero: 1}});
         result.forEach((resposta) => {
            console.log("User: " + resposta.nome);
            if(resposta.questao1 == 'Sem resposta'){
                console.log("[Questão 1]: Sem resposta");
            } else {
                for(r in resposta.questao1){
                    console.log("[Questão 1] Descrição: " + resposta.questao1[r]['d']);
                    console.log("[Questão 1] Justificativa: " + resposta.questao1[r]['j']);
                }
            }
            console.log("\n");
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
