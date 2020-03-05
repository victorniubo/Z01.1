Ao final desse lab você deve ser capaz de:

1. Usar o simulador gráfico 
1. Fazer pequenas modificações em um código assembly
1. Executar script de teste do projeto F - Assembly

> Antes de começar o Scrum deve atualizar o fork e todos devem atualizar o Z01-tools.

**Você é `Scrum Master` e não sabe por onde começar? De uma olhada nessas dicas: [Vixi! Sou Scrum Master](Vixi!-Sou-Scrum-Master)**

- [ ] [Atualizem o Z01-Tools!](https://github.com/Insper/Z01.1/wiki/Dicas-GIT#atualizando-submodules) submodule antes de começar **(TODOS DEVEM FAZER)**

(realizar em dupla/ individual)

# Simulador

Nosso código assembly pode ser executado em hardware de verdade (FPGA) porém nesse primeiro momento iremos trabalhar em um ambiente simulado que nos dará maior facilidade de programação e depuração.

Um pouco de contexto: O livro texto (The Elements Of Computer System) disponibiliza um simulador da CPU original todo escrito em java, esse código é fechado e não permite nenhuma customização. Em 2017 o Prof. Luciano Pereiro iniciou a criação de um simulador Z0 (versão anterior) também em Java, onde teríamos controle total do software, o simulador funcionava. Percebemos alguns pontos negativos de utilizar um simulador em Java (ou qualquer outra linguagem) sendo o principal: Qualquer alteração no Hardware iria demandar uma alteração no simulador, sendo necessário mantermos dois projetos independentes e sincronizados.

Nesse curso, iremos utilizar um simulador que utiliza o nosso próprio código VHDL como descrição da CPU (e de tudo envolvido), uma alteração no hardware (VHDL) irá automaticamente alterar o simulador e o comportamento do computador. Para isso, fazemos uso do ModelSim, um software da Mentor Graphics que executa simulaçòes em VHDL (o mesmo utilizado nos projetos anterios), desenvolvemos uma série de APIs e configurações desse simulador para funcionar para a disciplina.

> As APIS de interface do simulador foram desenvolvidas por mim (vhdl/ tcl/ python) e a interface gráfica pelo Prof. Eduardo Marossi (python/ qt5).

O simulador possui a estrutura ilustrada a seguir:

![Simulador](figs/F-Assembly/simulador.svg)

O simulador possui como entradas (para cada simulação): a arquitetura do computador (hardware); o conteúdo da memória RAMl o conteúdo da memória ROM e um tempo de execução.

Após o término da simulação é exportado diversos sinais internos da CPU, o estado final da memória RAM e ROM. Esses sinais são então lidos pela interface gráfica e exibida de uma forma amigável.

## Arquivos

O simulador está localizado nas pastas `Z01-tools/` :

- `Z01-Simulator-GUI`: Parte gráfica do simulador
- `Z01-Simulator-RTL`: Hardware a ser executado no modelsim para executar o programa.

Para inicializar o simulador basta executar o script localizado na pasta do projeto F:

``` bash
./F-Assembly/Z01simulador.py
```

## Interface do Simulador 

O simulador possui a interface a seguir, onde a coluna da esquerda é referente a memória ROM (programa), a coluna da direita referente a memória RAM (dados). 

![Simulador GUI](figs/F-Assembly/gui.png)

Toda vez que houver uma alteração em algum dos parâmetros do simulador (RAM/ROM/Instruções,...) o programa será novamente executado no simulador para obtermos um resultado atualizado. Isso pode dar a sensação de "lerdeza" mas lembre da complexidade do sistema: estamos executando um programa em um hardware inteiramente simulado no computador de vocês.

![tool](figs/F-Assembly/gui-tool.svg)

### Programando 

Abra o simulador e insira o seguinte código `nasm` (na parte referente a ROM), uma instrução por linha:

``` nasm
 leaw $R1,%A
 movw (%A),%D
 leaw $R0,%A
 addw (%A), %D, %S
 leaw $R2, %A
 movw %S, (%A)
```

Esse código soma o valor que está salvo na memória RAM endereço 0 com o valor da memória RAM endereço 1 e salva no endereço 0:

```
RAM[2] = RAM[0] + RAM[1]
```

#### R0, R1, ... ?

**$R0**, **$R1**, ... são nomes pré definidos de endereços de memória. O **R0** indica o endereço de memória 0, **R1** o endereço de memória 1 e assim por diante até o **R15**. O mesmo código pode ser escrito como:

``` nasm
   leaw $1,%A
   movw (%A),%D
   leaw $0,%A
   addw (%A), %D, %S
   leaw $2, %A
   movw %S, (%A)
```

```diff
- Não continue caso não entendeu o código !
```

Agora será necessário colocarmos valores iniciais na memória RAM para validarmos o nosso código, para isso altere a memória RAM como demonstrado a seguir:

- Endereço 0 = 5
- Endereço 1 = 8

![Alterando a memória RAM](figs/F-Assembly/exe1.png)

```diff
+ Com a memória alterada você pode agora executar a simulação,
+  verifique se o valor da memória 2 é a soma dos endereços 0 e 1.
```


![](figs/F-Assembly/exe1-tutorial.gif)


## Treinando

> ***USE O RESUMO DAS INSTRUÇÕES: [AssemblyZ1](AssemblyZ1)***

```diff
- Altere o código para armazenar o resultado no endereço RAM[5]
```

```diff
- Altere o código para não usar o registrador %S
```

# Script automático de testes

Além da interface gráfica do simulador, possuímos um script de teste automatizado (similar ao do VHDL), esse script: `F-Assembly/testeAssembly.py` compila os códigos que estão na pasta `F-Assembly/src/nasm` para a pasta `F-Assembly/bin/hack` e executa os testes localizados em `F-Assembly/tst/`. Somente os arquivos configurados no `config.txt` serão testados.

### `config.txt`

O arquivo de configuração dos testes é um pouco diferente, possui além do nome do módulo que será testado um segundo parâmetro que indica quantos testes serão executados para esse módulo e quantos microsegundos ele ficará na simulação (microsegundos suposto de um sistema real).

Exemplo do `config.txt`
```
# nome | quantidade de testes | us de execucao
#add 1 1000
```

```diff
+  Remova o comentário do módulo add
```

## Implementando o add.nasm

Os arquivos a serem implementando estão na pasta `F-Assembly/src/nasm/` lá você vai encontrar todos os códigos fontes que deverão ser feitos nesse projeto. 

```diff
+ Edite o arquivo add.nasm com a implementação do add anterior
```

Agora com o módulo implementando podemos testar seu funcionamento. Para isso execute o script `testeAssembly.py`. Esse script irá compilar o nasm e gerar os arquivos `.hack` e `.mif` (salvos no `/bin/hack/`) que serão carregados no simulador junto com uma configuração inicial da memória RAM (como no gui do simulador), ao término da simulação um arquivo com o estado final da RAM é salvo na pasta `/tests/tst/add/add0_end.mif`.

Executamos um script que compara o estado final da RAM com o um esperado (`add0_tst.mif`), em caso de algum erro, o scripr irá reportar falha.

Se tudo ocorrer bem você deverá ter a seguinte saída :

```diff
 - Testando .... 
 -------------------------
 Starting  add0 ....
 pass    add0
 ==== Summary ===================================
+ pass    add teste: 0
```

# Formato de arquivos 

A seguir uma lista dos principais formatos de arquivos utilizados :

- `.nasm`: Arquivo assembly
- `.hack`: Linguagem de máquina (arquivo com zeros e uns)
- `.mif `: Arquivo .hack que pode ser salvo na memória da FPGA
- `.lst `: saída do simulador com os estados da CPU
 
