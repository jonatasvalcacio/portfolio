// Gera o PDF do currículo a partir de curriculo.html (links continuam clicáveis).
// Uso: node curriculo/gerar-pdf.js [saida.pdf]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || path.join(__dirname, 'Curriculo_Jonatas_Valcacio_2026.pdf');
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'curriculo.html'), { waitUntil: 'load' });
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const overflow = await p.evaluate(() => document.querySelector('.page').scrollHeight - document.querySelector('.page').clientHeight);
  console.log(out, 'overflow px:', overflow);
  await b.close();
})();
