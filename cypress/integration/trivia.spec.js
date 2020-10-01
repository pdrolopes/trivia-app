/// <reference types="cypress" />

context('Score spec', () => {
  it('Should have high score when clicking all correct options', () => {
    cy.visit('');
    cy.get('button').first().click(); // select first quiz

    Array(10)
      .fill()
      .forEach(() => {
        testid('correct-option').click();
        cy.contains('Responder').click();
        cy.contains('Avançar').click();
      });

    // score
    testid('total-correct').should('have.text', '10');
    testid('total-wrong').should('have.text', '0');

    // detailed score
    testid('easy-correct').should('includes.text', '0');
    testid('easy-wrong').should('includes.text', '0');
    testid('medium-correct').should('includes.text', '2');
    testid('medium-wrong').should('includes.text', '0');
    testid('hard-correct').should('includes.text', '8');
    testid('hard-wrong').should('includes.text', '0');
    cy.contains('Parabéns');

    // check if result is persisted
    cy.visit('');
    cy.get('button').first().click(); // go back same quiz
    cy.contains('Parabéns');
    testid('total-correct').should('have.text', '10');
  });

  it('Should have all levels if when responding wrong answers', () => {
    cy.visit('');
    cy.get('button').first().click(); // select first quiz

    [
      'correct-option', //medium
      'correct-option', //medium
      'wrong-option', //hard
      'wrong-option', //hard
      'wrong-option', //medium
      'wrong-option', //medium
      'correct-option', //easy
      'correct-option', //easy
      'correct-option', //medium
      'correct-option', //medium
    ].forEach((option) => {
      testid(option).first().click();
      cy.contains('Responder').click();
      cy.contains('Avançar').click();
    });
    testid('medium-correct').should('includes.text', '4');
    testid('medium-wrong').should('includes.text', '2');
    testid('easy-correct').should('includes.text', '2');
    testid('hard-wrong').should('includes.text', '2');
  });

  // it.only('Should persist last unresponded question', function () {
  //   cy.visit('');
  //   cy.get('button').first().click(); // select first quiz

  //   testid('question-description')
  //     .as('past')
  //     .then(function () {
  //       console.log(this.past[0].p.innerText);
  //       cy.log(this.past[0].p.innerText);
  //     });
  // });
});

const testid = (id) => cy.get(`[data-testid=${id}]`);
