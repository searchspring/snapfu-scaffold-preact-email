// ***********************************************************
// Custom Snap Cypress Custom Configuration
//
// Typically this file would contain custom intercepts.
// You can read more here:
// https://on.cypress.io/configuration
// https://docs.cypress.io/api/commands/intercept
// ***********************************************************

beforeEach(() => {
	// prevent 3rd party assets
	cy.intercept(/.*widget.privy.com\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*.swymrelay.com\/*/, (req) => {
		req.destroy();
	});
});

// used for ignoring certain runtime errors that may be unfixable
export const ignoredErrors = [];
