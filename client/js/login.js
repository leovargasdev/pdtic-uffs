Template.login.events({
    "submit .form-signin": function(event){
        var email = retiraCaracteres(event.target.email.value);
        var senha = retiraCaracteres(event.target.password.value);

        // if(isNotEmpty(email) && isEmail(isNotEmpty) && isNotEmpty(senha)){
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

isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value))
		return true;
	Bert.alert("Por favor preencha um e-mail válido", "danger", "growl-top-right");
	return false;
};

var isNotEmpty = function(valor){
    if(valor && valor !== '') // Não está vazio
        return true;
    return false;
};
