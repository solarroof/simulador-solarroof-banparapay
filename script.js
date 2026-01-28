function calcular() {

  const VALOR_BASE = 26500;

  // 📊 Tabela fixa de CET
  const tabelaCET = {
    8: 9.40,
    9: 10.00,
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

  const semJuros = Number(document.getElementById("semJuros").value);
  const parcelas = Number(document.getElementById("parcelas").value);
  const resultado = document.getElementById("resultado");

  if (!semJuros || !parcelas) {
    resultado.innerHTML = "⚠️ Selecione todas as opções.";
    return;
  }

  if (parcelas < semJuros) {
    resultado.innerHTML = "⚠️ As parcelas escolhidas não podem ser menores que o limite sem juros.";
    return;
  }

  const cetBase = tabelaCET[semJuros];
  const cetEscolhido = tabelaCET[parcelas];

  const diferencaCET = cetEscolhido - cetBase;
  const acrescimo = (diferencaCET * VALOR_BASE) / 100;
  const valorCartao = VALOR_BASE + acrescimo;
  const valorParcela = valorCartao / parcelas;

  resultado.innerHTML = `
    <strong>Resumo da Simulação</strong><br><br>

    Valor base: R$ ${VALOR_BASE.toLocaleString('pt-BR', {minimumFractionDigits:2})}<br>
    Sem juros até: ${semJuros}x (CET ${cetBase}%)<br>
    Parcelamento escolhido: ${parcelas}x (CET ${cetEscolhido}%)<br><br>

    Acréscimo ao cliente:
    <strong>R$ ${acrescimo.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong><br>

    Valor total no cartão:
    <strong>R$ ${valorCartao.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong><br>

    Valor da parcela:
    <strong>${parcelas}x de R$ ${valorParcela.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong>
  `;
}
