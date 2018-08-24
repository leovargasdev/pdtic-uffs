Meteor.startup(function(){
    if (Meteor.users.find().count() === 0){
        // Super User
        Accounts.createUser({
            username: 'superUFFS',
            email: 'Super@user.com',
            password: 'uffspdtic007',
        });

        console.log("[1] Usuário SUPER Criado");

    }
})
