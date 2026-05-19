# Guia de Configuração do Projeto Kausa

Este documento explica, passo a passo, como configurar e executar o projeto Kausa num novo computador utilizando PyCharm.

O guia foi pensado para utilizadores com pouca experiência em Django, React, Git e GitHub, incluindo instruções detalhadas desde a instalação das dependências até à execução do backend e frontend.

Também inclui:
- comandos Git essenciais;
- resolução de erros comuns;
- explicação da estrutura do projeto;
- boas práticas para trabalhar em equipa.

---

# Índice

1. Programas necessários
2. Clonar o projeto
3. Abrir o projeto no PyCharm
4. Criar ambiente virtual
5. Instalar dependências do Django
6. Aplicar migrations
7. Iniciar o backend Django
8. Configurar o frontend React
9. Instalar dependências do frontend
10. Iniciar o frontend Vite
11. Como correr o projeto no dia a dia
12. Comandos úteis de Git
13. Problemas comuns e soluções
14. Estrutura do projeto
15. Notas importantes

---

Projeto com backend em Django e frontend em React + Vite.

---

## 1. Programas necessários

Antes de abrir o projeto, instalar:

- Python 3.12 ou superior
- Node.js 20 ou superior
- Git
- PyCharm

Para confirmar se estão instalados:

```bash
python --version
node -v
npm -v
git --version
```

---

## 2. Clonar o projeto

Abrir o terminal e correr:

```bash
git clone https://github.com/TiagoMiguelPedro/Kausa.git
```

Entrar na pasta do projeto:

```bash
cd Kausa
```

---

## 3. Abrir no PyCharm

1. Abrir o PyCharm
2. Escolher **Open**
3. Selecionar a pasta `Kausa`
4. Esperar que o PyCharm carregue o projeto

---

# Backend — Django

## 4. Criar ambiente virtual

Na pasta principal do projeto, correr:

### Mac / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

Quando estiver ativo, deve aparecer algo como:

```bash
(.venv)
```

no início da linha do terminal.

---

## 5. Instalar dependências do Django

Com o ambiente virtual ativo, correr:

```bash
pip install -r requirements.txt
```

---

## 6. Aplicar migrations

Ainda na pasta principal, onde está o ficheiro `manage.py`, correr:

```bash
python manage.py migrate
```

---

## 7. Iniciar o servidor Django

```bash
python manage.py runserver
```

O backend fica disponível em:

```text
http://127.0.0.1:8000
```

Deixar este terminal aberto.

---

# Frontend — React

## 8. Abrir outro terminal

No PyCharm, abrir um segundo terminal.

Entrar na pasta do frontend:

```bash
cd causas-frontend
```

---

## 9. Instalar dependências do React

```bash
npm install
```

---

## 10. Iniciar o frontend

```bash
npm run dev
```

O frontend fica disponível normalmente em:

```text
http://localhost:5173
```

Abrir esse link no browser.

---

# Como correr o projeto no dia a dia

Sempre que quiserem trabalhar no projeto:

## Terminal 1 — Backend

```bash
source .venv/bin/activate
python manage.py runserver
```

No Windows:

```bash
.venv\Scripts\activate
python manage.py runserver
```

## Terminal 2 — Frontend

```bash
cd causas-frontend
npm run dev
```

---

# Comandos úteis de Git

## Ver alterações

```bash
git status
```
## Listar branches locais e remotos

```bash
git branch -a
```
## Navegar entre branches

```bash
git checkout nome_do_branch
```
## Criar um branch

```bash
git checkout -b nome_do_branch
```


## Adicionar alterações

```bash
git add .
```

## Guardar alterações localmente

```bash
git commit -m "mensagem do commit"
```

Exemplo:

```bash
git commit -m "Add initial project setup"
```

## Enviar alterações para o GitHub

```bash
git push
```

## Receber alterações do GitHub

```bash
git pull
```

Antes de começarem a trabalhar, é recomendado correr:

```bash
git pull
```

---

# Problemas comuns

## Erro: `No module named ...`

Significa que falta instalar dependências Python.

Solução:

```bash
pip install -r requirements.txt
```

## Erro: `npm: command not found`

Significa que o Node.js não está instalado.

Instalar Node.js e repetir:

```bash
npm install
```

## Erro: `vite: Permission denied`

Na pasta `causas-frontend`, correr:

```bash
chmod +x node_modules/.bin/vite
```

Depois:

```bash
npm run dev
```

## Erro ao fazer push para GitHub

Primeiro receber alterações:

```bash
git pull
```

Depois tentar novamente:

```bash
git push
```

---

# Estrutura do projeto

```text
Kausa/
│
├── manage.py
├── requirements.txt
├── db.sqlite3
├── causas-frontend/
│   ├── package.json
│   ├── src/
│   └── ...
│
└── projetoKausa/
    ├── settings.py
    ├── urls.py
    └── ...
```

---

# Notas importantes

- Não apagar a pasta `.venv` enquanto estiverem a usar o projeto localmente.
- Não enviar `node_modules` para o GitHub.
- Não enviar `.venv` para o GitHub.
- O backend e o frontend têm de estar a correr ao mesmo tempo.
- O Django corre normalmente em `http://127.0.0.1:8000`.
- O React corre normalmente em `http://localhost:5173`.
