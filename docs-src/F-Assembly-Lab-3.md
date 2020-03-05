Ao final desse lab você deve ser capaz de:

1. Fazer programas simples em assembly com saltos 
1. Entender ainda mais a linguagem 
1. Entender ainda mias o hardawre

Para todos os programas:

- [ ] Trabalhe com o grupo!
- [ ] **Faça primeiramente na LOUSA, chame seu professor para validar**
    - Alterne quem vai para a lousa
- [ ] Faça no simulador GUI
    - Lembre de iniciar a memória RAM para validar o teste!
- [ ] Descomente no arquivo `test/conf.txt`
- Sempre use a descrição do hardware.


# Pequenos problemas (que já contam na entrega)

Com auxilio do exemplo do add e das instruções disponíveis no nosso hardware ([AssemblyZ1](AssemblyZ1)) faça na **LOUSA** e depois no **Simulador GUI** um programa que:

## sub

- Arquivo: `sub.nasm`
- Faz uma subtração binaria do valor de:  RAM[1] - RAM[0] gravando em RAM[2].

```diff
- FAÇA NA LOUSA PRIMEIRO! CHAME UM PROF. PARA VALIDAR
- SIMULE NO GUI
- RODE O TESTE 
 (descomente tests/conf.txt)
```

## mov

- Arquivo: `mov.nasm`
- Movimentação de dados da memoria RAM.

```
 tmp    = RAM[0]
 RAM[0] = RAM[1]
 RAM[1] = tmp
 RAM[3] = 1
```

```diff
- FAÇA NA LOUSA PRIMEIRO! CHAME UM PROF. PARA VALIDAR
- SIMULE NO GUI
- RODE O TESTE
 (descomente tests/conf.txt)
```

## SW e LED

- Arquivo: `SWeLED.nasm`
- Faça os LEDs exibirem o resultado da soma entre as chaves da FPGA: LEDR = SW[9..6] + SW[3..0].

```diff
- Valide no hardawre
- Faça um vídeo!
```