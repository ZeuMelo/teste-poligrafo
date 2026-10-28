
let perguntas = [
    "Você conhecia a vítima?",
    "Você esteve no local da ocorrência?",
    "Você teve algum desentendimento com a vítima?",
    "Você sabe o horário em que ocorreu o crime?",
    "Você conversou com a vítima no dia do ocorrido?",
    "Você possui alguma informação que ainda não revelou à polícia?",
    "Você conhece alguém que teria motivos para cometer o crime?",
    "Você esteve próximo ao local na hora do ocorrido?",
    "Você tentou esconder alguma informação dos investigadores?",
    "Você sabe quem foi o responsável pelo crime?"
];

let classificacao = [
    "Inocente.",
    "Suspeito.",
    "Cúmplice.",
    "Culpado."
];

let mensagem = [
    "As respostas do indivíduo não indicam um nivel significativo de suspeita, por enquanto liberado.",
    "As respostas do indivíduo lenvatam dúvidas, mantenha-o sobre investigação.",
    "As respostas do indivíduo levantam possivel conexão com o caso, mantenha-o sobre investigação para descobrir seu envolvimento. ",
    "O indivíduo chegou ao nível máximo de suspeita com suas respostas, tome as medidas nescessárias para com o acusado, e mantenha cautela, não sabemos o nível de periculosidade."
];

let atual = 0;
let contador = 0;
let batimentos = 72;

document.getElementById("areaPergunta").style.display = "none";

function iniciar() {
    document.getElementById("botaoIniciar").style.display = "none";
    document.getElementById("areaPergunta").style.display = "block";
    document.getElementById("estado").innerHTML = "EM ANDAMENTO";

    mostrarPergunta();
}

function mostrarPergunta() {
    document.getElementById("numero").innerHTML =
        "PERGUNTA " + (atual + 1) + " DE " + perguntas.length;

    document.getElementById("pergunta").innerHTML = perguntas[atual];

    document.getElementById("progresso").innerHTML =
        "Perguntas respondidas: " + atual + " de " + perguntas.length;

    document.getElementById("resposta").value = "";
}

function responder() {
    let resposta = document.getElementById("resposta").value;

    if (resposta == "") {
        alert("Selecione uma resposta!");
        return;
    }

    if (resposta == "sim") {
        contador++;
        batimentos = batimentos + 8;
    } else {
        batimentos = batimentos + 2;
    }

    if (batimentos > 150) {
        batimentos = 150;
    }

    document.getElementById("bpm").innerHTML = batimentos;

    document.getElementById("coracao").style.animationDuration =
        (1.2 - batimentos / 200) + "s";

    document.getElementById("saturacao").innerHTML =
        Math.floor(97 + Math.random() * 3);

    atual++;

    if (atual < perguntas.length) {
        mostrarPergunta();
    } else {
        resultado();
    }
}

function resultado() {
    let indice;

    if (contador < 5) {
        indice = 0;
    } else if (contador == 5) {
        indice = 1;
    } else if (contador <= 8) {
        indice = 2;
    } else {
        indice = 3;
    }

    document.getElementById("numero").innerHTML =
        "INTERROGATÓRIO FINALIZADO";

    document.getElementById("pergunta").innerHTML =
        classificacao[indice];

    document.getElementById("resultado").innerHTML =
        mensagem[indice];

    document.getElementById("areaPergunta").style.display = "none";
    document.getElementById("estado").innerHTML = "FINALIZADO";

    document.getElementById("progresso").innerHTML =
        "Respostas positivas: " + contador + " de " + perguntas.length;

    let botao = document.createElement("button");

    botao.innerHTML = "Reiniciar interrogatório";

    botao.onclick = function() {
        location.reload();
    };

    document.querySelector(".painelPerguntas").appendChild(botao);
}
