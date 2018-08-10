// Template.formulario.onRendered(function() {
//     let result = Respostas.find({}, {sort:  {createdAt: -1}});
//     console.log(result);
// });

Template.respostas.helpers({
    res: function(){
        let result = Respostas.find({}, {sort:  {createdAt: -1}});
        result.forEach((s) => {
            console.log(s);
        });
        return result;
    },
});
