Meteor.startup(function(){
    if (Meteor.users.find().count() === 0){
        // Super User
        Accounts.createUser({
            username: 'super',
            email: 'Super@user.com',
            password: 'uva007',
        });

        console.log("[1] Usuário SUPER Criado");

        Accounts.createUser({
            username: 'teste',
            email: 'teste@teste.com',
            password: 'teste',
        });

        console.log("[2] Usuário TESTE Criado");

    }
})
