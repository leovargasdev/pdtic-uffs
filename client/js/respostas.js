Template.respostas.helpers({
    res: function(){
        let result = Respostas.find({}, {sort:  {createdAt: -1}});
        return result;
    },
});
