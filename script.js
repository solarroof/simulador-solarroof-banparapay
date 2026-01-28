const taxasJuros = {
    master_visa: {
        1: 3.14, 2: 3.99, 3: 4.74, 4: 5.51, 5: 6.27, 6: 7.05, 7: 8.20, 8: 8.99, 9: 9.79, 10: 10.57, 11: 11.37, 12: 12.18, 13: 13.26, 14: 14.07, 15: 14.89, 16: 15.72, 17: 16.56, 18: 17.40, 19: 18.25, 20: 19.10, 21: 19.96
    },
    elo_hiper_amex: {
        1: 3.24, 2: 4.18, 3: 4.96, 4: 5.70, 5: 6.47, 6: 7.24, 7: 8.49, 8: 9.27, 9: 10.05, 10: 10.84, 11: 11.64, 12: 12.45, 13: 13.69, 14: 14.50, 15: 15.32, 16: 16.15, 17: 16.98, 18: 17.81, 19: 18.66, 20: 19.51, 21: 20.36
    }
};

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function calcularValorDisponivel(event) {
    event.preventDefault();

    const valorCobrancaInput = document.getElementById("valor_cobranca");
    let valorCobranca = parseFloat(valorCobrancaInput.value);

    if (isNaN(valorCobranca) || valorCobranca <= 0) {
        alert("Insira um valor válido");
        return;
    }

    valorCobranca = Math.round(valorCobranca * 100) / 100;
    valorCobrancaInput.value = valorCobranca.toFixed(2);

    const quantidadeParcelas = parseInt(document.getElementById("quantidade_parcelas").value);
    const bandeira = document.getElementById("bandeira_cobranca").value;
    const taxaJuros = taxasJuros[bandeira][quantidadeParcelas];

    const valorDebitado = (valorCobranca * taxaJuros / 100);
    const valorDisponivel = valorCobranca - valorDebitado;
    const parcela = valorCobranca / quantidadeParcelas;

    document.getElementById("valor_em_conta").textContent = formatarMoeda(valorDisponivel);
    document.getElementById("valor_retido_cobranca").textContent = formatarMoeda(valorDebitado);
    document.getElementById("valor_parcela_cobranca").textContent = formatarMoeda(parcela);

    document.getElementById("resultado_cobranca").classList.add("active");
}

function calcularValorACobrar(event) {
    event.preventDefault();

    const valorLiquidoInput = document.getElementById("valor_liquido");
    let valorLiquido = parseFloat(valorLiquidoInput.value);

    if (isNaN(valorLiquido) || valorLiquido <= 0) {
        alert("Insira um valor válido");
        return;
    }

    valorLiquido = Math.round(valorLiquido * 100) / 100;
    valorLiquidoInput.value = valorLiquido.toFixed(2);

    const quantidadeParcelas = parseInt(document.getElementById("quantidade_parcelas_liquido").value);
    const bandeira = document.getElementById("bandeira_liquido").value;
    const taxaJuros = taxasJuros[bandeira][quantidadeParcelas];

    let valorACobrar = valorLiquido / (1 - (taxaJuros / 100));
    valorACobrar = Math.ceil(valorACobrar);
    const valorDebitado = valorACobrar - valorLiquido;
    const parcela = valorACobrar / quantidadeParcelas;

    document.getElementById("valor_a_cobrar").textContent = formatarMoeda(valorACobrar);
    document.getElementById("valor_retido_liquido").textContent = formatarMoeda(valorDebitado);
    document.getElementById("valor_parcela_liquido").textContent = formatarMoeda(parcela);

    document.getElementById("resultado_liquido").classList.add("active");
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formCobranca').addEventListener('submit', calcularValorDisponivel);
    document.getElementById('formLiquido').addEventListener('submit', calcularValorACobrar);
    
    // Prevenir comportamento padrão de toque
    document.addEventListener('touchmove', function() {}, { passive: true });
});