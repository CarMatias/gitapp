describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Gitapp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Gitapp');
    });

    it('Deberia estar bien el formato del entero', () => {
        cy.visit('/');

        cy.get(':nth-child(1) > [data-testid=movement] > .level-right > .level-item > .has-text-danger').contains("$ 1.498")
    });

    it('Deberia mostrar los ultimos 5 movimientos', () => {
        cy.visit('/');

        cy.get('[data-testid=last-movements]').contains('Últimos movimientos');
        cy.get('[data-testid=movement]').should('have.length', 5);
    });


    it('Deberia poder navegar a income', () => {
        cy.visit('/');

        cy.get('a[href*=income]')
            .contains('Ingresos')
            .click()
            .title()
            .should('eq', 'Gitapp - Ingresos')
    });

    
    it('Deberia aparecer un simbolo positivo o negativo en el monto dependiendo de si es ingreso o gasto', () => {
        cy.visit('/expense');

        cy.get('[class="has-text-danger is-size-3"]').contains('-');
        cy.visit('/income');
        cy.get('[class="has-text-success is-size-3"]').contains('+');
    });
});

