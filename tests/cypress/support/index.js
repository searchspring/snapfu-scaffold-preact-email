// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// ignore 3rd party uncaught exceptions - but not bundle exceptions
Cypress.on('uncaught:exception', (err) => {
	if (err.stack.match(/\/\/localhost:\d+\/bundle\./)) {
		return true;
	}

	return false;
});

beforeEach(() => {
	// make references to requests available
	cy.intercept(/.*searchspring.io\/api\/search\/search/).as('search');
	cy.intercept(/.*searchspring.io\/api\/search\/autocomplete/).as('autocomplete');

	// prevent v2 and v3 assets
	cy.intercept(/.*searchspring.net\/search\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*searchspring.net\/autocomplete\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*searchspring.net\/ajax_search\/js\/*/, (req) => {
		req.destroy();
	});

	// prevent snap assets
	cy.intercept(/.*snapui.searchspring.io\/.*.js$/, (req) => {
		req.destroy();
	});

	// prevent 3rd party assets
	cy.intercept(/.*widget.privy.com\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*.swymrelay.com\/*/, (req) => {
		req.destroy();
	});
});
