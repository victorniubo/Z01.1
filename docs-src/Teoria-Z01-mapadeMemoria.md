# Z01 - Mapa de memória

A forma na qual a maioria dos computadores acessam periféricos (teclado/ mouse/ USB/ tela/ ...) é a do periférico mapeado em memória. Essa técnica utiliza da capacidade do computador de escrever e ler da memória RAM, **fazendo com que regiões de endereços da memória não sejam uma 'memória' física, mas sim um periférico do computador.**

Vamos trabalhar com o exemplo do nosso Z01, a memória é composta de: 

- RAM
- LCD
- Chaves  
- LEDs

Nesse nosso hardware a memória que é visível pela CPU é organizada da seguinte maneira:

| Endereço            | Periférico           | Leitura (r) / Escrita (w) |
| ------------------- | -------------------- |                           |
| 0    -     16383    | RAM                  | r/w                       |
| 16384 - 21183       | LCD                  | w                         |
| 21184               | LED                  | w                         |
| 21185               | SW                   | r                         |

Como ilustrado no diagrama a seguir:

![](figs/Teoria/Z0-mapa-de-memoria.svg){width=600}

!!! example "Acendendo os LEDs"
    Como isso é traduzido para código? Imagine que desejamos acender um LED que nosso computador controla, para isso devemos fazer com que o registrador `%A` aponte para o endereço de memória na qual o LED está associado e então escreva nele:
    
    ```nasm
    leaw $21184, %A   ; endereço do LED
    movw $1, (%A)     ; move valor 1 para ele
    ```



