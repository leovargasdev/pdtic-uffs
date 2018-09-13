Meteor.startup(function(){
    if (Meteor.users.find().count() === 0){
        // Super User
        console.log("[1] Usuário SUPER Criado");

    }
})
