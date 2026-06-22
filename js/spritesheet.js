// ============================================
// SPRITESHEET.JS - Carregamento e recorte de spritesheets
// ============================================
// Um spritesheet é uma única imagem contendo vários quadros de animação
// organizados em grade (linhas e colunas). Esta classe guarda a imagem
// e sabe desenhar exatamente o quadro certo na tela.
//
// Também funciona em "modo imagem única": se você ainda não tem uma grade
// de animação pronta, pode usar uma imagem comum (sem grade) e o sistema
// desenha ela inteira, sem recorte.

class Spritesheet {
    // caminho: endereço do arquivo de imagem (ex: 'assets/images/player/pino-spritesheet.png')
    // larguraQuadro / alturaQuadro: tamanho de UM quadro individual, em pixels.
    //   Passe null em ambos (ou simplesmente omita) se a imagem for única,
    //   sem grade de animação - o tamanho real do arquivo será detectado
    //   automaticamente quando ele carregar.
    constructor(caminho, larguraQuadro = null, alturaQuadro = null) {
        this.imagem = new Image();
        this.carregada = false;
        this.larguraQuadro = larguraQuadro;
        this.alturaQuadro = alturaQuadro;
        this.modoImagemUnica = larguraQuadro === null || alturaQuadro === null;

        this.imagem.onload = () => {
            this.carregada = true;

            // Em modo imagem única, descobrimos o tamanho real do arquivo
            // depois que ele termina de carregar (antes disso, width/height
            // do objeto Image ainda não estão disponíveis).
            if (this.modoImagemUnica) {
                this.larguraQuadro = this.imagem.naturalWidth;
                this.alturaQuadro = this.imagem.naturalHeight;
            }
        };

        this.imagem.onerror = () => {
            console.warn(`Não foi possível carregar o spritesheet: ${caminho}. Usando retângulo de placeholder.`);
        };

        this.imagem.src = caminho;
    }

    // Desenha a imagem repetida (ladrilhada) lado a lado, cobrindo uma área
    // de "largura" x "altura". Útil para plataformas/chão de tamanhos variados,
    // onde um único tile precisa se repetir até cobrir toda a extensão.
    // tamanhoTile: tamanho (em pixels) de cada ladrilho desenhado na tela.
    desenharLadrilhado(contexto, x, y, largura, altura, tamanhoTile = 32) {
        if (!this.carregada) return false;

        for (let offsetX = 0; offsetX < largura; offsetX += tamanhoTile) {
            for (let offsetY = 0; offsetY < altura; offsetY += tamanhoTile) {
                const larguraTile = Math.min(tamanhoTile, largura - offsetX);
                const alturaTile = Math.min(tamanhoTile, altura - offsetY);

                contexto.drawImage(
                    this.imagem,
                    0, 0, this.larguraQuadro, this.alturaQuadro,
                    x + offsetX, y + offsetY, larguraTile, alturaTile
                );
            }
        }

        return true;
    }

    // Desenha a imagem inteira, sem recorte de grade. Use quando ainda não
    // tiver os vários quadros de animação prontos (jogador.js já cai
    // automaticamente nesse modo se larguraQuadro/alturaQuadro não forem
    // passados no construtor).
    desenharImagemUnica(contexto, x, y, largura, altura, espelhar = false) {
        if (!this.carregada) return false;

        if (espelhar) {
            contexto.save();
            contexto.translate(x + largura, y);
            contexto.scale(-1, 1);
            contexto.drawImage(this.imagem, 0, 0, largura, altura);
            contexto.restore();
        } else {
            contexto.drawImage(this.imagem, x, y, largura, altura);
        }

        return true;
    }

    // linha/coluna: posição do quadro dentro da grade (começando em 0)
    // x/y/largura/altura: onde e em que tamanho desenhar na tela
    // espelhar: true para virar o desenho horizontalmente (jogador olhando p/ esquerda)
    desenharQuadro(contexto, linha, coluna, x, y, largura, altura, espelhar = false) {
        if (!this.carregada) return false; // avisa quem chamou que não desenhou nada

        // Se estamos em modo imagem única (sem grade), ignora linha/coluna
        // e desenha a imagem inteira - assim o mesmo código de player.js
        // funciona tanto com spritesheet completo quanto com 1 imagem só.
        if (this.modoImagemUnica) {
            return this.desenharImagemUnica(contexto, x, y, largura, altura, espelhar);
        }

        const origemX = coluna * this.larguraQuadro;
        const origemY = linha * this.alturaQuadro;

        if (espelhar) {
            contexto.save();
            // Inverte o eixo X em torno do centro do personagem para "virar" o sprite
            contexto.translate(x + largura, y);
            contexto.scale(-1, 1);
            contexto.drawImage(
                this.imagem,
                origemX, origemY, this.larguraQuadro, this.alturaQuadro,
                0, 0, largura, altura
            );
            contexto.restore();
        } else {
            contexto.drawImage(
                this.imagem,
                origemX, origemY, this.larguraQuadro, this.alturaQuadro,
                x, y, largura, altura
            );
        }

        return true;
    }
}
