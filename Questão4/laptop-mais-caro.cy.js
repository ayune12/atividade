function lerCatalogo(cards) {
  return Array.from(cards).map((card) => ({
    nome: card.querySelector('.card-title a').textContent.trim(),
    valor: Number(card.querySelector('h5').textContent.replace(/[^0-9.]/g, '')),
  }));
}

describe('Demoblaze | pesquisa de preços em Laptops', () => {
  it('identifica o laptop mais caro e confirma valor maior que $0', () => {
    cy.intercept('POST', '**/bycat').as('carregaCategoria');

    cy.visit('/');
    cy.contains('a#itemc', 'Laptops').click();
    cy.wait('@carregaCategoria');

    cy.get('#tbodyid .card').should('have.length.greaterThan', 0);

    cy.get('#tbodyid .card').then((cards) => {
      const catalogo = lerCatalogo(cards);
      const [maisCaro] = [...catalogo].sort((a, b) => b.valor - a.valor);

      const resumo = `Laptop mais caro: ${maisCaro.nome} - $${maisCaro.valor}`;
      cy.log(resumo);
      cy.task('imprimir', resumo);

      expect(maisCaro.valor, 'valor do laptop mais caro').to.be.greaterThan(0);
    });
  });
});
