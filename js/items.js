// ============================================
// ITEMS.JS - Moedas e cristais coletáveis
// ============================================

// TODO: IMAGEM AQUI - salve os arquivos nestes caminhos.
// Cada imagem é detectada automaticamente no tamanho real (modo imagem única).
const SPRITE_MOEDA = new Spritesheet('assets/images/items/moeda.png');
const SPRITE_CRISTAL = new Spritesheet('assets/images/items/crystal.png');

class Item {
    constructor(x, y, tipo = 'moeda') {
        this.x = x;
        this.y = y;
        this.largura = 20;
        this.altura = 20;
        this.tipo = tipo; // 'moeda' ou 'cristal' (o cristal pode valer mais pontos)
        this.coletado = false;
    }

    getCaixaColisao() {
        return { x: this.x, y: this.y, largura: this.largura, altura: this.altura };
    }

    desenhar(contexto, offsetCameraX) {
        if (this.coletado) return;
        const xNaTela = this.x - offsetCameraX;

        const sprite = this.tipo === 'cristal' ? SPRITE_CRISTAL : SPRITE_MOEDA;
        const desenhouImagem = sprite.desenharImagemUnica(
            contexto,
            xNaTela,
            this.y,
            this.largura,
            this.altura
        );

        // Enquanto a imagem não existir/carregar, desenha o círculo de
        // placeholder para o jogo continuar testável normalmente.
        if (!desenhouImagem) {
            contexto.fillStyle = this.tipo === 'cristal' ? '#9b59b6' : '#f1c40f';
            contexto.beginPath();
            contexto.arc(
                xNaTela + this.largura / 2,
                this.y + this.altura / 2,
                this.largura / 2,
                0,
                Math.PI * 2
            );
            contexto.fill();
        }
    }
}

// Verifica se o jogador coletou algum item da lista.
// Itens já coletados são ignorados.
function verificarColetaDeItens(jogador, itens) {
    for (const item of itens) {
        if (item.coletado) continue;

        if (caixasColidem(jogador.getCaixaColisao(), item.getCaixaColisao())) {
            item.coletado = true;
            jogador.moedas += item.tipo === 'cristal' ? 5 : 1;
        }
    }
}
