const listaTopicos = document.getElementById("listaTopicos");
const totalTopicos = document.getElementById("total-topicos");

let topicos = JSON.parse(localStorage.getItem("topicos")) || [];

/* Corrige tópicos antigos que não têm respostas */
topicos = topicos.map(t => {
    if (!t.respostas) {
        t.respostas = [];
    }
    return t;
});

function salvar() {
    localStorage.setItem("topicos", JSON.stringify(topicos));
}

function renderizarTopicos() {
    listaTopicos.innerHTML = "";

    if (topicos.length === 0) {
        listaTopicos.innerHTML =
            '<p class="mensagem-vazia">Nenhum tópico criado</p>';
        totalTopicos.textContent = 0;
        return;
    }

    topicos.forEach((topico, index) => {
        const div = document.createElement("div");
        div.className = "topico";

        let respostasHtml = "";

        if (topico.respostas.length === 0) {
            respostasHtml = "<p class='mensagem-vazia'>Nenhuma resposta</p>";
        } else {
            respostasHtml = topico.respostas
                .map(r => `<div class="resposta">💬 ${r}</div>`)
                .join("");
        }

        div.innerHTML = `
            <h4>${topico.titulo}</h4>
            <p>${topico.conteudo}</p>

            <div class="respostas">
                ${respostasHtml}
            </div>

            <input type="text"
                   placeholder="Responder..."
                   onkeydown="if(event.key==='Enter') responder(${index}, this)">
        `;

        listaTopicos.appendChild(div);
    });

    totalTopicos.textContent = topicos.length;
}

function adicionarTopico() {
    const titulo = document.getElementById("tituloTopico").value.trim();
    const conteudo = document.getElementById("conteudoTopico").value.trim();

    if (titulo === "" || conteudo === "") return;

    topicos.push({
        titulo,
        conteudo,
        respostas: []
    });

    document.getElementById("tituloTopico").value = "";
    document.getElementById("conteudoTopico").value = "";

    salvar();
    renderizarTopicos();
}

function responder(index, input) {
    const texto = input.value.trim();
    if (texto === "") return;

    topicos[index].respostas.push(texto);
    input.value = "";

    salvar();
    renderizarTopicos();
}

renderizarTopicos();
