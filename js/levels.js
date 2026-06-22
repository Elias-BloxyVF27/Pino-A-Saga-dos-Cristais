// ============================================
// LEVELS.JS - Dados das 10 fases
// ============================================
// Cada fase é um objeto com:
//   - largura: tamanho total da fase em pixels (a câmera rola até esse limite)
//   - corFundo: cor de fundo provisória (troque pela imagem de fundo depois)
//   - posicaoInicialJogador: onde o Pino aparece ao iniciar a fase
//   - plataformas: lista de retângulos sólidos { x, y, largura, altura }
//   - inimigos: lista de posições iniciais dos inimigos
//   - itens: lista de moedas/cristais
//   - bandeiraFinal: posição do objetivo que termina a fase (estilo "bandeira" do Mario)
//
// TODO: IMAGEM AQUI - cada fase pode receber seu próprio fundo, basta adicionar
// um campo "imagemFundo" e usá-lo em game.js no lugar da cor sólida.

const FASES = [

    // ---------- FASE 1 ----------
    {
        nome: 'Vila de Pino',
        corFundo: '#87CEEB',
        largura: 1600,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 1600, altura: 70 },     // chão principal
            { x: 300, y: 300, largura: 120, altura: 20 },
            { x: 550, y: 250, largura: 120, altura: 20 },
            { x: 900, y: 300, largura: 150, altura: 20 },
        ],
        inimigos: [
            { x: 400, y: 350, alcancePatrulha: 60 },
            { x: 1000, y: 350, alcancePatrulha: 80 },
        ],
        itens: [
            { x: 340, y: 260, tipo: 'moeda' },
            { x: 600, y: 210, tipo: 'moeda' },
            { x: 950, y: 260, tipo: 'cristal' },
        ],
        bandeiraFinal: { x: 1520, y: 230 },
    },

    // ---------- FASE 2 ----------
    {
        nome: 'Floresta Sussurrante',
        corFundo: '#6B8E23',
        largura: 1800,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 700, altura: 70 },
            { x: 800, y: 380, largura: 300, altura: 70 },
            { x: 1200, y: 380, largura: 600, altura: 70 },
            { x: 250, y: 280, largura: 100, altura: 20 },
            { x: 950, y: 280, largura: 100, altura: 20 },
        ],
        inimigos: [
            { x: 300, y: 350, alcancePatrulha: 100 },
            { x: 850, y: 350, alcancePatrulha: 50 },
            { x: 1300, y: 350, alcancePatrulha: 120 },
        ],
        itens: [
            { x: 280, y: 240, tipo: 'moeda' },
            { x: 980, y: 240, tipo: 'cristal' },
            { x: 1400, y: 340, tipo: 'moeda' },
        ],
        bandeiraFinal: { x: 1720, y: 230 },
    },

    // ---------- FASE 3 ----------
    {
        nome: 'Penhascos de Pedra',
        corFundo: '#A9A9A9',
        largura: 1900,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 300, altura: 70 },
            { x: 400, y: 380, largura: 200, altura: 70 },
            { x: 700, y: 380, largura: 200, altura: 70 },
            { x: 1000, y: 380, largura: 250, altura: 70 },
            { x: 1350, y: 380, largura: 550, altura: 70 },
            { x: 200, y: 280, largura: 80, altura: 20 },
            { x: 550, y: 250, largura: 80, altura: 20 },
            { x: 850, y: 280, largura: 80, altura: 20 },
        ],
        inimigos: [
            { x: 450, y: 350, alcancePatrulha: 70 },
            { x: 1050, y: 350, alcancePatrulha: 100 },
            { x: 1450, y: 350, alcancePatrulha: 150 },
        ],
        itens: [
            { x: 230, y: 240, tipo: 'moeda' },
            { x: 580, y: 210, tipo: 'cristal' },
            { x: 880, y: 240, tipo: 'moeda' },
        ],
        bandeiraFinal: { x: 1820, y: 230 },
    },

    // ---------- FASE 4 ----------
    {
        nome: 'Lago Refletido',
        corFundo: '#4682B4',
        largura: 1900,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 250, altura: 70 },
            { x: 320, y: 380, largura: 150, altura: 70 },
            { x: 560, y: 380, largura: 150, altura: 70 },
            { x: 800, y: 380, largura: 150, altura: 70 },
            { x: 1050, y: 380, largura: 850, altura: 70 },
            { x: 280, y: 280, largura: 80, altura: 20 },
            { x: 520, y: 280, largura: 80, altura: 20 },
            { x: 760, y: 280, largura: 80, altura: 20 },
        ],
        inimigos: [
            { x: 350, y: 350, alcancePatrulha: 50 },
            { x: 600, y: 350, alcancePatrulha: 50 },
            { x: 850, y: 350, alcancePatrulha: 50 },
            { x: 1200, y: 350, alcancePatrulha: 120 },
        ],
        itens: [
            { x: 310, y: 240, tipo: 'moeda' },
            { x: 550, y: 240, tipo: 'moeda' },
            { x: 790, y: 240, tipo: 'cristal' },
        ],
        bandeiraFinal: { x: 1820, y: 230 },
    },

    // ---------- FASE 5 ----------
    {
        nome: 'Caverna dos Ecos',
        corFundo: '#2F2F4F',
        largura: 2000,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 400, altura: 70 },
            { x: 500, y: 380, largura: 150, altura: 70 },
            { x: 750, y: 300, largura: 150, altura: 20 },
            { x: 1000, y: 380, largura: 150, altura: 70 },
            { x: 1250, y: 300, largura: 150, altura: 20 },
            { x: 1500, y: 380, largura: 500, altura: 70 },
        ],
        inimigos: [
            { x: 550, y: 350, alcancePatrulha: 50 },
            { x: 1050, y: 350, alcancePatrulha: 50 },
            { x: 1600, y: 350, alcancePatrulha: 150 },
            { x: 1800, y: 350, alcancePatrulha: 100 },
        ],
        itens: [
            { x: 780, y: 260, tipo: 'cristal' },
            { x: 1280, y: 260, tipo: 'cristal' },
        ],
        bandeiraFinal: { x: 1920, y: 230 },
    },

    // ---------- FASE 6 ----------
    {
        nome: 'Templo Submerso',
        corFundo: '#1B4F72',
        largura: 2000,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 250, altura: 70 },
            { x: 300, y: 320, largura: 100, altura: 20 },
            { x: 470, y: 260, largura: 100, altura: 20 },
            { x: 640, y: 320, largura: 100, altura: 20 },
            { x: 810, y: 380, largura: 300, altura: 70 },
            { x: 1180, y: 320, largura: 100, altura: 20 },
            { x: 1350, y: 260, largura: 100, altura: 20 },
            { x: 1520, y: 380, largura: 480, altura: 70 },
        ],
        inimigos: [
            { x: 850, y: 350, alcancePatrulha: 100 },
            { x: 1000, y: 350, alcancePatrulha: 80 },
            { x: 1600, y: 350, alcancePatrulha: 150 },
        ],
        itens: [
            { x: 330, y: 280, tipo: 'moeda' },
            { x: 500, y: 220, tipo: 'cristal' },
            { x: 670, y: 280, tipo: 'moeda' },
        ],
        bandeiraFinal: { x: 1920, y: 230 },
    },

    // ---------- FASE 7 ----------
    {
        nome: 'Picos Congelados',
        corFundo: '#B0E0E6',
        largura: 2100,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 200, altura: 70 },
            { x: 280, y: 330, largura: 90, altura: 20 },
            { x: 450, y: 280, largura: 90, altura: 20 },
            { x: 620, y: 330, largura: 90, altura: 20 },
            { x: 790, y: 380, largura: 200, altura: 70 },
            { x: 1080, y: 330, largura: 90, altura: 20 },
            { x: 1250, y: 280, largura: 90, altura: 20 },
            { x: 1420, y: 330, largura: 90, altura: 20 },
            { x: 1600, y: 380, largura: 500, altura: 70 },
        ],
        inimigos: [
            { x: 830, y: 350, alcancePatrulha: 80 },
            { x: 1650, y: 350, alcancePatrulha: 120 },
            { x: 1900, y: 350, alcancePatrulha: 100 },
        ],
        itens: [
            { x: 460, y: 240, tipo: 'moeda' },
            { x: 1260, y: 240, tipo: 'cristal' },
            { x: 1430, y: 290, tipo: 'moeda' },
        ],
        bandeiraFinal: { x: 2020, y: 230 },
    },

    // ---------- FASE 8 ----------
    {
        nome: 'Fortaleza Abandonada',
        corFundo: '#5D4037',
        largura: 2100,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 300, altura: 70 },
            { x: 380, y: 380, largura: 120, altura: 70 },
            { x: 580, y: 380, largura: 120, altura: 70 },
            { x: 780, y: 380, largura: 120, altura: 70 },
            { x: 980, y: 380, largura: 120, altura: 70 },
            { x: 1180, y: 380, largura: 900, altura: 70 },
            { x: 300, y: 280, largura: 70, altura: 20 },
            { x: 500, y: 280, largura: 70, altura: 20 },
            { x: 700, y: 280, largura: 70, altura: 20 },
            { x: 900, y: 280, largura: 70, altura: 20 },
        ],
        inimigos: [
            { x: 400, y: 350, alcancePatrulha: 40 },
            { x: 600, y: 350, alcancePatrulha: 40 },
            { x: 800, y: 350, alcancePatrulha: 40 },
            { x: 1000, y: 350, alcancePatrulha: 40 },
            { x: 1300, y: 350, alcancePatrulha: 150 },
        ],
        itens: [
            { x: 320, y: 240, tipo: 'moeda' },
            { x: 520, y: 240, tipo: 'moeda' },
            { x: 720, y: 240, tipo: 'cristal' },
            { x: 920, y: 240, tipo: 'moeda' },
        ],
        bandeiraFinal: { x: 2020, y: 230 },
    },

    // ---------- FASE 9 ----------
    {
        nome: 'Torre do Vento',
        corFundo: '#8E44AD',
        largura: 2200,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 200, altura: 70 },
            { x: 260, y: 340, largura: 80, altura: 20 },
            { x: 420, y: 290, largura: 80, altura: 20 },
            { x: 580, y: 240, largura: 80, altura: 20 },
            { x: 740, y: 290, largura: 80, altura: 20 },
            { x: 900, y: 340, largura: 80, altura: 20 },
            { x: 1060, y: 380, largura: 200, altura: 70 },
            { x: 1340, y: 330, largura: 80, altura: 20 },
            { x: 1500, y: 280, largura: 80, altura: 20 },
            { x: 1660, y: 330, largura: 80, altura: 20 },
            { x: 1820, y: 380, largura: 380, altura: 70 },
        ],
        inimigos: [
            { x: 1100, y: 350, alcancePatrulha: 80 },
            { x: 1880, y: 350, alcancePatrulha: 100 },
            { x: 2050, y: 350, alcancePatrulha: 100 },
        ],
        itens: [
            { x: 440, y: 250, tipo: 'moeda' },
            { x: 600, y: 200, tipo: 'cristal' },
            { x: 760, y: 250, tipo: 'moeda' },
            { x: 1520, y: 240, tipo: 'cristal' },
        ],
        bandeiraFinal: { x: 2120, y: 230 },
    },

    // ---------- FASE 10 (final) ----------
    {
        nome: 'Castelo dos Cristais',
        corFundo: '#1C1C2E',
        largura: 2400,
        posicaoInicialJogador: { x: 50, y: 250 },
        plataformas: [
            { x: 0, y: 380, largura: 250, altura: 70 },
            { x: 320, y: 330, largura: 80, altura: 20 },
            { x: 460, y: 280, largura: 80, altura: 20 },
            { x: 600, y: 380, largura: 150, altura: 70 },
            { x: 820, y: 330, largura: 80, altura: 20 },
            { x: 960, y: 280, largura: 80, altura: 20 },
            { x: 1100, y: 380, largura: 150, altura: 70 },
            { x: 1320, y: 330, largura: 80, altura: 20 },
            { x: 1460, y: 280, largura: 80, altura: 20 },
            { x: 1600, y: 380, largura: 150, altura: 70 },
            { x: 1820, y: 330, largura: 80, altura: 20 },
            { x: 1960, y: 280, largura: 80, altura: 20 },
            { x: 2100, y: 380, largura: 300, altura: 70 },
        ],
        inimigos: [
            { x: 650, y: 350, alcancePatrulha: 50 },
            { x: 1150, y: 350, alcancePatrulha: 50 },
            { x: 1650, y: 350, alcancePatrulha: 50 },
            { x: 2150, y: 350, alcancePatrulha: 100 },
            { x: 2300, y: 350, alcancePatrulha: 80 },
        ],
        itens: [
            { x: 480, y: 240, tipo: 'cristal' },
            { x: 980, y: 240, tipo: 'cristal' },
            { x: 1480, y: 240, tipo: 'cristal' },
            { x: 1980, y: 240, tipo: 'cristal' },
        ],
        bandeiraFinal: { x: 2320, y: 230 },
    },
];

// Cria uma cópia "fresca" e independente dos dados da fase, transformando
// os objetos simples de inimigos e itens em instâncias reais das classes
// Inimigo e Item. Isso é necessário porque cada vez que o jogador entra
// numa fase (ou reinicia), precisamos de inimigos/itens "zerados de novo".
function construirFase(indiceFase) {
    const dados = FASES[indiceFase];

    return {
        nome: dados.nome,
        corFundo: dados.corFundo,
        largura: dados.largura,
        posicaoInicialJogador: { ...dados.posicaoInicialJogador },
        plataformas: dados.plataformas.map((p) => ({ ...p })),
        inimigos: dados.inimigos.map((i) => new Inimigo(i.x, i.y, i.alcancePatrulha)),
        itens: dados.itens.map((i) => new Item(i.x, i.y, i.tipo)),
        bandeiraFinal: { ...dados.bandeiraFinal, largura: 20, altura: 80 },
    };
}
