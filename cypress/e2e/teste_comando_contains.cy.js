describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/index.html'); // Endereço da aplicação
    });
  
    it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); 
  
      cy.get('#firstName')
        .type('Ricardo')
        .should('have.value', 'Ricardo');
  
      cy.get('#lastName')
        .type('Toshima')
        .should('have.value', 'Toshima');
  
      cy.get('#email')
        .type('toshima.san@gmail.com')
        .should('have.value', 'toshima.san@gmail.com');
  
      cy.get('#phone')
        .type('11994114321')
        .should('have.value', '11994114321');
  
      cy.get('#product')
        .should('be.visible')
        .select('Cursos')
        .should('have.value', 'cursos');
  
      cy.get('input[name="atendimento-tat"]')
        .should('be.visible')
        .check('ajuda')
        .should('have.value', 'ajuda');
  
      cy.get('#email-checkbox')
        .should('be.visible')
        .check()
        .should('be.checked');
  
      cy.get('#open-text-area')
        .type('Teste de digitação.')
        .should('have.value', 'Teste de digitação.');
  
      cy.get('#file-upload')
        .attachFile('Teste.txt')
        .then(($input) => {
          expect($input[0].files[0].name).to.equal('Teste.txt');
        });
  
      cy.contains('button', 'Enviar').click(); // Alterado para cy.contains()
  
      cy.get('.success')
        .should('be.visible')
        .contains('Mensagem enviada com sucesso.');
    });
  });
  