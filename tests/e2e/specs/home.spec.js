describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Gitapp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Gitapp');
    });

    it('Deberia mostrar los ultimos 5 movimientos', () => {
        cy.visit('/');

        cy.get('[data-testid=last-movements]').contains('Últimos movimientos');
        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia mostrar fechas en formato correcto', () => {
        cy.visit('/');

        cy.get('ul>li .level-left .has-text-weight-light').eq(0).should(($p) => {
            expect($p).to.contain('2021-05-23')

        });
    });

    it('Deberia poder navegar a income', () => {
        cy.visit('/');

        cy.get('a[href*=income]')
            .contains('Ingresos')
            .click()
            .title()
            .should('eq', 'Gitapp - Ingresos')
    });
});
