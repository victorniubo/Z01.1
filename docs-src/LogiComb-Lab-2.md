# Lab 5: Lógica Combinacional

!!! warning "Individual"
    Esse laboratório é para ser realizado individualmente.

> Esse laboratório introduz o modelo de desenvolvimento baseado em testes que será utilizado em todos os projetos.

Iremos trabalhar implementando o módulo `or16` que é uma parte do projeto B. Para isso devemos editar o arquivo de configuração `/Z01.1/Projetos/C-LogicaCombinacional/tests/config.txt` descomentando o módulo `Or16.vhd`:

```diff
######################################
# Rafael.Corsi @ Insper.edu.br       #
#  Elementos de Sistemas             # 
#                                    # 
# Arquivos de teste do projeto C     #
#  - Para incluir o teste basta      #
#  descomentar a linha               #
#                                    #
######################################

nand.vhd
Or16.vhd          
#Nor8Way.vhd
#And16.vhd
#Not16.vhd
#Or8Way.vhd
#DMux2Way.vhd
#DMux4Way.vhd
#DMux8Way.vhd
#Mux2Way.vhd
#Mux4Way.vhd
#Mux16.vhd
#Mux4Way16.vhd
#Mux8Way.vhd
#Mux8Way16.vhd
```

!!! note 
    Vamos ter dois módulos no teste: `nand.vhd` e o `Or16.vhd`
    

Abra o terminal na pasta `B-Logica-Combinacional/` e execute o script python `testeLogicaCombinacional.py`:

```bash
$ ./testeLogicaCombinacional.py
```

O mesmo irá executar a compilação dos arquivos `src/rtl/*.vhd` e realizar testes unitários em cada um desses módulos, como os módulos não estão implementados e como estamos forçando o teste do `or16` devemos ter um erro nesse módulo.

<script id="asciicast-hScw7GXpCGnSPw4ocDzwbt23m" src="https://asciinema.org/a/hScw7GXpCGnSPw4ocDzwbt23m.js" async></script>

Esse erro acontece pois o módulo não possui nenhuma implementação:

- `Or16.vhd`:

``` vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Or16 is
	port ( 
			a:   in  STD_LOGIC_VECTOR(15 downto 0);
			b:   in  STD_LOGIC_VECTOR(15 downto 0);
			q:   out STD_LOGIC_VECTOR(15 downto 0));
end entity;

architecture arch of Or16 is
begin


end architecture;
```

Vamos agora editar esse arquivo para realizar sua implementação. Esse módulo deve realizar uma OR entre as entras `a` e `b` e colocar o resultado na saída `q`, para isso insira a seguinte linha no arquivo 

``` vhdl
q <= a or b;
```

Essa modificação deve ser salva em novo branch **or16**. Dentro do terminal (na pasta do projeto C):

``` bash
$ git checkout -B or16
```

Teste novamente (` ./testeLogicaCombinacional.py`), agora deve passar:

<script id="asciicast-5CQCUV0yvDobOdOPZQgwaGMHI" src="https://asciinema.org/a/5CQCUV0yvDobOdOPZQgwaGMHI.js" async></script>

Realizando o commit:

``` bash
$ git commit -am "funcionando e testado"
```

!!! warning
    Só um integrante do grupo deve realizar o pull! Pois todos fizeram a mesma coisa.

Agora vamos enviar para o servidor (repositório git remoto) o novo branch `or16`:

``` bash
$ git push origin or16
```

Com o branch enviado ao github você deve gerar um pull-request para o mediador verificar e aprovar ou não a sua implementação.

## [Próximos passos](B-Circuitos-Integrados-Lab-2)

Agora é começar a trabalhar nos demais módulos, leia a descrição do Projeto B na página.

!!! warning "Scrum Master"
    Você é scrum? Então tem várias tarefas pela frente! Acesse a página Util -> Vixi! Sou Scrum Master e siga os passos lá!
    

