let dtComposta = function(){
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let dia = new Date().getDate();
    return (dia + "/" + mes + "/" + ano).toString();
}

if(Meteor.isServer){
    Meteor.methods({
        "novaResposta": function (papel, turno, respostas){
            const dataComposta = dtComposta();
            Respostas.insert({
                cargo: papel,
                turno: turno,
                respostas: respostas,
                data: dataComposta,
                createdAt: new Date(),
            });
        },
    });
}
