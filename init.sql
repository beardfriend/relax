SET client_encoding='UTF-8';

CREATE TABLE yoga_tags(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);

INSERT INTO yoga_tags (name) values ('아헹가');
INSERT INTO yoga_tags (name) values ('하타');
INSERT INTO yoga_tags (name) values ('아쉬탕가');
INSERT INTO yoga_tags (name) values ('플라잉');
INSERT INTO yoga_tags (name) values ('빈야사');
INSERT INTO yoga_tags (name) values ('힐링');
INSERT INTO yoga_tags (name) values ('릴렉스');
INSERT INTO yoga_tags (name) values ('테라피');
INSERT INTO yoga_tags (name) values ('아크로');
INSERT INTO yoga_tags (name) values ('아디다스');
INSERT INTO yoga_tags (name) values ('인사이드 플로우');
INSERT INTO yoga_tags (name) values ('키즈');

