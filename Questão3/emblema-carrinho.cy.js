const USUARIO = 'standard_user';
const SENHA = 'secret_sauce';

const produtos = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
];

function entrarNaLoja() {
  cy.visit('/');
  cy.get('[data-test="username"]').type(USUARIO);
  cy.get('[data-test="password"]').type(SENHA);
  cy.get('[data-test="login-button"]').click();
  cy.location('pathname').should('eq', '/inventory.html');
}

const emblema = () => cy.get('.shopping_cart_badge');

describe('Carrinho | atualização do emblema em tempo real', () => {
  it('termina com 2 itens após adicionar 3 e remover 1', () => {
    entrarNaLoja();

    produtos.forEach((slug) => {
      cy.get(`[data-test="add-to-cart-${slug}"]`).click();
    });
    emblema().should('have.text', '3');

    // remove o segundo produto da lista
    cy.get(`[data-test="remove-${produtos[1]}"]`).click();

    emblema().should('be.visible').and('have.text', '2');
  });
});
