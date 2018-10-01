import { Template } from 'meteor/templating';

var tuplas = [];

tuplas.push({ valor: 'CREATE TABLE identificacao_pdtic( id_usuario varchar, nome varchar, localizacao varchar(60), perfil varchar(10), CONSTRAINT identificacao_pdtic_pkey PRIMARY KEY (id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao1( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao2( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao3( descricao varchar, justificativa varchar, sistema varchar(60), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao4( sistema varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao5( servico varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao6( equipamento varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao7( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE questao8( consideracao varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});
tuplas.push({ valor: 'CREATE TABLE sem_resposta( num_questao int, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));'});

Template.sql.helpers({
    'respostas': function(){
        const result = Respostas.find({}, {sort:  {numero: 1}});
        result.forEach((resposta) => {
            const usuarioID = resposta._id;
            tuplas.push({ valor: "INSERT INTO identificacao_pdtic (id_usuario, nome, localizacao, perfil)  VALUES ('" + usuarioID + "', '" + resposta.nome + "', '" + resposta.localizacao + "', '" + resposta.papel + "');"});
            for(let k = 1; k < 9; k++){
                const aux = 'questao'+k;
                obterRespostas(usuarioID, resposta[aux], k);
            }
        });
        return tuplas;
    },
})

Template.botoes.events({
    'click #gerar-sql': function(event){
        const result = Respostas.find({}, {sort:  {numero: 1}});
            result.forEach((resposta) => {
                const usuarioID = resposta._id;
                console.log(usuarioID);
                // tuplas.push("INSERT INTO identificacao_pdtic (id_usuario, nome, localizacao, perfil)  VALUES ('" + usuarioID + "', '" + resposta.nome + "', '" + resposta.localizacao + "', '" + resposta.papel + "');");
                // for(let k = 1; k < 9; k++){
                //     const aux = 'questao'+k;
                //     obterRespostas(usuarioID, resposta[aux], k);
                // }
        });
        // console.log(tuplas);
        // Router.go("/text/"+tuplas);
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
        tuplas.push({ valor: "INSERT INTO sem_resposta (num_questao, id_usuario) VALUES (" + nQuestao + ", '"+ usuarioID + "');"});
    } else {
        for(r in respostas){
            if(nQuestao < 4 || nQuestao == 7){ // QUESTÕES: 1,2,3,7
                if(nQuestao == 3){
                    tuplas.push({ valor: "INSERT INTO questao3 (descricao, justificativa, sistema, id_usuario) VALUES ('" + respostas[r]['d'].replace(/[\']/g, "").replace(/"/g, "") + "', '" + respostas[r]['j'].replace(/[\']/g, "").replace(/"/g, "") + "', '" + respostas[r]['s'] + "', '" + usuarioID + "');"});
                } else {
                    tuplas.push({ valor: "INSERT INTO questao" + nQuestao + " (descricao, justificativa, id_usuario) VALUES ('" + respostas[r]['d'].replace(/[\']/g, "").replace(/"/g, "") + "', '" + respostas[r]['j'].replace(/[\']/g, "").replace(/"/g, "") + "', '"+ usuarioID + "');"});
                }
            } else if(nQuestao > 3 && nQuestao < 7){ // QUESTÕES: 4,5,6
                if('c' in respostas[r]){
                    let aux;
                    if(nQuestao == 4) aux = "sistema";
                    else if(nQuestao == 5) aux = "servico";
                    else aux = "equipamento";
                    tuplas.push({ valor: "INSERT INTO questao" + nQuestao + " (" + aux + ", classificacao, id_usuario) VALUES ('" + respostas[r]['s'] + "', '" + respostas[r]['c'] + "', '" + usuarioID + "');"});
                }
            } else { // QUESTÃO: 8
                tuplas.push({ valor: "INSERT INTO questao8 (consideracao, id_usuario) VALUES ('" + respostas[r]['n'].replace(/[\']/g, "").replace(/"/g, "") + "', '" + usuarioID + "');"});
            }
        }
    }
};
