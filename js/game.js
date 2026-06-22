// ============================================
// GAME.JS - Controle dos estados do jogo e da fase atual
// ============================================

// TODO: IMAGEM AQUI - salve os arquivos nestes caminhos.
// Cada imagem é detectada automaticamente no tamanho real (modo imagem única).
//
// SPRITE_TERRA: usado em toda plataforma/chão do jogo (repetido lado a lado,
//   tipo um "ladrilho", para cobrir plataformas de qualquer tamanho).
// SPRITE_CEU: usado como fundo de todas as fases (estica para cobrir a tela
//   inteira). Se quiser um fundo diferente por fase, me avise depois.
const SPRITE_TERRA = new Spritesheet('assets/images/tiles/earth.png');
const SPRITE_CEU = new Spritesheet('assets/images/backgrounds/sky.png');

const Jogo = {
    ESTADOS: {
        MENU: 'menu',
        JOGANDO: 'jogando',
        GAME_OVER: 'game_over',
        VITORIA: 'vitoria',
    },

    estadoAtual: 'menu',
    numeroFaseAtual: 0, // índice 0 = Fase 1
    faseAtual: null,

    canvas: null,
    contexto: null,

    iniciar() {
        this.canvas = document.getElementById('game-canvas');
        this.contexto = this.canvas.getContext('2d');

        this.configurarBotoes();
        this.irParaMenu();
    },

    configurarBotoes() {
        document.getElementById('btn-iniciar').addEventListener('click', () => {
            this.numeroFaseAtual = 0;
            Jogador.vidas = 3;
            Jogador.moedas = 0;
            this.iniciarFase(this.numeroFaseAtual);
        });

        document.getElementById('btn-reiniciar').addEventListener('click', () => {
            Jogador.vidas = 3;
            Jogador.moedas = 0;
            this.iniciarFase(this.numeroFaseAtual);
        });

        document.getElementById('btn-jogar-de-novo').addEventListener('click', () => {
            this.numeroFaseAtual = 0;
            Jogador.vidas = 3;
            Jogador.moedas = 0;
            this.iniciarFase(this.numeroFaseAtual);
        });
    },

    mostrarTela(idTela) {
        const telas = ['menu-screen', 'game-canvas', 'gameover-screen', 'vitoria-screen'];
        telas.forEach((id) => {
            document.getElementById(id).style.display = id === idTela ? (id === 'game-canvas' ? 'block' : 'flex') : 'none';
        });
    },

    irParaMenu() {
        this.estadoAtual = this.ESTADOS.MENU;
        document.getElementById('menu-fase-numero').textContent = this.numeroFaseAtual + 1;
        this.mostrarTela('menu-screen');
    },

    iniciarFase(indiceFase) {
        this.faseAtual = construirFase(indiceFase);
        Jogador.resetar(
            this.faseAtual.posicaoInicialJogador.x,
            this.faseAtual.posicaoInicialJogador.y
        );

        this.estadoAtual = this.ESTADOS.JOGANDO;
        this.mostrarTela('game-canvas');
    },

    irParaProximaFase() {
        this.numeroFaseAtual++;

        if (this.numeroFaseAtual >= FASES.length) {
            this.estadoAtual = this.ESTADOS.VITORIA;
            this.mostrarTela('vitoria-screen');
        } else {
            this.iniciarFase(this.numeroFaseAtual);
        }
    },

    irParaGameOver() {
        this.estadoAtual = this.ESTADOS.GAME_OVER;
        this.mostrarTela('gameover-screen');
    },

    // Chamado uma vez por frame, somente quando estadoAtual === JOGANDO
    atualizar() {
        Jogador.atualizar();

        // Colisão do jogador com as plataformas da fase
        for (const plataforma of this.faseAtual.plataformas) {
            resolverColisaoComPlataforma(Jogador, plataforma);
        }

        // Impede o jogador de saber para fora da fase pela esquerda
        if (Jogador.x < 0) {
            Jogador.x = 0;
        }

        // Se o jogador cair no "vazio" (abaixo da tela), perde uma vida
        if (Jogador.y > this.canvas.height + 100) {
            Jogador.receberDano();
            if (Jogador.vidas > 0) {
                Jogador.resetar(
                    this.faseAtual.posicaoInicialJogador.x,
                    this.faseAtual.posicaoInicialJogador.y
                );
            }
        }

        // Atualiza inimigos e verifica colisão com o jogador
        for (const inimigo of this.faseAtual.inimigos) {
            inimigo.atualizar();
        }
        verificarColisoesComInimigos(Jogador, this.faseAtual.inimigos);

        // Verifica coleta de itens
        verificarColetaDeItens(Jogador, this.faseAtual.itens);

        // Verifica se o jogador chegou na bandeira final da fase
        if (caixasColidem(Jogador.getCaixaColisao(), this.faseAtual.bandeiraFinal)) {
            this.irParaProximaFase();
            return;
        }

        // Verifica game over
        if (Jogador.vidas <= 0) {
            this.irParaGameOver();
            return;
        }

        Camera.atualizar(Jogador, this.faseAtual.largura);
    },

    // Chamado uma vez por frame, somente quando estadoAtual === JOGANDO
    desenhar() {
        const contexto = this.contexto;
        const largura = this.canvas.width;
        const altura = this.canvas.height;

        // Fundo (céu) - estica a imagem para cobrir a tela inteira.
        const desenhouCeu = SPRITE_CEU.desenharImagemUnica(contexto, 0, 0, largura, altura);
        if (!desenhouCeu) {
            contexto.fillStyle = this.faseAtual.corFundo;
            contexto.fillRect(0, 0, largura, altura);
        }

        // Plataformas
        for (const plataforma of this.faseAtual.plataformas) {
            const xNaTela = plataforma.x - Camera.x;

            // Só desenha o que está visível na tela (otimização simples)
            if (xNaTela + plataforma.largura < 0 || xNaTela > largura) continue;

            const desenhouTerra = SPRITE_TERRA.desenharLadrilhado(
                contexto,
                xNaTela,
                plataforma.y,
                plataforma.largura,
                plataforma.altura
            );

            if (!desenhouTerra) {
                contexto.fillStyle = '#7B4A2D';
                contexto.fillRect(xNaTela, plataforma.y, plataforma.largura, plataforma.altura);
            }
        }

        // Itens
        for (const item of this.faseAtual.itens) {
            item.desenhar(contexto, Camera.x);
        }

        // Inimigos
        for (const inimigo of this.faseAtual.inimigos) {
            inimigo.desenhar(contexto, Camera.x);
        }

        // Bandeira final
        const bandeira = this.faseAtual.bandeiraFinal;
        const bandeiraXNaTela = bandeira.x - Camera.x;
        // TODO: IMAGEM AQUI - substituir pelo sprite da bandeira/objetivo da fase.
        contexto.fillStyle = '#ecf0f1';
        contexto.fillRect(bandeiraXNaTela, bandeira.y, 6, bandeira.altura);
        contexto.fillStyle = '#e74c3c';
        contexto.fillRect(bandeiraXNaTela + 6, bandeira.y, 18, 14);

        // Jogador
        Jogador.desenhar(contexto, Camera.x);

        // HUD por cima de tudo
        HUD.desenhar(contexto, Jogador, this.numeroFaseAtual + 1, this.faseAtual.nome);
    },
};
