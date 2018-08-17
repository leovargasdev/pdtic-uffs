if(Meteor.isServer){
    Meteor.methods({
        "novaResposta": function (nomeIndividuo, papel, loc, respostas){
            let sNumero, aux = Respostas.findOne({}, {sort: {createdAt: -1}});
            if(aux) sNumero = aux['numero'];
            else sNumero = 0;
            Respostas.insert({
                numero: sNumero+1,
                nome: nomeIndividuo,
                papel: papel,
                localizacao: loc,
                questao1: respostas[1],
                questao2: respostas[2],
                questao3: respostas[3],
                questao4: respostas[4],
                questao5: respostas[5],
                questao6: respostas[6],
                questao7: respostas[7],
                questao8: respostas[8],
                createdAt: new Date(),
            });
        },
    });
}
