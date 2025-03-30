describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html'); // Acessa a aplicação antes de cada teste
  });

  it('encontra o gato escondido e o exibe', () => {
    cy.get('#cat')
      .should('not.be.visible')  // Confirma que o gato está escondido
      .invoke('show')            // Força a exibição
      .should('be.visible');     // Agora verifica se ele está visível
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

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer');
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        expect(response.status).to.eq(200); // Verifica se o status é 200
        expect(response.statusText).to.eq('OK'); // Verifica se o statusText é 'OK'
        expect(response.body).to.include('CAC TAT'); // Verifica se o body contém a string 'CAC TAT'
      });
  });

  // Novo teste com invoke() para exibir e ocultar mensagens
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')  // Verifica que a mensagem de sucesso não está visível
      .invoke('show')            // Força a exibição da mensagem
      .should('be.visible')      // Verifica que agora está visível
      .and('contain', 'Mensagem enviada com sucesso.') // Confirma o texto correto
      .invoke('hide')            // Oculta a mensagem novamente
      .should('not.be.visible'); // Verifica que não está mais visível

    cy.get('.error')
      .should('not.be.visible')  // Verifica que a mensagem de erro não está visível
      .invoke('show')            // Força a exibição da mensagem
      .should('be.visible')      // Verifica que agora está visível
      .and('contain', 'Valide os campos obrigatórios!') // Confirma o texto correto
      .invoke('hide')            // Oculta a mensagem novamente
      .should('not.be.visible'); // Verifica que não está mais visível
  });

});
