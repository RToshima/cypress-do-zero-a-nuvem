describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/index.html'); // Acessa a aplicação antes de cada teste
    });
  
    it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); 
    });
  
    it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('#firstName').type('Ricardo');
      cy.get('#lastName').type('Toshima');
      cy.get('#email').type('toshima.san@gmail.com');
      cy.get('#open-text-area').type('Ótima experiência! Recomendo este atendimento.', { delay: 0 });
      cy.get('.button').click();
      cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.');
    });
  
    it('exibe mensagem de erro ao submeter o formulário com um email inválido', () => {
      cy.get('#firstName').type('Ricardo');
      cy.get('#lastName').type('Toshima');
      
      // E-mail com formatação inválida
      cy.get('#email').type('toshima.san@gmail');
  
      cy.get('#open-text-area').type('Mensagem de teste.');
      cy.get('.button').click();
  
      // Verifica se a mensagem de erro é exibida
    cy.contains('.error', 'Valide os campos obrigatórios!')
        .should('be.visible');
    });

    it('exibe campo de telefone vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone')
          .type('abcdefg') // Inserindo um texto não numérico
          .should('have.value', ''); // O campo deve continuar vazio
      });

  });
  