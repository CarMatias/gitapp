describe('Ingresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia cargar el formulario al editar un ingreso', () => {
        cy.visit('/income');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=id]').should('have.value', '14');
        cy.get('input[name=category]').should('have.value', 'Plazo Fijo');
        cy.get('input[name=amount]').should('have.value', '11000');
    });


    it('Deberia poder crear un nuevo ingreso', () => {
        cy.visit('/income');
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload();

        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia guardar la fecha correctamente al crear un movimiento', () => {
        cy.visit('/income');
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload();
        cy.get(':nth-child(1) > [data-testid=movement] > .level-left > :nth-child(2) > div > :nth-child(2)').should('contain.text', '2021-04-26')
    });

    it('Deberia verificar que se agreguen nuevos movimientos', () => {
        cy.visit('/income');
        cy.get('input[name=date]').type('2021-05-26');
        cy.get('input[name=category]').type('Sueldo');
        cy.get('input[name=amount]').type('10000');
        cy.contains('Guardar').click();
        cy.get('.swal2-title').should('have.text', 'Good job!')
        cy.reload();
    });

    it('Deberia aparecer el campo descripcion al crear y obtener un movimiento', () => {
        cy.visit('/income');
        cy.get('input[name=description]').should('exist')
        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=description]').should('exist')
    });


    it('Deberia aparecer el campo recurrencia al crear y obtener un movimiento', () => {
        cy.visit('/income');

        cy.get('input[name=recurrent]').should('exist')
        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();
        cy.get('input[name=recurrent]').should('exist')
    });
    it('Deberia aparecer un simbolo positivo o negativo en el monto dependiendo de si es ingreso o gasto', () => {
        cy.visit('/expense');
        cy.get('[class="has-text-danger is-size-3"]').contains('-');
        cy.visit('/income');
        cy.get('[class="has-text-success is-size-3"]').contains('+');
    });


    it('Deberia eliminar el formulario al editar un ingreso', () => {
        cy.visit('/income');
        cy.get(':nth-child(1) > [data-testid=movement]')
            .find('button')
            .contains('editar')
            .click()
        cy.get('.is-flex-grow-1 > .button')
            .click();
        cy.get('[data-testid=movement]').should('have.length', 3);
    });


})
