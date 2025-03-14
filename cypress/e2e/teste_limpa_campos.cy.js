describe('Central de Atendimento ao Cliente TAT', () => {
  
    beforeEach(() => {
      cy.visit('./src/index.html'); // Garante que a página seja carregada antes de cada teste
    });
  
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName')
        .type('Ricardo')
        .should('have.value', 'Ricardo')
        .clear()
        .should('have.value', '');
  
      cy.get('#lastName')
        .type('Toshima')
        .should('have.value', 'Toshima')
        .clear()
        .should('have.value', '');
  
      cy.get('#email')
        .type('toshima.san@gmail.com')
        .should('have.value', 'toshima.san@gmail.com')
        .clear()
        .should('have.value', '');
  
      cy.get('#phone')
        .type('11994114321')
        .should('have.value', '11994114321')
        .clear()
        .should('have.value', '');
    });
  
  });
  