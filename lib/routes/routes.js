Router.configure({
    layoutTemplate: 'home_pagina'
});

Router.map(function(){
    this.route('formulario', {
        path: '/',
        Template: 'formulario'
    });
    this.route('respostas', {
        path: '/respostas',
        Template: 'respostas'
    });

});
