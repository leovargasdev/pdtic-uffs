Template.login.events({
    "submit .form-signin": function(event){
        var email = retiraCaracteres(event.target.email.value);
        var senha = retiraCaracteres(event.target.password.value);

        if(isNotEmpty(email) && isNotEmpty(senha)){
            Meteor.loginWithPassword(email, senha, function(err){
                if(err){
					Bert.alert(err.reason, "danger", "growl-top-right");
				} else {
					Router.go("/");
                    Bert.alert("Login com sucesso!!", "info", "growl-top-right");
				}
            });
        }
        return false;
    }
});

var retiraCaracteres = function(valor){
    return valor.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(valor){
    if(valor && valor !== '') // Não está vazio
        return true;
    return false;
};
