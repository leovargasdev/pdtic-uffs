if(Meteor.isServer){
    Meteor.methods({
        // 'validaRecaptcha': function(response){
        //     const privatekey = '6LeFq2gUAAAAAEMwbcr3gjINZHaUxsRgcSS-R4MA';
        //     const result = verifyCaptcha(privatekey, this.connection.clientAddress, response);
        //     return result;
        // },
        'novaResposta': function (nomeIndividuo, papel, loc, respostas){
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
    // function verifyCaptcha(privatekey, clientIP, response) {
    //     var serialized_captcha_data =
    //     'secret=' + privatekey +
    //     '&remoteip=' + clientIP +
    //     '&response=' + response;
    //
    //     var captchaVerificationResult = null;
    //     try {
    //         captchaVerificationResult = HTTP.call("POST", "https://www.google.com/recaptcha/api/siteverify", {
    //             content: serialized_captcha_data.toString('utf8'),
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 'Content-Length': serialized_captcha_data.length
    //             }
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         return { 'success': false, 'error-codes': 'reCaptcha service not available'};
    //     }
    //     return captchaVerificationResult;
    // };
}
