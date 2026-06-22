// ============================================
// ENEMY.JS - Inimigos simples (patrulham e podem ser derrotados)
// ============================================

// TODO: IMAGEM AQUI - salve o arquivo neste caminho.
// O tamanho é detectado automaticamente (modo imagem única).
const SPRITE_INIMIGO = new Spritesheet('assets/images/enemies/enemy.png');

class Inimigo {
    constructor(x, y, alcancePatrulha = 80) {
        this.x = x;
        this.y = y;
        this.largura = 28;
        this.altura = 28;

        this.xInicial = x;
        this.alcancePatrulha = alcancePatrulha;
        this.velocidade = 1.2;
        this.direcao = 1; // 1 = direita, -1 = esquerda

        this.vivo = true;
    }

    atualizar() {
        if (!this.vivo) return;

        this.x += this.velocidade * this.direcao;

        // Inverte a direção ao atingir os limites da patrulha
        if (this.x > this.xInicial + this.alcancePatrulha) {
            this.direcao = -1;
        } else if (this.x < this.xInicial - this.alcancePatrulha) {
            this.direcao = 1;
        }
    }

    derrotar() {
        this.vivo = false;
    }

    getCaixaColisao() {
        return { x: this.x, y: this.y, largura: this.largura, altura: this.altura };
    }

    desenhar(contexto, offsetCameraX) {
        if (!this.vivo) return;
        const xNaTela = this.x - offsetCameraX;

        // Espelha o sprite conforme a direção da patrulha (1 = direita, -1 = esquerda)
        const espelhar = this.direcao < 0;

        const desenhouImagem = SPRITE_INIMIGO.desenharImagemUnica(
            contexto,
            xNaTela,
            this.y,
            this.largura,
            this.altura,
            espelhar
        );

        if (!desenhouImagem) {
            contexto.fillStyle = '#27ae60';
            contexto.fillRect(xNaTela, this.y, this.largura, this.altura);
        }
    }
}

// Verifica colisões entre o jogador e uma lista de inimigos.
// Se o jogador cair em cima, o inimigo é derrotado e o jogador quica.
// Se colidir pela lateral/baixo, o jogador recebe dano.
function verificarColisoesComInimigos(jogador, inimigos) {
    for (const inimigo of inimigos) {
        if (!inimigo.vivo) continue;

        if (caixasColidem(jogador.getCaixaColisao(), inimigo.getCaixaColisao())) {
            const jogadorVindoDeArriba =
                jogador.velocidadeY > 0 &&
                jogador.y + jogador.altura - inimigo.y < 15;

            if (jogadorVindoDeArriba) {
                inimigo.derrotar();
                jogador.velocidadeY = jogador.forcaPulo * 0.6; // pequeno quique
            } else {
                jogador.receberDano();
            }
        }
    }
}
