// ============================================
// PHYSICS.JS - Gravidade e colisão básica
// ============================================

const Fisica = {
    GRAVIDADE: 0.6,
    VELOCIDADE_MAX_QUEDA: 14,
    ATRITO: 0.85, // desaceleração quando nenhuma tecla de movimento está pressionada
};

// Verifica se dois retângulos (caixas de colisão) estão se sobrepondo.
// Tanto o jogador quanto inimigos, plataformas e itens usam esse mesmo
// formato de caixa: { x, y, largura, altura }
function caixasColidem(caixaA, caixaB) {
    return (
        caixaA.x < caixaB.x + caixaB.largura &&
        caixaA.x + caixaA.largura > caixaB.x &&
        caixaA.y < caixaB.y + caixaB.altura &&
        caixaA.y + caixaA.altura > caixaB.y
    );
}

// Resolve a colisão entre um objeto que se move (ex: jogador) e uma
// plataforma sólida e fixa. Empurra o objeto para fora da plataforma
// pelo lado mais próximo e ajusta sua velocidade.
function resolverColisaoComPlataforma(objeto, plataforma) {
    if (!caixasColidem(objeto, plataforma)) return null;

    const sobreposicaoEsquerda = (objeto.x + objeto.largura) - plataforma.x;
    const sobreposicaoDireita = (plataforma.x + plataforma.largura) - objeto.x;
    const sobreposicaoCima = (objeto.y + objeto.altura) - plataforma.y;
    const sobreposicaoBaixo = (plataforma.y + plataforma.altura) - objeto.y;

    const menorSobreposicao = Math.min(
        sobreposicaoEsquerda,
        sobreposicaoDireita,
        sobreposicaoCima,
        sobreposicaoBaixo
    );

    if (menorSobreposicao === sobreposicaoCima) {
        objeto.y -= sobreposicaoCima;
        objeto.velocidadeY = 0;
        objeto.noChao = true;
        return 'cima';
    } else if (menorSobreposicao === sobreposicaoBaixo) {
        objeto.y += sobreposicaoBaixo;
        objeto.velocidadeY = 0;
        return 'baixo';
    } else if (menorSobreposicao === sobreposicaoEsquerda) {
        objeto.x -= sobreposicaoEsquerda;
        objeto.velocidadeX = 0;
        return 'esquerda';
    } else {
        objeto.x += sobreposicaoDireita;
        objeto.velocidadeX = 0;
        return 'direita';
    }
}
