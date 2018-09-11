Router.configure({
    layoutTemplate: 'home_pagina'
});
const a = new Date().getDate();
if(a < 12){
    Router.map(function(){
        this.route('formulario', {
            path: '/',
            Template: 'formulario'
        });
        this.route('respostas', {
            path: '/respostas',
            Template: 'respostas'
        });
        this.route('login', {
            path: '/login',
            Template: 'login'
        });
        this.route('obrigado', {
            path: '/obrigado',
            Template: 'obrigado'
        });
        this.route('txtFile', {
            where: 'server',
            path: '/text/:perdi',
            action: function() {
                var text = this.params.perdi;
                var filename = 'textfile' + '.sql';

                var headers = {
                    'Content-Type': 'text/plain',
                    'Content-Disposition': "attachment; filename=" + filename
                };

                this.response.writeHead(200, headers);
                return this.response.end(text);
            }
        });
    });
} else {
    Router.map(function(){
        this.route('encerrado', {
            path: '/',
            Template: 'encerrado'
        });
        this.route('respostas', {
            path: '/respostas',
            Template: 'respostas'
        });
        this.route('login', {
            path: '/login',
            Template: 'login'
        });
    });

}
