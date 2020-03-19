# VHDL - port map

## Desenvolvimento hierárquico

É uma técnica de organização de projeto onde são desenvolvidos pequenos módulos e esses módulos fazem parte de um sistema maior, que por sua vez, fazem parte de algo muito mais complexo. As vantagens de um desenvolvimento desse tipo são:

- Facilidade em realizar testes e validação
    - Cada módulo é testado independentemente
- Trabalho em equipe
    - A partir do momento que as interfaces são bem estabelecidas, cada um do time pode desenvolver um módulo
- Ferramentas gostam / se adaptam bem
    - As ferramentas de desenvolvimento conseguem otimizar o hardware melhor
- Reaproveitamento de módulos
    - Muito mais fácil para reaproveitar outros módulos.

!!! tip "Leitura extra"
    > https://www.intel.com/content/www/us/en/programmable/support/support-resources/design-examples/design-software/vhdl/v_hier.html

![](https://www.embedded.com/wp-content/uploads/media-1044685-0108esdsmith02.gif)

> Fonte: https://www.embedded.com/the-art-of-fpga-construction/

## `port map`

`port map` é a maneira em VHDL de reaproveitamos uma entidade definida em outro lugar no nosso arquivo. Pensar em `port map` como uma função não é de todo errado, mas devesse notar que quando usamos `port map` estamos **criando uma cópia do hardware** que é descrito pela entidade usada, isso é diferente de uma função em Python, que reaproveita o mesmo trecho de código para cada chamada de função.

É mais apropriado pensar que a descrição de um `hardware` é uma receita (que vemos na `architecture`), o `port map` seria como o bolo, você pode ter vários bolos com a mesma receita e cada bolo pode ser usado/ir para pessoa diferente (entrada e saídas).

Vamos ver como usar `port map` com um exemplo a seguir, nesse exemplo possuímos dois arquivos `modulo2.vhd` e `modulo1.vhd`, e desejamos utilizar o modulo1 dentro do componente 2 (modulo2):

```
       -------------------
  i1  |     --------      | o1
   -->|--->| modulo1|-----|-->
  i2  | -->|        |     |
   -->|/    --------      |
      |      modulo2      |
       -------------------
```

- `modulo1.vhd`

``` vhdl
entity modulo1 is
  port (
     a,b : in  std_logic;
       x : out std_logic);
end entity;

architecture  rtl OF modulo1 IS
begin
    x <= a xor b;
end architecture;
```

- `modulo2.vhd`

``` vhdl
entity modulo2 is
  port (
     i1,i2 : in  std_logic;
     o1    : out std_logic);
end entity;

architecture  rtl OF modulo2 IS

-- Aqui devemos fazer a declaração do componente
-- que queremos utilizar, a declaração
-- tem que ser igual a entidade do componente 
-- original, mas trocando a palavra `entity`
-- pelo keyword `component`

component modulo1 is
  port (
     a,b : in  std_logic;
       x : out std_logic);
end component;

begin

-- Agora com o componente 'criado'
-- podemos utilizar no nosso projeto
--
-- podemos dar um 'nome' a intancia do componente
--  |    
--  |    | nome do componente a ser usado
--  v    v
   u1: modulo1 port map(
      a => i1,  -- o sinal a do componente é conectado no sinal i1
      b => i2,  -- o sinal a do componente é conectado no sinal i1
      x => o1   -- o sinal a do componente é conectado no sinal i1
   );

end architecture;
```

!!! tip 
    - O nome da instância não pode repetir (`u1`, ...)
    - Podemos instanciar a quantidade de componente que desejarmos 
        - (vai depender do tamanho da FPGA)
    - Nenhuma porta de entrada pode ficar vazia! Você não precisa ligar todas saídas.
    - Para deixar uma saída desconectada utilize o keyword `OPEN`:
        ``` vhdl
      u1: modulo1 port map(
        a => OPEN,  
        ```
    - Não podemos aplicar operações no `port map`:
        ``` vhdl
      u1: modulo1 port map(
        a => i1 and i2,  
        ```
    - Evitar a notação de `port map` que não indica qual porta vai para onde:
        ``` vhdl
            u1: modulo1 port map (i1, i2, o1);
        ```
    - As vezes é necessário criarmos sinais (`signals`) para atribuirmos aos componentes
        ```
