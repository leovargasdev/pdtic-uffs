let dtComposta = function(){
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let dia = new Date().getDate();
    return (dia + "/" + mes + "/" + ano).toString();
}

if(Meteor.isServer){
    // Meteor.methods({
    //     "addServico": function (marca, modelo, cor, placa, renavam, servicoDetalhes, clienteID) {
    //         if(!Meteor.userId()){
    //             throw new Meteor.Error('Sem autorização');
    //             return false;
    //         }
    //         const dataComposta = dtComposta();
    //         let sNumero, aux = Servicos.findOne({}, {sort: {createdAt: -1}});
    //         if(aux) sNumero = aux['numero'];
    //         else sNumero = 0;
    //         Servicos.insert({
    //             numero: sNumero+1,
    //             cliente: clienteID,
    //             marca: marca,
    //             modelo: modelo,
    //             cor: cor,
    //             placa: placa,
    //             renavam: renavam,
    //             servicoDetalhes: servicoDetalhes,
    //             data: dataComposta,
    //             createdAt: new Date(),
    //         });
    //         const servico = Servicos.findOne({}, {sort: {createdAt: -1}});
    //         const cliente = Clientes.findOne({_id: clienteID});
    //         Clientes.update(cliente, { $addToSet: { servicos: servico['_id'] }});
    //     },
    // });
}
