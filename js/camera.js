// ============================================
// CAMERA.JS - Câmera que segue o jogador
// ============================================
// Em jogos de plataforma a fase é maior que a tela. A câmera guarda
// um deslocamento (offset) que é subtraído da posição de tudo que é
// desenhado, criando a ilusão de "rolagem" do cenário.

const Camera = {
    x: 0,
    y: 0,
    largura: 800,
    altura: 450,

    atualizar(jogador, larguraDaFase) {
        // Mantém o jogador centralizado horizontalmente na tela
        const alvoX = jogador.x - this.largura / 2 + jogador.largura / 2;

        // Suaviza o movimento da câmera (em vez de "teleportar" até o alvo)
        this.x += (alvoX - this.x) * 0.1;

        // Não deixa a câmera mostrar área antes do início ou depois do fim da fase
        this.x = Math.max(0, Math.min(this.x, larguraDaFase - this.largura));
    },
};
