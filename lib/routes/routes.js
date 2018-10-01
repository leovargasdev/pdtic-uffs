Router.configure({
    layoutTemplate: 'home_pagina'
});
let ativado = false;
if(ativado){
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
        this.route('sql', {
            path: '/sql',
            Template: 'sql'
        });
        // this.route('txtFile', {
        //     where: 'server',
        //     path: '/text/:tuplas',
        //     action: function() {
        //         var tuplas = this.params.tuplas;
        //         tuplas = tuplas.replace(/;,/g, ';#').split('#');
        //         const filename = 'respostas' + '.sql';
        //         const headers = {
        //             'Content-Type': 'text/plain',
        //             'Content-Disposition': "attachment; filename=" + filename
        //         };
        //         this.response.writeHead(200, headers);
        //         for (t in tabelas){
        //             this.response.write(tabelas[t] + '\n');
        //         }
        //         for (t in tuplas){
        //             this.response.write(tuplas[t] + '\n');
        //         }
        //         return this.response.end();
        //     }
        // });
    });
}
