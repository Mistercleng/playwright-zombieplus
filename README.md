![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

<hr>
Curso disponível em https://qaxperience.com



sudo docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres
sudo docker container ls 
sudo docker exec -it ccd3c2fc50b9 bash

psql -h localhost -U postgres

CREATE DATABASE dbname;

get conenction information
 \conninfo

get use information
\du

list data bases
\dt

list tables
\l

connect to database
 \c dbname



set keyboar color 
sudo brightnessctl --device='dell::kbd_backlight' set 1

