describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html'); // Acessa a aplicação antes de cada teste
  });

  it('preenche os campos obrigatórios, anexa um arquivo e envia o formulário', () => {
    cy.clock(); // Congela o relógio do navegador

    cy.get('#firstName').type('Ricardo');
    cy.get('#lastName').type('Toshima');
    cy.get('#email').type('toshima.san@gmail.com');
    cy.get('#phone').type('11999999999');
    cy.get('#product').select('Cursos');
    cy.get('input[name="atendimento-tat"]').check('ajuda');
    cy.get('input[type="checkbox"]').check();
    cy.get('#open-text-area').type('Ótima experiência! Recomendo.', { delay: 5 });

    // Anexa o arquivo
    cy.fixture('Teste.txt').then((fileContent) => {
      cy.get('#file-upload').attachFile({
        fileContent,
        fileName: 'Teste.txt',
        mimeType: 'text/plain',
      });

      // Valida se o arquivo foi anexado
      cy.get('#file-upload').then(($input) => {
        expect($input[0].files[0].name).to.equal('Teste.txt');
      });
    });

    // Clicando no botão de envio
    cy.get('button[type="submit"]').click();

    // Verifica a mensagem de sucesso
    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.');

    cy.tick(3000); // Simula a passagem de 3 segundos

    // Verifica que a mensagem desapareceu após 3 segundos
    cy.get('.success').should('not.exist');
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank'); 
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click();
  
    cy.url().should('include', 'privacy.html');
  });

});
