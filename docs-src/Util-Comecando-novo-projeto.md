# Começando novo projeto

!!! linux
    Usar o Linux fornecido!

!!! warning "Scrum Master"
    O grupo deve escolher um mediador
    
    > Dica: Aconselhável no primeiro projeto alguém com facilidade de Linux e git.

Você deve fazer a secção do seu papel: Mediador/ Desenvolvedor

## Antes de começar - Mediador

!!! note "Scrum Master"
    Somente Scrum, mas todos devem acompanhar (uma hora será sua vez).

Antes de começar será necessário atualizar o repositório de vocês com os novos arquivos no repositório oficial da disciplina, e também configurar o Travis para executar os testes nesse novo projeto. 

### upstream

1. Referenciando repositório original da disciplina

```bash
$ git remote add upstream https://github.com/insper/Z01.1
```

2. Atualizando repositório do grupo com alterações feitas no repositório da disciplina:

```bash
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```

Feito isso, deve ter aparecido uma nova pasta dentro do repositório de vocês: `Projetos/C-LogicaCombinacional/`.

### travis

Edite o arquivo `.travis.yml` localizado na raiz do repositório modificando o final do arquivo para ficar como:

```diff
script:
   ## run scripts
   - python3 Projetos/A-AmbienteDesenvolvimento/testeAmbienteDesenvolvimento.py
   - python3 Projetos/B-LogicaCombinacional/testeLogicaCombinacional.py 
+  - python3 Projetos/C-UnidadeLogicaAritmetica/testeULA.py
```

Agora vamos realizar um commit e submeter aos demais colegas do grupo as alterações:

```bash
$ git add .travis.yml
$ git commit -m "configurando travis para novo projeto"
```


### SCRUM_MASTER.json

O Scrum Master deve editar o arquivo `SCRUM_MASTER.json` localizado na pasta do projeto (no caso exemplo para o projeto B: `Projetos/B-LogicaCombinacional/SCRUM_MASTER.json`) com os seus dados.

```bash
$ git commit -am "configurado scrum do projeto"
```

Agora podemos enviar as atualizações para os demais integrantes

```bash
$ git push origin master
```

### Atualizar tools

Você deve atualizar os scripts de teste, executando o comando a seguir:

```bash
$ ./updateZ01tools.sh
```

## Antes de começar - Desenvolvedores

!!! note "Desenvolvedores"
    Todos do grupo devem realizar isso.

!!! warning 
    Fazer isso somente depois que o mediador fez a parte dele!

Agora todos os integrantes do grupo devem atualizar o repositório:

```
$ git pull origin master
```

E atualizar os scripts de teste, executando o comando a seguir:

```bash
$ ./updateZ01tools.sh
```

>  Isso irá baixar as dependências phython (via pip) e também clonar um repositório chamado `Z01-Tools` na raiz do usuário: `$HOME/Z01-Tools/`.

