// ============================================
// INPUT.JS - Captura do teclado
// ============================================
// Guarda quais teclas estão pressionadas neste exato momento.
// Outros arquivos (como player.js) consultam este objeto para
// saber se devem mover o personagem, pular, etc.

const Input = {
    teclas: {
        esquerda: false,
        direita: false,
        pular: false,
    },
};

// Mapeia várias teclas físicas para cada ação do jogo.
// Assim aceitamos tanto WASD quanto as setas do teclado.
const MAPA_TECLAS = {
    ArrowLeft: 'esquerda',
    KeyA: 'esquerda',
    ArrowRight: 'direita',
    KeyD: 'direita',
    ArrowUp: 'pular',
    KeyW: 'pular',
    Space: 'pular',
};

window.addEventListener('keydown', (evento) => {
    const acao = MAPA_TECLAS[evento.code];
    if (acao) {
        Input.teclas[acao] = true;
        evento.preventDefault(); // evita rolar a página com as setas/espaço
    }
});

window.addEventListener('keyup', (evento) => {
    const acao = MAPA_TECLAS[evento.code];
    if (acao) {
        Input.teclas[acao] = false;
        evento.preventDefault();
    }
});
