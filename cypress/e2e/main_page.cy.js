describe('Main page should have correct elements', () => {
  const selectors = require("../fixtures/selectors.json");
  beforeEach(() => {
    cy.visit('/');
  })
  
  it('Should show correct numbers of days', () => {    
    cy.get(selectors.days).should('have.length', 7);
  });

  it('Main page should have title', () => {
    cy.get('title').should('have.text', 'ИдёмВКино');
  })

  it('Should have header banner', () => {
    cy.isVisible(selectors.header);
    cy.get('h1').should('have.text', 'Идёмвкино');
  })

  it('Should show correct date today', () => {
    let dateToday = new Date();
    let date = dateToday.getDate();
    let dayOfWeek = dateToday.getDay();
    let arrayDays= ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
    cy.get(selectors.dayWeek).should('have.text', arrayDays[dayOfWeek]);
    cy.get(selectors.dayNumber).should('have.text', date);    
  });

});

describe ('Movie info block', () => {
  const selectors = require("../fixtures/selectors.json");
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should have class movie', () => {
    cy.isVisible(selectors.movieBlock);
    cy.get('section.movie').should('have.length', 2); 
  })

  it('Should have movie poster with image, alt description ans source path', () => {
    const movie__poster = require('../fixtures/movie_poster.json');
    movie__poster.forEach(movie__poster => {
      cy.check_poster(movie__poster.number, 'alt', movie__poster.alt);
      cy.check_poster(movie__poster.number, 'src', movie__poster.src);
    }); 
  })

  it('Should have description block for movie(1)', () => {
    const movie_desc = require('../fixtures/movie_decr.json');
    movie_desc.forEach(movie_desc => {
      cy.textForSel(`section:nth-child(${movie_desc.number}) > div.movie__info > div.movie__description > h2.movie__title`, movie_desc.title);
      cy.textForSel(`section:nth-child(${movie_desc.number}) > div.movie__info > div.movie__description > p.movie__synopsis`, movie_desc.synopsis);
      cy.textForSel(`section:nth-child(${movie_desc.number}) > div.movie__info > div.movie__description > .movie__data > .movie__data-duration`, movie_desc.duration);
      cy.textForSel(`section:nth-child(${movie_desc.number}) > div.movie__info > div.movie__description > .movie__data > .movie__data-origin`, movie_desc.origin);
    });    
  })
  
  it('Should have seanses hall with title and lists of seanses shedule', () => {
    const hall = require('../fixtures/seans_hall_for_all.json');
    hall.forEach( hall =>{
      cy.textForSel(`section:nth-child(${hall['number-movie']}) > div:nth-child(${hall['number-hall']}) > h3`, hall.name);
      cy.attrInclude(`section:nth-child(${hall['number-movie']}) > div:nth-child(${hall['number-hall']}) > ul > li > a`, "href", hall.href);
      cy.attrInclude(`section:nth-child(${hall['number-movie']}) > div:nth-child(${hall['number-hall']}) > ul > li > a`, "data-seance-id", hall['data-seance-id']);
      cy.attrInclude(`section:nth-child(${hall['number-movie']}) > div:nth-child(${hall['number-hall']}) > ul > li > a`, "data-seance-start", hall['data-seance-start']);
      cy.textForSel(`section:nth-child(${hall['number-movie']}) > div:nth-child(${hall['number-hall']}) > ul > li > a`, hall.time);
    });
  })
  
})