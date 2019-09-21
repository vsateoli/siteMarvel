var imagens = [
    "hulk",
    "erik",
    "pantera",
    "viuva",
    "ironman",
    "thanos",
    "homemAranha",
    "nakia",
    "janeFoster",
    "valquiria",
    "hulk",
    "erik",
    "pantera",
    "viuva",
    "ironman",
    "thanos",
    "homemAranha",
    "nakia",
    "janeFoster",
    "valquiria",
];
var selecao1, selecao2 = null;

function OnLoad() {
    if (document.getElementById("jogoMemoria") == null)
        return
    imagens.sort(function(a, b) { return 0.5 - Math.random() });
    for (var i = 0; i < 20; i++) {
        PosicionarImagens(imagens[i], i)
    }
}

function PosicionarImagens(posicao, i) {
    if (jogoMemoria == null || posicao == null || i == null)
        return
    document.getElementById("jogoMemoria").innerHTML += '<div class="membros ' + i + '"><img src="res/' + imagens[i] + '.jpg"> </div>';
}