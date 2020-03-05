# G - CPU - Testando

Para testar o projeto G-CPU é necessário:

1. Testar o `controUnit` e o `memoryIo`:

```bash
$ ./testeHW.py lib.tb_memoryio.all 
$ ./testeHW.py lib.tb_controlunit.all
```

> Somente após passar os testes anteriores e com a `CPU` implementada:

2. Testar o computador (`CPU`, `controlUnit` e `memoryIo`) com a execução de códigos em assembly:

```bash
$ ./testeAssemblyMyCPU.py
```

!!! tip
    SE O TESTE TRAVAR, [VERIFICAR DICAS AO FINAL DESSA PÁGINA](/G-CPU-Testando/#se-o-testeassemblymycpupy-travar)

3. Testar o Computador na FPGA

- Abrir Quartus e compilar projeto
- Executar `programMyFPGA.py`
- Executar o programa `letra` / `nome`:

```bash
$ ./programSoftware.py -n ../F-Assembly/src/nasm/LCDnomeGrupo.nasm
```

-----------------------------

## Rubrica B

Não vamos ter o teste do `memoryIO` nem do `controlUnit` adequados para as mudanças, será necessário testar direto no Hardware:

1. Abrir Quartus e compilar projeto
1. Executar `programMyFPGA.py`

Como vocês alteraram o InstructionSet, será necessário escrever um programa em linguagem de máquina, para isso:

1. Altere o arquivo: `testeComputador.mif` com suas operações
1. Execute  `./programSoftware.py -m testeComputador.mif` para programar a ROM do Z01.1 com seu programa.

**Note que o arquivo `testeComputador.mif` possui um campo que é `DEPTH=30;` Você deve alterar esse valor para a quantidade de linhas que seu programa possui!**

## Se o `testeAssemblyMyCPU.py` travar

Se por algum motivo o teste `testeAssemblyMyCPU.py` travar no primeiro teste, isso é sinônimo de que algo está errado com o seu HDL. Esse teste faz o seguinte para cada arquivo `.nasm` incluso no arquivo de configuração do **Projeto F**:

1. Compila o `.nasm` gerando o binário `.mif`
1. Carrega na ROM do seu computador (**Projeto G**) o binário
1. Executa o código
1. Verifica se o resultado está certo

Se por algum motivo algum módulo estiver com problema esse teste pode falhar, o que é aconselhado fazer: 

1. Comente todos os teste do **Projeto F** no arquivo de configuração (`F-Assembly/tests/config.txt`) com **exceção**  o `mov.nasm`
    - Esse módulo testa todos os registradores
1. Execute o teste com a parte do waveform: `./testeAssemblyMyCPU.py -g` 
    - **Análise o `transcript` em busca de erros!**
1. Inclua os sinais do Computador no waveform e execute o `vunit_run`
1. Analise o que está acontecendo com o seu hardware, verifique a instrução que está entrando e o que deveria acontecer.
1. Corrija o HW quando encontrar o problema, teste novamente.
1. Descomente os módulos: `abs.nasm` e teste para saber se está :ok
    - Esse módulo testa o loadPC e saídas da ULA (ng e zr)
1. Descomente os demais módulos e teste tudo.

