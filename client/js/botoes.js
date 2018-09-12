import { Template } from 'meteor/templating';

var cabecarioSQL = "
CREATE TABLE identificacao_pdtic( \
    id_usuario uuid,\
    nome varchar,\
    localizacao varchar(60),\
    perfil varchar(10)\
);\

CREATE TABLE questao1_pdtic(\
    descricao varchar,\
    justificativa varchar,\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao2_pdtic(\
    descricao varchar,\
    justificativa varchar,\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao3_pdtic(\
    descricao varchar,\
    justificativa varchar,\
    sistema varchar(60),\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao4_pdtic(\
    sistema varchar(60),\
    classificacao varchar(14),\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao5_pdtic(\
    servico varchar(60),\
    classificacao varchar(14),\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao6_pdtic(\
    equipamento varchar(60),\
    classificacao varchar(14),\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao7_pdtic(\
    descricao varchar,\
    justificativa varchar,\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE questao8_pdtic(\
    consideracao,\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);\
CREATE TABLE sem_resposta(\
    num_questao int,\
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),\
);";

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
        let olar = "olar";
        Router.go("/text/"+cabecarioSQL);
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
