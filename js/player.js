// ============================================
// PLAYER.JS - O personagem principal: Pino
// ============================================

// TODO: IMAGEM AQUI - troque o caminho abaixo pelo arquivo da imagem do Pino.
// Salve a imagem em assets/images/player/pino-spritesheet.png
//
// MODO ATUAL: imagem única (sem grade de animação).
// O tamanho da imagem é detectado automaticamente, e ela é usada igual
// para os estados parado, andando e pulando (ainda sem animação de quadros).
//
// Quando você desenhar os quadros extras de animação (parado, 4 de andando,
// pulando, todos em grade, do MESMO tamanho cada), troque a linha abaixo para:
//   const SPRITESHEET_PINO = new Spritesheet(
//       'assets/images/player/pino-spritesheet.png',
//       32, // largura de cada quadro
//       40  // altura de cada quadro
//   );
// e o jogo passa a animar automaticamente.
const SPRITESHEET_PINO = new Spritesheet(
    'assets/images/player/pino-spritesheet.png'
);

// Define em qual linha da imagem está cada animação, e quantos quadros ela tem.
// Em modo imagem única, linha/totalQuadros são ignorados pelo Spritesheet,
// mas mantemos a estrutura pronta para quando a grade de animação existir.
const QUADROS_ANIMACAO_PINO = {
    parado: { linha: 0, totalQuadros: 1 },
    andando: { linha: 1, totalQuadros: 4 },
    pulando: { linha: 2, totalQuadros: 1 },
};

const Jogador = {
    x: 50,
    y: 200,
    largura: 32,
    altura: 40,

    velocidadeX: 0,
    velocidadeY: 0,
    velocidadeMaxima: 4,
    forcaPulo: -11,

    noChao: false,
    olhandoParaDireita: true,

    vidas: 3,
    moedas: 0,
    invencivel: false,
    tempoInvencivel: 0,

    // Estado da animação (pronto para quando você adicionar sprites)
    estadoAnimacao: 'parado', // 'parado' | 'andando' | 'pulando'
    estadoAnimacaoAnterior: 'parado',
    quadroAtual: 0,
    contadorAnimacao: 0,

    resetar(x, y) {
        this.x = x;
        this.y = y;
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.noChao = false;
        this.invencivel = false;
    },

    atualizar() {
        // --- Movimento horizontal ---
        if (Input.teclas.esquerda) {
            this.velocidadeX = -this.velocidadeMaxima;
            this.olhandoParaDireita = false;
            this.estadoAnimacao = 'andando';
        } else if (Input.teclas.direita) {
            this.velocidadeX = this.velocidadeMaxima;
            this.olhandoParaDireita = true;
            this.estadoAnimacao = 'andando';
        } else {
            this.velocidadeX *= Fisica.ATRITO;
            this.estadoAnimacao = 'parado';
        }

        // --- Pulo ---
        if (Input.teclas.pular && this.noChao) {
            this.velocidadeY = this.forcaPulo;
            this.noChao = false;
        }

        if (!this.noChao) {
            this.estadoAnimacao = 'pulando';
        }

        // --- Gravidade ---
        this.velocidadeY += Fisica.GRAVIDADE;
        if (this.velocidadeY > Fisica.VELOCIDADE_MAX_QUEDA) {
            this.velocidadeY = Fisica.VELOCIDADE_MAX_QUEDA;
        }

        // Antes de mover, assumimos que não está no chão.
        // A colisão com plataformas (resolvida em game.js) define isso de novo.
        this.noChao = false;

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // --- Invencibilidade temporária após dano ---
        if (this.invencivel) {
            this.tempoInvencivel--;
            if (this.tempoInvencivel <= 0) {
                this.invencivel = false;
            }
        }

        // --- Animação ---
        // Cada estado tem seu próprio número de quadros (definido em QUADROS_ANIMACAO_PINO).
        // Quando o estado muda (ex: parado -> andando), zera o quadro para não
        // começar a animação no meio.
        if (this.estadoAnimacao !== this.estadoAnimacaoAnterior) {
            this.quadroAtual = 0;
            this.contadorAnimacao = 0;
        }
        this.estadoAnimacaoAnterior = this.estadoAnimacao;

        this.contadorAnimacao++;
        if (this.contadorAnimacao > 8) {
            const totalQuadros = QUADROS_ANIMACAO_PINO[this.estadoAnimacao].totalQuadros;
            this.quadroAtual = (this.quadroAtual + 1) % totalQuadros;
            this.contadorAnimacao = 0;
        }
    },

    receberDano() {
        if (this.invencivel) return;
        this.vidas--;
        this.invencivel = true;
        this.tempoInvencivel = 90; // frames de invencibilidade (~1.5s a 60fps)
        this.velocidadeY = -6; // pequeno "empurrão" para cima ao ser atingido
    },

    desenhar(contexto, offsetCameraX) {
        const xNaTela = this.x - offsetCameraX;

        // Pisca enquanto invencível, para dar feedback visual ao jogador
        if (this.invencivel && Math.floor(this.tempoInvencivel / 5) % 2 === 0) {
            return;
        }

        const animacao = QUADROS_ANIMACAO_PINO[this.estadoAnimacao];
        const coluna = this.quadroAtual % animacao.totalQuadros;
        const espelhar = !this.olhandoParaDireita;

        const desenhouImagem = SPRITESHEET_PINO.desenharQuadro(
            contexto,
            animacao.linha,
            coluna,
            xNaTela,
            this.y,
            this.largura,
            this.altura,
            espelhar
        );

        // Enquanto a imagem não estiver disponível (arquivo ainda não adicionado,
        // ou ainda carregando), desenha um retângulo no lugar para o jogo
        // continuar testável normalmente.
        if (!desenhouImagem) {
            contexto.fillStyle = this.estadoAnimacao === 'pulando' ? '#e74c3c' : '#3498db';
            contexto.fillRect(xNaTela, this.y, this.largura, this.altura);

            contexto.fillStyle = '#fff';
            const olhoX = this.olhandoParaDireita ? xNaTela + this.largura - 10 : xNaTela + 6;
            contexto.fillRect(olhoX, this.y + 8, 4, 4);
        }
    },

    getCaixaColisao() {
        return { x: this.x, y: this.y, largura: this.largura, altura: this.altura };
    },
};
