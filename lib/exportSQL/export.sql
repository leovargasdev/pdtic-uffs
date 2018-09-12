CREATE TABLE identificacao_pdtic(
    id_usuario uuid,
    nome varchar,
    localizacao varchar(60),
    perfil varchar(10)
);

CREATE TABLE questao1_pdtic(
    descricao varchar,
    justificativa varchar,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao2_pdtic(
    descricao varchar,
    justificativa varchar,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao3_pdtic(
    descricao varchar,
    justificativa varchar,
    sistema varchar(60),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao4_pdtic(
    sistema varchar(60),
    classificacao varchar(14),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao5_pdtic(
    servico varchar(60),
    classificacao varchar(14),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao6_pdtic(
    equipamento varchar(60),
    classificacao varchar(14),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao7_pdtic(
    descricao varchar,
    justificativa varchar,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE questao8_pdtic(
    consideracao,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
CREATE TABLE sem_resposta(
    num_questao int,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES identificacao_pdtic(id_usuario),
);
