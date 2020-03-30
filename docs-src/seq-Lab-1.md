# Lab 10: D - Lógica Sequencial

!!! warning "Antes de começar"
    Toda vez que um novo projeto começar será necessário realizar algumas configurações no repositório do grupo, vocês devem seguir para o documento: [`Util/Começando novo Projeto`](https://insper.github.io/Z01.1/Util-Comecando-novo-projeto/) e depois voltar para esse lab.

    - Não seguir sem realizar a etapa anterior.

Nesse lab iremos implementar um flip-flop do tipo D e um binary digit.

Estudo prévio necessário para realizar esse lab:

| Leitura                    |
|----------------------------|
| `Teoria/Lógica Sequencial` |
| `VHDL/Sequencial`          |

## Implementando um FF tipo D

!!! note
    - Fazer individual 
    - Discutir no grupo!

!!! example "Execute"
    1. Faça uma branch
    1. Implemente local no seu PC
    1. Só um integrante do grupo deve enviar para a master via PR ao final

!!! tip
    - Esse já é um dos módulos da entrega do projeto!

Vamos agora implementar um FF tipo D em VHDL, para isso iremos modificar o arquivo `D-LogicaSequencial/src/rtl/FlipFlopD.vhd` que declara a entidade de um Flip Flop do tipo D.

### Reset e Preset

!!! warning
    Antes de continuar, você deve ter feito a leitura prévia sobre Lógica Sequencial em VHDL, só continue após ter realizado a leitura:
    
    No site da disciplina: :arrow_right: VHDL :arrow_right: Sequencial


`Flip Flops` possuem normalmente dois outros sinais de controle: **Clear** e **Preset**, usados respectivamente para forçar **'0'** ou  **'1'** em sua saída. Vamos modificar o código anterior para suportar essas duas outras funcionalidades. Nesse caso possuímos duas opções:

- Set/Clear : síncrono 
- Set/Clear : assíncrono 

O modo síncrono seria que o **set** e o **clear** só podem ser executado na subida do **clock** e no assíncrono em qualquer momento que o sinal se **set** e **clear**  forem alterados o FF irá responder imediatamente. Nesse caso, iremos implementar o FF com **set** e **reset** assíncrono, para isso utilize a seguinte estrutura a seguir que já implementa o sinal de **clear**

Iremos modificar o código localizado em `D-LogicaSequencial/src/rtl/FlipFlopD.vhd` que possui a implementação **parcial** de um FF tipo D, mas não tem o `preset`
    
``` vhdl
process(clock, clear)
begin
  if (clear = '1') then
    Q <= '0';
  elsif(rising_edge(clock)) then
    Q <= D;
  end if;
end process;
```
    
!!! example "Tarefa: FF completo"
    - `D-LogicaSequencial/src/rtl/FlipFlopD.vhd`
    - Implemente o **preset** (o clear já está feito)
    
Agora você pode executar o script de teste do projeto e verificar se a implementação está correta.

!!! tip ""
    Só continuar se estiver passando nos testes
 
!!! example "Tarefa: waveform" 
    - execute `./testeLogicaSequencial -g` 
    - analise a forma de onda do teste do FF no modelsim

!!! tip 
    - Discuta no grupo a forma de onda
    - Chame um professor para conversar sobre o entendimento de vocês

!!! example "Tarefa: RTL"
    - Gere o RTL (via quartus) analise o resultado do FF.
    - Salve a forma de onda na pasta `src/rtl/` do projeto com o nome `FlipFlop.png`.
    
### Checkpoint

Ao final dessa etapa você deve ser capaz de:

- Saber o que é um `process` em **VHDL** e o impacto da lista de sensibilidade
- Saber o que é um **FlipFlop** tipo D
- Explicar a forma de onda do **FlipFlopD** gerada no **modelsim**
- Explicar o **RTL** do **FlipFlopD** criado pelo **Quartus**

## 
