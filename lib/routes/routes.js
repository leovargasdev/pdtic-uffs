Router.configure({
    layoutTemplate: 'home_pagina'
});

Router.map(function(){
    this.route('formulario', {
        path: '/',
        Template: 'formulario'
    });

});
