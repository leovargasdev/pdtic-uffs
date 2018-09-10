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
