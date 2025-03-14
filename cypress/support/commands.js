import 'cypress-file-upload';

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (dados = {}) => {
    cy.get('#firstName').type(dados.firstName || 'Ricardo');
    cy.get('#lastName').type(dados.lastName || 'Toshima');
    cy.get('#email').type(dados.email || 'toshima.san@gmail.com');
    cy.get('#open-text-area').type(dados.mensagem || 'Teste de envio do formulário.');
    cy.get('.button').click();
  });
  
  

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
