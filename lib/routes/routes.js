let tabelas = [];
tabelas[0] = 'CREATE TABLE identificacao_pdtic( id_usuario varchar, nome varchar, localizacao varchar(60), perfil varchar(10), id_usuario varchar, CONSTRAINT identificacao_pdtic_pkey PRIMARY KEY (id_usuario));';
tabelas[1] = 'CREATE TABLE questao1_pdtic( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[2] = 'CREATE TABLE questao2_pdtic( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[3] = 'CREATE TABLE questao3_pdtic( descricao varchar, justificativa varchar, sistema varchar(60), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[4] = 'CREATE TABLE questao4_pdtic( sistema varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[5] = 'CREATE TABLE questao5_pdtic( servico varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[6] = 'CREATE TABLE questao6_pdtic( equipamento varchar(60), classificacao varchar(14), id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[7] = 'CREATE TABLE questao7_pdtic( descricao varchar, justificativa varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[8] = 'CREATE TABLE questao8_pdtic( consideracao varchar, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
tabelas[9] = 'CREATE TABLE sem_resposta( num_questao int, id_usuario varchar, CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.identificacao_pdtic(id_usuario));';
Router.configure({
    layoutTemplate: 'home_pagina'
});
const a = new Date().getDate();
if(a < 20){
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
            path: '/text/:tuplas',
            action: function() {
                var tuplas = this.params.tuplas;
                tuplas = tuplas.replace(/;,/g, ';#').split('#');
                const filename = 'respostas' + '.sql';
                const headers = {
                    'Content-Type': 'text/plain',
                    'Content-Disposition': "attachment; filename=" + filename
                };
                this.response.writeHead(200, headers);
                for (t in tabelas){
                    this.response.write(tabelas[t] + '\n');
                }
                for (t in tuplas){
                    this.response.write(tuplas[t] + '\n');
                }
                return this.response.end();
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
