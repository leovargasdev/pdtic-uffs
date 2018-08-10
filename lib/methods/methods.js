let dtComposta = function(){
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let dia = new Date().getDate();
    return (dia + "/" + mes + "/" + ano).toString();
}

if(Meteor.isServer){
    Meteor.methods({
        "novaResposta": function (papel, campus, respostas){
            const dataComposta = dtComposta();
            Respostas.insert({
                cargo: papel,
                campus: campus,
                questao1: respostas[1],
                questao2: respostas[2],
                questao3: respostas[3],
                questao4: respostas[4],
                questao5: respostas[5],
                questao6: respostas[6],
                questao7: respostas[7],
                questao8: respostas[8],
                data: dataComposta,
                createdAt: new Date(),
            });
        },
    });
}
