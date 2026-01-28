function calcular() {

  const valorProduto = Number(document.getElementById("valorProduto").value);
  const semJuros = Number(document.getElementById("semJuros").value);
  const parcelas = Number(document.getElementById("parcelas").value);
  const resultado = document.getElementById("resultado");

  const CET = {
    1: 3.14,
    2: 3.99,
    3: 4.74,
    4: 5.51,
    5: 6.27,
    6: 7.05,
    7: 8.20,
    8: 8.99,
    9: 9.79,
    10: 10.57,
    11: 11.37,
    12: 12.18,
    13: 13.26,
    14: 14.07,
    15: 14.89,
    16: 15.72,
    17: 16.56,
    18: 17.40,
    19: 18.25,
    20: 19.10,
    21: 19.96
  };

  if (!valorProduto || !semJuros || !parcelas) {
    resultado.innerHTML = "⚠️ Preencha todos os campos.";
    return;
  }

  if (parcelas < semJuros) {
    resultado.innerHTML = "⚠️ Parcelas do cliente não podem ser menores que o limite sem juros.";
    return;
  }

  const cetBase = CET[semJuros];
  const cetEscolhido = CET[parcelas];

  const diferenca = cetEscolhido - cetBase;
  const acrescimo = (diferenca * valorProduto) / 100;
  const valorCartao = valorProduto + acrescimo;
  const valorParcela = valorCartao / parcelas;

  resultado.innerHTML = `
    <strong>Resumo da Simulação</strong><br><br>

    Valor do produto:
    R$ ${valorProduto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br>

    Sem juros até:
    ${semJuros}x (CET ${cetBase}%)<br>

    Parcelamento escolhido:
    ${parcelas}x (CET ${cetEscolhido}%)<br><br>

    Acréscimo ao cliente:
    <strong>R$ ${acrescimo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong><br>

    Valor total no cartão:
    <strong>R$ ${valorCartao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong><br>

    Valor da parcela:
    <strong>${parcelas}x de R$ ${valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
  `;
}
