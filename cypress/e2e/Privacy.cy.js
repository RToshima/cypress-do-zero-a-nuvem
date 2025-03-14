describe('Testa a página de Política de Privacidade de forma independente', () => {
    beforeEach(() => {
      cy.visit('./src/privacy.html'); // Acessa diretamente a página de Política de Privacidade
    });
  
    it('verifica se a página de Política de Privacidade contém um título esperado', () => {
      cy.contains('Política de Privacidade').should('be.visible'); // Verifica se o título está visível
    });
  
    it('verifica se a página não contém elementos do formulário de contato', () => {
      cy.get('#firstName').should('not.exist'); // Exemplo para verificar que um campo do formulário não está presente
    });
  });
  