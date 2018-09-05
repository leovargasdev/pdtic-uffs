# Formulário PDTIC

Formulário com respostas dinâmicas, possibilitando o usuário adicionar vários blocos de resposta para uma única questão.

Questões adaptativas conforme o perfil do usuário selecionado na página inicial.

## Configurando projeto
Primeiramente é necessário fazer o download do [Meteor](https://www.meteor.com/install). O meteor é um framework que usa como linguagem de backend Nodejs e seu banco padrão é o MongoDB.

### Pacotes NPM

[bcrypt](https://www.npmjs.com/package/bcrypt)

```sh
$ meteor npm install --save bcrypt
```

[babel](https://babeljs.io/docs/en/next/babel-runtime.html)

```sh
$ meteor npm install --save @babel/runtime@7.0.0-beta.55
```

OBS: Para instalar todos pacotes de uma só vez, basta executar

```sh
$ meteor npm install
```

### Pacotes METEOR

[Materialize](https://github.com/Dogfalo/materialize/) Framework CSS.

[Accounts-ui](https://atmospherejs.com/meteor/accounts-ui) é um pacote para criação de usuário e controle de sessão.

[Bert](https://github.com/themeteorchef/bert/) sistema de alertas.

[Meteor Toys](https://github.com/MeteorToys/meteor-devtools) ferramenta para debug da base da aplicação, interface gráfica do MongoDB via aplicação.

[Iron Router](https://github.com/iron-meteor/iron-router/) criação e mapeamento das rotas da aplicação.

OBS: Ao rodar a aplicação pela primeira vez esse pacotes serão instalados automaticamente, pois eles estão configurados no arquivo **.meteor/packages**.

## Compilação e execução

Agora basta rodar o comando **meteor**, dentro do diretório do projeto para executar a aplicação

```sh
$ meteor
```
