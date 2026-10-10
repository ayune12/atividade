const ROTA = '/login';
const TEXTO_ERRO = 'Your username is invalid!';

describe('Tela de login | feedback para credenciais vazias', () => {
  beforeEach(() => {
    cy.visit(ROTA);
  });

  it('exibe o balão vermelho com a mensagem correta', () => {
    // campos começam vazios e permanecem assim
    cy.get('input#username').should('have.value', '');
    cy.get('input#password').should('have.value', '');

    cy.get('button[type="submit"]').click();

    cy.get('div#flash').as('balao');

    // 1) conteúdo da mensagem
    cy.get('@balao').invoke('text').should('include', TEXTO_ERRO);

    // 2) estilo de erro aplicado (classe que pinta de vermelho)
    cy.get('@balao').should('have.class', 'error');
  });
});
