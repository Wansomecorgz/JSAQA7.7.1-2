describe('Should check ticket booking', function () {
    const selectors = require("../fixtures/selectors.json");
    const user = require('../fixtures/admin_login.json');

    beforeEach(function () {        
        cy.login(user[0].login,user[0].pass);
    })

    it('Should check seanse in admin panel', () => {
        cy.isVisible(selectors.checkFilmName);
        cy.textForSel(selectors.checkFilmName,selectors.hallName);
        cy.textForSel(selectors.checkFilmTime, selectors.filmTime);
    })

    it('Should get ticket from admin panel', function ()  {
        cy.visit("/");
        cy.get(selectors.tomorrowDayClick).click();
        cy.contains(selectors.filmTime).click();
        cy.get(selectors.freeChain).click();
        cy.contains("Забронировать").click();
        cy.contains('Вы выбрали билеты:').should('be.visible');  
    })
})