# Pino: A Saga dos Cristais

Jogo de plataforma 2D estilo "Super Mario World", feito em HTML5 Canvas + JavaScript puro.
10 fases, sem necessidade de instalar nada: basta abrir o `index.html` no navegador.

## Como testar

Duas opções:

1. **Mais simples**: dê duplo clique no arquivo `index.html` para abrir direto no navegador.
2. **Recomendado**: rode um servidor local (evita alguns problemas de carregamento de
   imagens/sons mais pra frente). Se tiver Python instalado, dentro da pasta do jogo:
   ```
   python -m http.server 8000
   ```
   Depois acesse `http://localhost:8000` no navegador.

## Controles

- Setas ou WASD: mover
- Espaço, seta para cima ou W: pular

## Estrutura dos arquivos

```
index.html        - estrutura das telas (menu, jogo, game over, vitória)
style.css         - estilo visual das telas
js/input.js       - captura do teclado
js/physics.js     - gravidade e colisão entre caixas
js/camera.js      - câmera que segue o jogador
js/spritesheet.js - carregamento e recorte de spritesheets (imagens animadas)
js/player.js      - lógica do Pino (movimento, pulo, dano, desenho)
js/enemy.js       - lógica dos inimigos (patrulha, derrota, dano ao jogador)
js/items.js       - moedas e cristais coletáveis
js/levels.js      - dados das 10 fases (plataformas, inimigos, itens, bandeira final)
js/hud.js         - vidas, moedas e nome da fase na tela
js/game.js        - estados do jogo e o que acontece em cada fase
js/main.js        - loop principal (roda ~60 vezes por segundo)
```

## Imagens já configuradas no jogo

Estas imagens já têm o código pronto para carregá-las (modo imagem única,
tamanho detectado automaticamente). Basta salvar cada arquivo no caminho exato:

| Elemento | Caminho do arquivo |
|----------|---------------------|
| Pino (personagem) | `assets/images/player/pino-spritesheet.png` |
| Moeda | `assets/images/items/moeda.png` |
| Cristal | `assets/images/items/crystal.png` |
| Inimigo | `assets/images/enemies/enemy.png` |
| Terra (chão/plataforma) | `assets/images/tiles/earth.png` |
| Céu (fundo) | `assets/images/backgrounds/sky.png` |

Detalhes específicos:
- **Terra**: é desenhada "ladrilhada" (repetida em blocos de 32x32px) ao longo de
  cada plataforma, então funciona bem mesmo com plataformas de tamanhos diferentes.
  Use uma textura que repita bem nas bordas (sem cortes visíveis quando lado a lado).
- **Céu**: é esticado para cobrir a tela inteira (800x450px). Por enquanto é o
  mesmo fundo em todas as 10 fases; se quiser um fundo diferente por fase depois,
  é só pedir.
- **Inimigo**: já vira automaticamente (espelha) conforme a direção da patrulha,
  então um único desenho olhando para um lado já serve para os dois sentidos.
- Todas usam fundo transparente (PNG), exceto o céu, que pode ser uma imagem
  comum (já que cobre a tela inteira, não precisa de transparência).

Enquanto algum arquivo não existir, o jogo continua mostrando a forma colorida de
placeholder daquele elemento, sem travar ou dar erro.

## Como adicionar a imagem do Pino

O jogo aceita dois modos para a imagem do personagem:

### Modo atual: imagem única (mais simples, já está assim)

Se você só tem **uma imagem** do Pino (sem grade de animação), é só salvar como
`assets/images/player/pino-spritesheet.png`. O tamanho é detectado automaticamente,
e essa mesma imagem é usada parado, andando e pulando (sem animação de quadros por
enquanto). Não precisa configurar nada, já está pronto para funcionar assim.

### Modo avançado: spritesheet com animação

Quando quiser animar o personagem (quadros diferentes para parado/andando/pulando),
monte uma imagem em grade com cada quadro do **mesmo tamanho exato**:
- Linha 0: parado (1 quadro)
- Linha 1: andando (4 quadros, lado a lado)
- Linha 2: pulando (1 quadro)

Salve no mesmo lugar (`assets/images/player/pino-spritesheet.png`, substituindo a
imagem única) e troque a definição em `js/player.js` para informar o tamanho de
cada quadro:

```javascript
const SPRITESHEET_PINO = new Spritesheet(
    'assets/images/player/pino-spritesheet.png',
    32, // largura de cada quadro
    40  // altura de cada quadro
);
```

Enquanto o arquivo não existir, o jogo continua mostrando o retângulo azul/vermelho
normalmente (não trava nem dá erro), então você pode ir testando antes de ter a
arte pronta.

O personagem virado para a esquerda é resolvido automaticamente pelo código
(espelhamento), então você só precisa desenhar olhando para a direita.

**Importante**: a imagem precisa de fundo transparente (PNG), senão aparece um
quadrado colorido atrás do Pino. E o teste só funciona corretamente acessando o
jogo por um servidor (local ou GitHub Pages) - abrir o `index.html` direto com
duplo clique impede o navegador de carregar as imagens.

## Onde colocar as outras imagens (inimigos, itens, tiles, fundos)

Toda vez que houver um lugar no código pronto para receber uma imagem, existe um
comentário `// TODO: IMAGEM AQUI` (ou `<!-- TODO: IMAGEM AQUI -->` no HTML) explicando
o que entra ali. Procure por "TODO: IMAGEM AQUI" no editor de código para achar todos
de uma vez. Esses itens (inimigos, moedas, plataformas, fundos) ainda usam o método
mais simples de imagem única (sem spritesheet); se quiser aplicar spritesheet a eles
também depois, é só pedir.

As pastas já estão prontas para receber os arquivos:

```
assets/images/player/       - spritesheet do Pino
assets/images/enemies/      - sprites dos inimigos
assets/images/tiles/        - blocos e plataformas
assets/images/items/        - moedas e cristais
assets/images/backgrounds/  - fundos de cada fase
assets/sounds/music/        - música de cada fase
assets/sounds/sfx/          - efeitos sonoros (pulo, moeda, dano)
```

### Como trocar um retângulo por uma imagem simples (exemplo: inimigo)

Hoje o inimigo é desenhado assim, em `js/enemy.js`:

```javascript
contexto.fillStyle = '#27ae60';
contexto.fillRect(xNaTela, this.y, this.largura, this.altura);
```

Quando tiver a imagem, o processo é:

1. Colocar o arquivo em `assets/images/enemies/inimigo.png`
2. Carregar a imagem uma vez, no topo do arquivo:
   ```javascript
   const spriteInimigo = new Image();
   spriteInimigo.src = 'assets/images/enemies/inimigo.png';
   ```
3. Trocar o `fillRect` por:
   ```javascript
   contexto.drawImage(spriteInimigo, xNaTela, this.y, this.largura, this.altura);
   ```

O mesmo vale para itens, plataformas e fundos.

## Próximos passos sugeridos

- Adicionar sprites e fazer a animação real (hoje a troca de quadro existe em
  `player.js` na variável `quadroAtual`, mas não é usada visualmente ainda)
- Adicionar sons de pulo, moeda e dano (efeitos em `assets/sounds/sfx`)
- Adicionar música de fundo por fase
- Ajustar o tamanho e posição das plataformas de cada fase em `js/levels.js`
  conforme o tamanho real dos seus sprites
