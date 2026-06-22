// ============================================
// MAIN.JS - Ponto de entrada e loop principal do jogo
// ============================================

function loopPrincipal() {
    if (Jogo.estadoAtual === Jogo.ESTADOS.JOGANDO) {
        Jogo.atualizar();
        Jogo.desenhar();
    }

    requestAnimationFrame(loopPrincipal);
}

// Espera o HTML carregar completamente antes de iniciar o jogo
window.addEventListener('DOMContentLoaded', () => {
    Jogo.iniciar();
    requestAnimationFrame(loopPrincipal);
});
