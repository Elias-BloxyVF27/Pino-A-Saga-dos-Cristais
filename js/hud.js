// ============================================
// HUD.JS - Interface na tela durante o jogo (vidas, moedas, fase)
// ============================================

const HUD = {
    desenhar(contexto, jogador, numeroFase, nomeFase) {
        contexto.fillStyle = '#fff';
        contexto.font = '16px monospace';
        contexto.textAlign = 'left';

        // TODO: IMAGEM AQUI - pode trocar o texto "Vidas:" por um ícone de coração
        // desenhado com drawImage, repetido conforme jogador.vidas.
        contexto.fillText(`Vidas: ${jogador.vidas}`, 16, 28);

        // TODO: IMAGEM AQUI - pode trocar o texto "Moedas:" por um ícone de moeda.
        contexto.fillText(`Moedas: ${jogador.moedas}`, 16, 50);

        contexto.textAlign = 'right';
        contexto.fillText(`Fase ${numeroFase}/10 - ${nomeFase}`, contexto.canvas.width - 16, 28);
    },
};
