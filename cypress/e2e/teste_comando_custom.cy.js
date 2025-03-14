describe('Central de Atendimento ao Cliente TAT', () => {
  
    beforeEach(() => {
      cy.visit('./src/index.html'); // Garante que a página seja carregada antes de cada teste
    });
  
    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit(); // Chamando o comando customizado
      
      cy.get('.success') // Verifica se a mensagem de sucesso apareceu
        .should('be.visible')
        .contains('Mensagem enviada com sucesso.');
    });
  
  });
  