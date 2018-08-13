Template.respostas.helpers({
    aux: function(){
        let result = Respostas.find({}, {sort:  {createdAt: -1}});
        let saida = [[]];
        // let contador = 0;
        // saida[0]['cargo'] = "leo";
        // saida[0]['numero'] = 1231;
        // saida[0]['agrvai'] = [];
        //
        // result.forEach((r) => {
        //     if(r.questao1 !== "Sem resposta"){
        //         for (const estado in r.questao1) {
        //             // novoBloco(r.questao1[estado]);
        //             saida[0]['agrvai'].push(r.questao1[estado]);
        //         }
        //     }
        // });

        return result;
    },
});

// var novoBloco = function(info){
//     let divResposta = "questao1-resposta";
//
//     let mDiv = document.getElementById(divResposta);
//     const block_to_insert = document.createElement('tr');
//     block_to_insert.innerHTML = "<td>" + info.d + "</td><td>" + info.j + "</td>";
//     mDiv.appendChild( block_to_insert );
// }
