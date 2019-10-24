//#region variaveis
var imagens = ["hulk", "erik", "pantera", "viuva", "ironman", "thanos", "homemAranha",
    "nakia", "janeFoster", "Valquiria", "hulk", "erik", "pantera", "viuva", "ironman", "thanos",
    "homemAranha", "nakia", "janeFoster", "Valquiria",
];
var imagem = class {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;
    }
}
var selecao1 = null;
var pontos = 0;
var cliques = 0;
var paresEncontrados = new Array();
var jogador = null;
var ranking = class {
    constructor(nome, pontos) {
        this.nome = nome;
        this.pontos = pontos;
    }
}
var rankings = new Array();
var lbAbrir = true;
//#endregion 


function OnLoad() {
    if (document.getElementById("jogoMemoria") == null)
        return
    imagens.sort(function() { return 0.5 - Math.random() });
    jogador = prompt("Diga seu nome", "");
    for (var i = 0; i < 20; i++) {
        PosicionarImagens(imagens[i], i)
    }
}

function PosicionarImagens(posicao, i) {
    if (jogoMemoria == null || posicao == null || i == null)
        return
    document.getElementById("jogoMemoria").innerHTML += '<div class="membros">' +
        '<a onclick="ClicouImagem(' + i + ')"><img src="res/' + imagens[i] + '.jpg" id="' + i + '"></a> </div>';
}

function ClicouImagem(numero) {
    if (validarClique(numero) == false) return;
    if (selecao1 == null) {
        selecao1 = new imagem(imagens[numero], numero)
        exibirImagem(numero);
    } else {
        if (numero == selecao1.id) return;
        contabilizarClique();
        exibirImagem(numero);
        verificarSimilaridade(numero);
    }
}

function verificarSimilaridade(numero) {
    if (imagens[numero] == selecao1.nome && numero != selecao1.id) {
        contabilizarPonto();
        document.getElementById("mensagemErro").innerHTML = "As cartas são iguais.";
        zerarSelecao();
        if (paresEncontrados.length < 9)
            paresEncontrados.push(imagens[numero]);
        else
            contabilizaVencedor();
    } else if (numero != selecao1.id) {
        bloqueiaClickTemporariamente();
        setTimeout(function() { voltarCartas(selecao1.id, numero) }, 1000)
        document.getElementById("mensagemErro").innerHTML = "As cartas não são iguais.";
    }
}

function zerarSelecao() {
    selecao1 = null;
}

function contabilizarPonto() {
    pontos = pontos + 1;
    document.getElementById("pontuacao").innerHTML = pontos;

}

function contabilizarClique() {
    cliques = cliques + 1;
    document.getElementById("cliques").innerHTML = cliques.toString();
}

function voltarCartas(id, numero) {
    var imgSelecionada1Element = document.getElementById(numero);
    imgSelecionada1Element.style.opacity = 0;
    var imgSelecionada2Element = document.getElementById(id);
    imgSelecionada2Element.style.opacity = 0;
    zerarSelecao();
    desbloquearClick();
}

function validarClique(numero) {
    if (paresEncontrados == null || paresEncontrados.length == 0) return true;
    if (paresEncontrados.includes(imagens[numero])) {
        document.getElementById("mensagemErro").innerHTML = "Imagem já encontrada";
        return false;
    } else {

    }
}


function exibirImagem(numero) {
    var imgSelecionadaElement = document.getElementById(numero);
    imgSelecionadaElement.style.opacity = 1;
}
//para evitar 0 no teste de stress, devia ganhar ponto extra;
function bloqueiaClickTemporariamente() {
    var membros = document.getElementsByClassName("membros");
    for (var i = 0; i < membros.length; i++) {
        membros[i].getElementsByTagName("a")[0].style.pointerEvents = "none";
    }
}

function desbloquearClick() {
    var membros = document.getElementsByClassName("membros");
    for (var i = 0; i < membros.length; i++) {
        membros[i].getElementsByTagName("a")[0].style.pointerEvents = "auto";
    }
}

function contabilizaVencedor() {
    // if (document.cookie) {
    //     var _cookies = document.cookie.split(";");
    //     //rankings = JSON.parse(_cookies[1]);
    // }
    rankings.push(new ranking(jogador, pontos / cliques * 100));
    rankings.sort(function(a, b) {
        if (a.pontos > b.pontos) {
            return 1
        }
    })
    document.cookie = "rankings = " + JSON.stringify(rankings) + "; expires=" + new Date(2020, 01);
    var continuar = confirm("Sua taxa foi " + pontos / cliques * 100 + "%. Deseja jogar novamente?")
    if (continuar)
        location.reload(true);
}

function abrirRanking() {
    if (lbAbrir) {
        for (var i = 0; i < rankings.length; i++) {
            document.getElementById("ranking").innerHTML += rankings[i].nome + " - " + rankings[i].pontos;
        }

        document.getElementById("ranking").style.display = "block";
        lbAbrir = false;
    } else {
        document.getElementById("ranking").innerHTML = "";
        document.getElementById("ranking").style.display = "none";
        lbAbrir = true;
    }

}
