if(Meteor.isServer){
    Meteor.publish('Respostas', function(){
        if(!this.userId){
            return false;
            throw new Meteor.Error('Não tem autorização!!');
        }
        return Respostas.find();
    });
}
