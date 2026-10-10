const LIMITE = 20.0;

const extrairProdutos = (itens) =>
  Array.from(itens).map((item) => ({
    nome: item.querySelector('.inventory_item_name').textContent.trim(),
    preco: parseFloat(
      item.querySelector('.inventory_item_price').textContent.replace('$', '')
    ),
  }));

describe('SauceDemo | caça às ofertas', () => {
  it('lista e salva apenas os produtos abaixo de $20.00', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.location('pathname').should('eq', '/inventory.html');

    cy.get('.inventory_item')
      .should('have.length.greaterThan', 0)
      .then((itens) => {
        const todos = extrairProdutos(itens);
        const ofertas = todos.filter(({ preco }) => preco < LIMITE);

        const texto = ofertas
          .map(({ nome, preco }) => `- ${nome}: $${preco.toFixed(2)}`)
          .join('\n');

        cy.task('imprimir', `Total de produtos na vitrine: ${todos.length}`);
        cy.task('imprimir', `Ofertas abaixo de $20.00:\n${texto}`);

        cy.writeFile('cypress/results/ofertas.json', ofertas);

        expect(ofertas.length, 'ofertas encontradas').to.be.greaterThan(0);
        ofertas.forEach(({ preco }) => expect(preco).to.be.lessThan(LIMITE));
      });
  });
});
