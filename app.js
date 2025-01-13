let listaDeNumerosSorteados = [];
let numeroLimite = 20;
let numeroSecreto = gerarAleatorio();
let tentativas = 1;

const titulo = document.querySelector('h1');
const paragrafo = document.querySelector('p');
const inputChute = document.querySelector('input');
const botaoReiniciar = document.getElementById('reiniciar');

function exibirTexto(elemento, texto) {
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', { rate: 1.3 });
}

function exibirMensagemInicial() {
    exibirTexto(titulo, 'Jogo da Advinhação Mil Grau');
    exibirTexto(paragrafo, `Escolha um número de 1 a ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = inputChute.value;

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTexto(paragrafo, `Por favor, digite um número entre 1 e ${numeroLimite}.`);
        limparCampo();
        return;
    }

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto(titulo, 'Você ganhou!');
        exibirTexto(paragrafo, `Meus parabéns, doido! Você acertou com ${tentativas} ${palavraTentativa}.`);
        botaoReiniciar.removeAttribute('disabled');
    } else {
        exibirTexto(paragrafo, chute > numeroSecreto ? 'O número secreto é menor.' : 'O número secreto é maior.');
        tentativas++;
        limparCampo();
    }
}

function gerarAleatorio() {
    while (true) {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        if (!listaDeNumerosSorteados.includes(numeroEscolhido)) {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
    }
}

function limparCampo() {
    inputChute.value = '';
}

function rJogo() {
    numeroSecreto = gerarAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    botaoReiniciar.setAttribute('disabled', true);
}

inputChute.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});

