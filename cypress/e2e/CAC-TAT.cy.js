describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html'); // Acessa a aplicação antes de cada teste
  });

  it('preenche os campos obrigatórios, anexa um arquivo e envia o formulário', () => {
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
     
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]') // Seleciona o link correto
      .should('have.attr', 'target', '_blank'); // Verifica se ele abre em outra aba
    
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target') // Remove o atributo target para abrir na mesma aba
      .click(); // Agora clica no link
  
    // Verifica se a URL mudou corretamente
    cy.url().should('include', 'privacy.html');
  });

});
