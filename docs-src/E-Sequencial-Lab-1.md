**Você é `Scrum Master` e não sabe por onde começar? De uma olhada nessas dicas: [Vixi! Sou Scrum Master](Vixi!-Sou-Scrum-Master)**

- [ ] [Atualize o Z01-Tools!](https://github.com/Insper/Z01.1/wiki/Dicas-GIT#atualizando-submodules) submodule antes de começar. Nesse projeto tivemos umas melhorias na infra do curso.

(realizar em dupla/ individual)

# Process VHDL

Em VHDL quando desejamos fazer algo sequêncial é necessário usarmos uma estrutura chamada de process, que possui a declaração a seguir:

``` vhd
process (optional sensitivity list)
	declarations
begin
	sequential statements
end process;
```

Nesse **process** possuímos a lista de sensibilidade (`sensitivity list`) que indica quando o process será executado. Podemos pensar da seguinte maneira, sempre que algum sinal que está listado nessa lista de sensibilidade mudar de valor (0 -> 1, 1 -> 0) o processo será executado. Vamos ver o exemplo a seguir:

``` vhd
process(A)
begin
  Q <= A;
end process;
```

> Sempre que o sinal A (sinal ou porta) alterar de valor o sinal Q será atribuído com o seu valor

Agora vamos criar um outro processo, **esse estará errado**:

``` vhd
process(A)
begin
  Q <= A and B;
end process;
```

A ideia por traz desse processo seria que o sinal Q receba o sinal A e B sempre que algum dos dois sofram alguma alteração, porém essa implementação não irá funcionar já que B não faz parte da lista de sensibilidade e se B mudar de valor o processo não será chamado, o sinal Q só será atualizado quando A mudar de valor.


:computer: Reescreva na lousa o módulo anterior para corrigindo esse problema

```diff
+ Faça na lousa. Chame o professor para validar
```

## Clock

Para inserirmos um clock (um sistema síncrono) precisamos necessariamente usar um `process`, e a arquitetura é a seguinte:

``` vhd
process(clock)
begin
  if(rising_edge(clock)) then
     Q <= D;
  end if;
end process;
```

Sempre que o clock sofrer variação (0 -> 1, 1 -> 0) o process é chamado e verifica-se se a transição foi de borda de subida (`rising_edge`) se for, atribui o sinal A ao sinal Q, caso contrário Q mantém seu último valor.

---

Modifique o arquivo `E-LogicaSequencial/src/rtl/FlipFlopD.vhd` que declara um Flip Flop do tipo D inserindo o código de exemplo anterior.

```diff
+ Faça local no seu PC.
```
-------

> Em FPGA um sinal digital não deve sofrer atualização em ambas as bordas: subida (`rising_edge`) e de descida (`falling_edge`) pois **não será suportado por hardware**. Salvo em registradores DDR (duble data rate) especiais, exemplo do que não deve ser feito!:
 
``` vhd
 process(clock)
begin
  if(rising_edge(clock)) then
     Q <= D;
  elsif(falling_edge(clock)) then
     Q <= D;
  end if;
end process;
```

## RTL Viewer

> [RTL](https://en.wikipedia.org/wiki/Register-transfer_level) é uma forma de visualização de um circuito digital.
>
> Ela nos ajudará a entender o circuito que foi escrito em HDL. Muitas vezes a própria ferramenta não compreende o hardware que desejamos descrever (lembre que HDL é uma linguagem de descrição de hardware, não de programação). Com o RTL conseguimos ter uma noção de qual foi a 'interpretação' do nosso hardware que a ferramenta (no caso o Quartus) entendeu.

O `RTL Viewer` é uma ferramenta do Quartus utilizada para visualizar o RTL (interpretação do hardware descrito em HDL).

```diff
+ Faça os passos a seguir no seu PC.
```
Para criarmos esse `RTL` de um módulo específico devemos no Quartus selecionar o componente em questão como **TopLevel**, para isso faça o seguinte:

1. Abra o projeto no `Quartus` localizado em `E-LogicaSequencial/Quartus/`

2. No **Project Navigator** escolha por **Files**:

![Files](figs/E-LogSeq/quartus-files.png)

3. Encontre o arquivo que deseja configurar como **TopLevel**:

![FlipFlopD](figs/E-LogSeq/quartus-FlipFlopD.png)

Clique com o botão direito no arquivo e selecione a opção: **Set as Top Level Entity**

Agora o `Quartus` irá enterpretar esse módulo como sendo o "top" do projeto (podemos pensar como sendo o `main`).

4. Compile o Projeto (`Processing` -> `Start`)
5. Abra o RTL Viewer (`Tools` -> `NetList Viewers` -> `RTL Viewer`)

Esse código em VHDL irá ser interpretada pelo compilador como um FlipFlop tipo D.

![FF RTL](figs/E-LogSeq/rtl-ff.png)

## Testando na FPGA 

No Quartus atribua ao **toplevel** o arquivo `TopLevel.vhd` (mesmo passos anteriores), esse módulo irá mapear o FF recém criado para os pinos da FPGA:

``` vhd
Clock <= not KEY(0); -- os botoes quando nao apertado vale 1
                     -- e apertado 0, essa logica inverte isso
clear <= not KEY(1);
set   <= not KEY(2);

u0 : FlipFlopD port map (
		clock    => Clock,
		d        => SW(0),
		clear    => clear,
		preset   => set,
		q        => LEDR(0)
	);		
```

Note que nesse código estamos usando os botões (`KEY`) da FPGA, além dos LEDs e das Chaves (SW).

**COMPILE, PROGRAME E TESTE**

```diff
+ Chame um professor para validar
```

> Esse exemplo não segue as boas práticas de projetos em FPGA pois não se deve gerar um clock a partir de um pino qualquer da FPGA, a FPGA possui pinos específicos para a geração do clock. Porém é a melhor maneira didática de mostrar um FF operando.
>
> O correto seria colocarmos um pino de "enable" que ativaria ou não o FF quando o botão fosse pressionado.

## Reset e Preset

`Flip Flops` possuem normalmente dois outros sinais de controle: **Clear** e **Preset**, usados respectivamente para forçar **'0'** ou  **'1'** em sua saída. Vamos modificar o código anterior para suportar essas duas outras funcionalidades. Nesse caso possuímos duas opções:

- Set/Clear : síncrono 
- Set/Clear : assíncrono 

O modo síncrono seria que o **set** e o **clear** só podem ser executado na subida do **clock** e no assíncrono em qualquer momento que o sinal se **set** e **clear**  forem alterados o FF irá responder imediatamente. Nesse caso, iremos implementar o FF com **set** e **reset** assíncrono, para isso utilize a seguinte estrutura a seguir que já implementa o sinal de **clear**:

``` vhd
process(clock, clear)
begin
  if (clear = '1') then
     Q <= '0';
  elsif(rising_edge(clock)) then
     Q <= D;
  end if;
end process;
```

```diff
+ Faça local no seu PC.
```

- [ ] Modifique o arquivo para implementar o **set** (o clear já está feito)
- [ ] Agora você pode executar o script de teste do projeto e verificar se a implementação está correta, analise também a forma de onda via `modelsim` (rodando com `-g`).
    - Descomente o teste `FlipFlopD.vhd` do arquivo `tests/config.txt`
    - execute `testeLogicaSequencial.py -g` no terminal
- [ ] Gere o RTL, analise o resultado e salve a forma de onda na pasta `src/rtl/` do projeto.
- [ ] Compile e teste na FPGA

**COMPILE, PROGRAME E TESTE**

- Você deve ser capaz de:
    

```diff
+ Chame um professor para validar sua explicação
```

### Validando 

Ao final desse laboratório você deve ser capaz de:

- Gerar um RTL
- Saber o que é um `process` em **VHDL** e o impacto da lista de sensibilidade
- Saber o que é um **FlipFlop** tipo D
- Explicar a forma de onda do **FlipFlopD** gerada no **modelsim**
- Explicar o **RTL** do **FlipFlopD** criado pelo **Quartus**