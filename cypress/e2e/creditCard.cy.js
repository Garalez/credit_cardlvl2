/// <reference types="cypress" />

describe('Тесты на валидацию полей ввода', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  });

  it('Валидация поля ввода имени и фамилии. Одного слова', () => {
    cy.get('#name').type('John');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода имени и фамилии. Кирилицы', () => {
    cy.get('#name').type('Макс Лескин');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные валидны</h2>');
  });

  it('Валидация поля ввода имени и фамилии. Цифры', () => {
    cy.get('#name').type('1234');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода номера карточки. Cимволы кириллицы', () => {
    cy.get('#cardnumber').type('Иван Иванов');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода номера карточки. Cимволы латиницы', () => {
    cy.get('#cardnumber').type('John');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода номера карточки. Знаки препинания', () => {
    cy.get('#cardnumber').type('!,.');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода номера карточки. С меньшим кол-вом цифр', () => {
    cy.get('#cardnumber').type('5555 5555 5555 5');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация поля ввода номера карточки. С большим кол-вом цифр', () => {
    cy.get('#cardnumber').type('5555 5555 5555 5555 55');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные валидны</h2>');
  });

  it('Валидация поля ввода CVV/CVC. Более 4 цифр', () => {
    cy.get('#securitycode').type('12345');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные валидны</h2>');
  });

  it('Валидация поля ввода CVV/CVC. С 3 цифрами', () => {
    cy.get('#securitycode').type('123');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные валидны</h2>');
  });

  it('Валидация поля ввода CVV/CVC. С 1-2 кол-вом цифр', () => {
    cy.get('#securitycode').type('12');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация на правильность ввода всех полей ввода', () => {
    cy.get('#name').type('Влад Гальцев');
    cy.get('#cardnumber').type('5555 5555 5555 5555');
    cy.get('#securitycode').type('345');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные валидны</h2>');
  });

  it('Валидация на неправильность ввода всех полей ввода. Неверное имя', () => {
    cy.get('#name').type('Влад');
    cy.get('#cardnumber').type('5555 5555 5555 5555');
    cy.get('#securitycode').type('345');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });

  it('Валидация на неправильность ввода всех полей ввода. Неверный номер карты', () => {
    cy.get('#name').type('Влад Гальцев');
    cy.get('#cardnumber').type('5555 5555 5555 5');
    cy.get('#securitycode').type('345');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });
  it('Валидация на неправильность ввода всех полей ввода. Неверный номер защитного кода', () => {
    cy.get('#name').type('Влад Гальцев');
    cy.get('#cardnumber').type('5555 5555 5555 5555');
    cy.get('#securitycode').type('34');
    cy.get('.submit-btn').click();
    cy.get('.payment-title').should('contain.html',
        '<h2>Данные не валидны</h2>');
  });
});
