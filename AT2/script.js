const perguntas = [
    {
        pergunta: "Quem descobriu o Brasil?",
        respostas: [
            {id: 1, text: "Indígenas", correto: false},
            {id: 2, text: "Portugueses", correto: true},
        ],
        explicacao: "Alternativa 1:" + "\n" + "Oficialmente o descobrimento foi dado pelo explorador Pedro Alves Cabral por volta de 1500, devido a suas afirmações que dizia não ter sido colonizada até sua chegada." + "\n" + 
        "\n" + "Alternativa 2:" + "\n" +
        "O mérito do descobrimento foi dado aos portugueses, mais muitos pesquisados apontam que sua colonização foi dada os índios por estarem ocupando a terra antes da chegada dos portugueses."
    },
    {
        pergunta: "Qual era o objetivo do escambo dos portugueses com os índigenas no Brasil?",
        respostas: [
            {id: 1, text: "Explorar as tribos indígenas", correto: true},
            {id: 2, text: "Melhorar a convivência com os povos nativos", correto: false},
        ],
        explicacao: "Alternativa 1:" + "\n" + "Trocas feitas pelos portugueses eram troca de barganha, onde os portugueses exploravam o conhecimento dos indígenas da região para a localização do pau-Brasil, trocas essas não eram justas." + "\n" + 
        "\n" + "Alternativa 2:" + "\n" +
        "Os portugueses tinham o objetivo de tornarem submissos aos rei de Portugal mudar suas crenças e suas culturas."
    },
    {
        pergunta: "Qual foi o primeiro nome que deram ao território brasileiro?",
        respostas: [
            {id: 1, text: "Pindorama", correto: true},
            {id: 2, text: "Ilha de Vera Cruz", correto: false},
        ],
        explicacao: "Alternativa 1:" + "\n" + "Os Tupis, que foram os primeiros a entrar contato com os portugueses, já tinham nomeado o território de 'Pindorama'." + "\n" + "Em Tupi a frase significa 'Terra das Palmeiras'." + "\n" + 
        "\n" + "Alternativa 2:" + "\n" +
        "No escrivão da expedição que Pero Vaz de Caminha enviou a Portugal, o nome que vinha sendo usado oralmente, 'Terra de Vera Cruz', foi alterado e oficializado como 'Ilha de Vera Cruz'." + "\n" + "A palavra 'ilha' foi usada porque os recém chegadas não sabiam ainda que o território pertencia à parte da América."
    },
];

const questaoElemento = document.querySelector("#questao");
const opcaoResposta = document.querySelector("#respostas");
const botaoNext = document.querySelector("#next-btn");
const botaoExplica = document.querySelector("#explica");

const janela = document.querySelector("#janela");
const modalExplicacao = document.querySelector("#modal");
const textoExplicacao = document.querySelector("#texto-explicacao");
const fecharModal = document.querySelector("#fechar-modal");

const rodape = document.querySelector(".rodape");

let questaoAtual = 0;
let acertos = 0;

function startQuiz(){
    questaoAtual = 0;
    acertos = 0;
    botaoNext.innerHTML = "Próxima";
    mostrarQuestao();
}

function atualizar(){
    botaoNext.style.display = "none";
    botaoExplica.style.display = "none";
    while (opcaoResposta.firstChild){
        opcaoResposta.removeChild(opcaoResposta.firstChild);
    }
}

function mostrarQuestao(){
    atualizar();
    let questaoA = perguntas[questaoAtual];
    let nQuestao = questaoAtual + 1;
    questaoElemento.innerHTML = nQuestao + ". " + questaoA.pergunta;

    questaoA.respostas.forEach((resposta) => {
        const button = document.createElement("button");
        button.innerHTML = resposta.text;
        button.dataset.id = resposta.id;
        button.classList.add("btn");
        button.addEventListener("click", selecionar);
        opcaoResposta.appendChild(button);
    })
}

function selecionar(e){
    respostas = perguntas[questaoAtual].respostas;
    const respostaCerta = respostas.filter((resposta) => resposta.correto == true)[0];

    const respostaEscolhida = e.target;
    const correto = respostaEscolhida.dataset.id == respostaCerta.id;
    if(correto){
        respostaEscolhida.classList.add("correto");
        acertos++;
    }else{
        respostaEscolhida.classList.add("errado");
    }
    Array.from(opcaoResposta.children).forEach((button) => {
        button.disabled = true;
    });

    botaoNext.style.display = "block";
    botaoExplica.style.display = "block";
}

function mostrarAcertos(){
    atualizar();
    questaoElemento.innerHTML = `Você acertou ${acertos} de ${perguntas.length}!`;
    botaoNext.innerHTML = "Jogue novamente";
    botaoNext.style.display = "block";
}

function proximaPergunta(){
    questaoAtual++;
    if(questaoAtual < perguntas.length){
        mostrarQuestao();
    }else{
        mostrarAcertos();
    }
}

botaoNext.addEventListener("click", () => {
    if(questaoAtual < perguntas.length){
        proximaPergunta();
    }else{
        startQuiz();
    }
})

botaoExplica.addEventListener("click", () => {
    const explicacao = perguntas[questaoAtual].explicacao;
    textoExplicacao.innerText = explicacao;
    janela.style.display = "block";
    modalExplicacao.style.display = "block";
    rodape.style.display = "none";
});

fecharModal.addEventListener("click", () => {
    janela.style.display = "none";
    modalExplicacao.style.display = "none";
    rodape.style.display = "block";
});

janela.addEventListener("click", () => {
    janela.style.display = "none";
    modalExplicacao.style.display = "none";
});

startQuiz();