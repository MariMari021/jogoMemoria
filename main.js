const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

const cartas = ['uva.jpg', 'melancia.jpg', 'limao.jpg', 'abacate.jpg', 'maca.jpg', 'kiwi.jpg', 'abacaxi.jpg', 'pera.jpg', 'uva.jpg', 'melancia.jpg', 'limao.jpg', 'abacate.jpg', 'maca.jpg', 'pera.jpg', 'kiwi.jpg', 'abacaxi.jpg'];



let cartasViradas = [];
let cartasEncontradas = [];
let virandoCarta = false;

const larguraCarta = 130;
const alturaCarta = 130;
const espacamento = 37;
const numColunas = 4;
const numLinhas = 4;
const color = "blue"

const cartaMouse = { x: 0, y: 0 };

canvas.addEventListener('mousedown', virarCarta);

function desenharCartas() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    for (let linha = 0; linha < numLinhas; linha++) {
        for (let coluna = 0; coluna < numColunas; coluna++) {
            const index = linha * numColunas + coluna;
            const x = coluna * (larguraCarta + espacamento);
            const y = linha * (alturaCarta + espacamento);

            if (!cartasEncontradas.includes(cartas[index])) {
                if (cartasViradas.includes(index)) {
                    const imagem = new Image();
                    imagem.src = cartas[index];
                    imagem.onload = function () {
                        contexto.drawImage(imagem, x, y, larguraCarta, alturaCarta);
                    };
                } else {
                    contexto.fillStyle = '#9f549f';
                    contexto.fillRect(x, y, larguraCarta, alturaCarta);
                }
            }
        }
    }
}

// element.addEventListener("mousemove", function(){
//     cartas.fillStyle= element.color
// })

function virarCarta(event) {
    if (virandoCarta || cartasViradas.length >= 2) {
        return;
    }

    const x = event.offsetX;
    const y = event.offsetY;

    const coluna = Math.floor(x / (larguraCarta + espacamento));
    const linha = Math.floor(y / (alturaCarta + espacamento));

    const index = linha * numColunas + coluna;

    if (!cartasViradas.includes(index) && !cartasEncontradas.includes(cartas[index])) {
        cartasViradas.push(index);

        if (cartasViradas.length === 2) {
            virandoCarta = true;

            setTimeout(() => {
                const [indice1, indice2] = cartasViradas;
                if (cartas[indice1] === cartas[indice2]) {
                    cartasEncontradas.push(cartas[indice1]);
                    if (cartasEncontradas.length === cartas.length / 2) {
                        alert('Parabéns, você ganhou!');
                    }
                }

                cartasViradas = [];
                virandoCarta = false;

                desenharCartas();
            }, 1000);
        }

        desenharCartas();
    }
}

desenharCartas();



