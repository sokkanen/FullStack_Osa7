describe('Blog login', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testaaja',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('front page can be opened', function() {
    cy.contains('BlogApp')
  })

  it('login form can be opened', function() {
    cy.contains('login')
      .click()
  })

  it('user can login', function() {
    cy.contains('login')
      .click()
    cy.get('input:first')
      .type('cypress')
    cy.get('input:last')
      .type('cypress')
    cy.contains('kirjaudu')
      .click()
    cy.contains('cypress logged in')
  })
})

describe('BlogApp main functions', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testaaja',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.contains('login')
      .click()
    cy.get('input:first')
      .type('cypress')
    cy.get('input:last')
      .type('cypress')
    cy.contains('kirjaudu')
      .click()
  })

  it('userpage can be accessed', function() {
    cy.contains('Users')
      .click()
  })

  it('logout works', function() {
    cy.contains('logout')
      .click()
    cy.contains('cypress logged out')
  })

  it('new blog can be created', function() {
    cy.get('#title')
      .type('Cypress')
    cy.get('#author')
      .type('Cypress')
    cy.get('#url')
      .type('https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell')
    cy.contains('Create')
      .click()
    cy.contains('Cypress by Cypress')
  })
})