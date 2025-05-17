const tempoInicio = Date.now(); // Inicia o tempo ao carregar a página
let tempoFim = null; // Variável para armazenar o tempo final
let tempoCalculado = false; // Verifica se o tempo já foi calculado

function finalizarRespostas() {
    // Impede múltiplos cliques desabilitando o botão
    const botao = document.querySelector('.botao_imagem');
    botao.disabled = true;

    let acertos = 0;
    let erros = 0;

    // Lógica de avaliação dos inputs
    for (let i = 1; i <= 28; i++) {
        const letra = document.getElementById(`letra_registro_${i}`).textContent.trim();
        const resposta = document.getElementById(`input_registro_${i}`).value.trim();
        const resultado = document.getElementById(`resultado_${i}`);

        if (resposta.toUpperCase() === letra.toUpperCase()) {
            acertos++;
            resultado.textContent = '✔️ Correto';
            resultado.style.color = 'green';
        } else {
            erros++;
            resultado.textContent = `❌ Errado (esperado: ${letra})`;
            resultado.style.color = 'red';
        }

        document.getElementById(`input_registro_${i}`).disabled = true;
    }

    // Criação ou atualização do campo de resultados
    let resultadoFinal = document.getElementById('resultado_final');
    if (!resultadoFinal) {
        resultadoFinal = document.createElement('div');
        resultadoFinal.id = 'resultado_final';
        resultadoFinal.style.marginTop = '20px';
        document.querySelector('.container').appendChild(resultadoFinal);
    }

    let textoResultado = `<strong>Acertos:</strong> ${acertos} | <strong>Erros:</strong> ${erros}`;

    // Calcular o tempo só se todos os acertos forem corretos e só uma vez
    if (acertos === 28 && !tempoCalculado) {
        tempoFim = Date.now();
        const tempoTotalSegundos = Math.floor((tempoFim - tempoInicio) / 1000);
        textoResultado += ` | <strong>Tempo:</strong> ${tempoTotalSegundos}s`;

        document.getElementById('correto_registro').style.display = 'block';
        tempoCalculado = true; // Impede que o tempo seja recalculado
    }

    // Exibe os resultados
    resultadoFinal.innerHTML = textoResultado;
}

function reiniciar() {
    // Habilita o botão para ser clicado novamente
    const botao = document.querySelector('.botao_imagem');
    botao.disabled = false;

    // Limpa os resultados (acertos e erros)
    for (let i = 1; i <= 28; i++) {
        const resultado = document.getElementById(`resultado_${i}`);
        resultado.textContent = ''; // Limpa os textos de "correto" ou "errado"
        resultado.style.color = ''; // Limpa o estilo de cor

        // Limpa os inputs e habilita novamente
        const input = document.getElementById(`input_registro_${i}`);
        input.value = ''; // Limpa o valor do input
        input.disabled = false; // Habilita os inputs para nova tentativa
    }

    // Limpa o campo de resultado final
    const resultadoFinal = document.getElementById('resultado_final');
    if (resultadoFinal) {
        resultadoFinal.innerHTML = ''; // Limpa o texto do resultado final
    }

    // Oculta o link "Próxima Fase" (caso tenha sido exibido)
    document.getElementById('correto_registro').style.display = 'none';

    // Reseta o tempo calculado para permitir recalcular se necessário
    tempoCalculado = false;
    tempoFim = null;
}

function clicarparabens() {
    const visivel = document.getElementById("correto_registro");
    const invisivel = visivel.style.display

    if (invisivel === "none") {
        visivel.style.display = "block";
    } else {
        visivel.style.display = "none";
    }
}