describe('Egresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia cargar el formulario al editar un ingreso', () => {
        cy.visit('/expense');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=id]').should('have.value', '19');
        cy.get('input[name=category]').should('have.value', 'Supermercado');
        cy.get('input[name=amount]').should('have.value', '1498');
    });


    it('Deberia poder crear un nuevo egreso', () => {
        cy.visit('/expense');
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Comida');
        cy.get('input[name=amount]').type('250');
        cy.contains('Guardar').click();
        cy.reload();

        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    
    it('Deberia guardar la fecha correctamente al crear un movimiento', () => {
        cy.visit('/income');
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Multa');
        cy.get('input[name=amount]').type('300');
        cy.contains('Guardar').click();
        cy.reload();
        cy.get(':nth-child(1) > [data-testid=movement] > .level-left > :nth-child(2) > div > :nth-child(2)').should('contain.text', '2021-04-26')
    });


    it('Deberia verificar que se agreguen nuevos movimientos', () => {
        cy.visit('/expense');
        cy.get('input[name=date]').type('2021-05-26');
        cy.get('input[name=category]').type('Transporte');
        cy.get('input[name=amount]').type('100');
        cy.contains('Guardar').click();
        cy.get('.swal2-title').should('have.text', 'Good job!')
        cy.reload();
    });

    it('Deberia aparecer el campo descripcion al crear y obtener un movimiento', () => {
        cy.visit('/expense');
        cy.get('input[name=description]').should('exist')
        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=description]').should('exist')
    });

    it('Deberia aparecer el campo recurrencia al crear y obtener un movimiento', () => {
        cy.visit('/expense');

        cy.get('input[name=recurrent]').should('exist')
        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=recurrent]').should('exist')
    });


})
