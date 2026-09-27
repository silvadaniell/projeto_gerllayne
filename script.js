// Sem JavaScript ou com movimento reduzido, o texto já aparece completo.
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!movimentoReduzido.matches) {
  document.querySelectorAll('[data-escrever]').forEach((paragrafo) => {
    const texto = paragrafo.textContent;
    const caracteres = Array.from(texto);
    const acessivel = document.createElement('span');
    acessivel.className = 'somente-leitor';
    acessivel.textContent = texto;

    const animado = document.createElement('span');
    animado.setAttribute('aria-hidden', 'true');
    const escrito = document.createTextNode('');
    const restante = document.createElement('span');
    restante.style.visibility = 'hidden';
    restante.textContent = texto;
    animado.append(escrito, restante);
    paragrafo.replaceChildren(acessivel, animado);

    const inicio = performance.now() + 450;
    const intervalo = window.setInterval(() => {
      const quantidade = Math.min(caracteres.length,
        Math.max(0, Math.floor((performance.now() - inicio) / 35)));

      if (quantidade === caracteres.length || movimentoReduzido.matches) {
        window.clearInterval(intervalo);
        // Remove toda a estrutura temporária: nenhuma letra pode ficar oculta.
        paragrafo.textContent = texto;
        return;
      }

      escrito.textContent = caracteres.slice(0, quantidade).join('');
      restante.textContent = caracteres.slice(quantidade).join('');
    }, 35);
  });
}
