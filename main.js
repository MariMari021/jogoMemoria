// Obtém o elemento 'canvas' do documento HTML
const canvas = document.getElementById('canvas');

// Obtém o contexto de desenho 2D do 'canvas'
const contexto = canvas.getContext('2d');

// Lista de nomes de imagens que representam as cartas do jogo
const cartas = ['uva.jpg', 'melancia.jpg', 'limao.jpg', 'abacate.jpg', 'maca.jpg', 'kiwi.jpg', 'abacaxi.jpg', 'pera.jpg', 'uva.jpg', 'melancia.jpg', 'limao.jpg', 'abacate.jpg', 'maca.jpg', 'pera.jpg', 'kiwi.jpg', 'abacaxi.jpg'];

// Listas para acompanhar as cartas no jogo
let cartasViradas = [];          // Cartas atualmente viradas
let cartasEncontradas = [];      // Pares de cartas já encontrados
let virandoCarta = false;        // Controla se uma carta está sendo virada

// Dimensões das cartas e layout do jogo
const larguraCarta = 130;        // Largura padrão de uma carta
const alturaCarta = 130;         // Altura padrão de uma carta
const espacamento = 37;          // Espaço entre as cartas
const numColunas = 4;            // Número de colunas de cartas
const numLinhas = 4;             // Número de linhas de cartas

// Objeto para rastrear a posição do mouse no 'canvas'
const cartaMouse = { x: 0, y: 0 };

// Configura um evento de clique do mouse para virar cartas
canvas.addEventListener('mousedown', virarCarta);

// Função para desenhar as cartas no 'canvas'
function desenharCartas() {
    // Limpa o 'canvas' para apagar desenhos anteriores
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Loop para desenhar cada carta no jogo
    for (let linha = 0; linha < numLinhas; linha++) {
        for (let coluna = 0; coluna < numColunas; coluna++) {
            const index = linha * numColunas + coluna;
            const x = coluna * (larguraCarta + espacamento);
            const y = linha * (alturaCarta + espacamento);

            // Verifica se a carta não foi encontrada
            if (!cartasEncontradas.includes(cartas[index])) {
                // Verifica se a carta está virada
                if (cartasViradas.includes(index)) {
                    const imagem = new Image();
                    imagem.src = cartas[index];
                    imagem.onload = function () {
                        // Desenha a imagem da carta
                        contexto.drawImage(imagem, x, y, larguraCarta, alturaCarta);
                    };
                } else {
                    // Preenche com uma cor quando a carta não está virada
                    contexto.fillStyle = '#9f549f';
                    contexto.fillRect(x, y, larguraCarta, alturaCarta);
                }
            }
        }
    }
}

// Função para virar uma carta quando o mouse é clicado
function virarCarta(event) {
    // Verifica se já está virando uma carta ou se duas cartas já estão viradas
    if (virandoCarta || cartasViradas.length >= 2) {
        return;
    }

    // Obtém a posição do clique do mouse no 'canvas'
    const x = event.offsetX;
    const y = event.offsetY;

    // Calcula a coluna e a linha da carta clicada
    const coluna = Math.floor(x / (larguraCarta + espacamento));
    const linha = Math.floor(y / (alturaCarta + espacamento));

    // Calcula o índice da carta clicada
    const index = linha * numColunas + coluna;

    // Verifica se a carta já não foi virada e não foi encontrada
    if (!cartasViradas.includes(index) && !cartasEncontradas.includes(cartas[index])) {
        // Adiciona o índice da carta à lista de cartas viradas
        cartasViradas.push(index);

        // Quando duas cartas estão viradas, começa a verificar se correspondem
        if (cartasViradas.length === 2) {
            virandoCarta = true;

            setTimeout(() => {
                const [indice1, indice2] = cartasViradas;

                // Verifica se as cartas correspondem pelo nome da imagem
                if (cartas[indice1] === cartas[indice2]) {
                    // Adiciona as cartas encontradas à lista
                    cartasEncontradas.push(cartas[indice1]);

                    // Se todas as cartas forem encontradas, exibe um alerta de vitória
                    if (cartasEncontradas.length === cartas.length / 2) {
                        alert('Parabéns, você ganhou!');
                    }
                }

                // Reseta as cartas viradas
                cartasViradas = [];
                virandoCarta = false;

                // Redesenha as cartas
                desenharCartas();
            }, 1000); // Aguarda 1 segundo antes de virar as cartas novamente
        }

        // Redesenha as cartas
        desenharCartas();
    }
}

// Inicialmente, desenha as cartas no 'canvas' para iniciar o jogo
desenharCartas();
