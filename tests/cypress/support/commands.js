// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import packageJSON from '../../../package.json';

Cypress.Commands.add('addScript', (script) => {
	cy.document().then((doc) => {
		const scriptElem = document.createElement('script');
		scriptElem.type = 'text/javascript';
		scriptElem.src = script;
		doc.head.appendChild(scriptElem);
	});
});

Cypress.Commands.add('addScripts', (scripts = []) => {
	scripts = typeof scripts === 'string' ? [scripts] : scripts;

	if (!scripts.length) return;

	scripts.forEach((script) => {
		cy.addScript(script);
	});
});

Cypress.Commands.add('addLocalSnap', () => {
	cy.window().then((window) => {
		if (!window?.searchspring) {
			cy.addScript('https://localhost:3333/bundle.js');
		}
	});
});

Cypress.Commands.add('addCloudSnap', (branch = 'production') => {
	cy.intercept(/.*snapui.searchspring.io\/.*\/bundle.js$/).as('script');
	cy.addScript(`https://snapui.searchspring.io/${packageJSON.searchspring.siteId}/${branch}/bundle.js`);
});


Cypress.Commands.add('waitForController', (controllerId = 'search') => {
	cy.window().then((window) => {
		return new Cypress.Promise((resolve) => {
			const checkTimeout = 100;
			let interval = setInterval(() => {
				if (window.searchspring.controller && window.searchspring.controller[controllerId]) {
					if (!window.searchspring.controller[controllerId].store.loading) {
						clearInterval(interval);
						resolve(window.searchspring.controller[controllerId]);
					}
				}
			}, checkTimeout);
		});
	});
});

Cypress.Commands.add('waitForBundle', () => {
	cy.window().then((window) => {
		return new Cypress.Promise((resolve) => {
			const checkTimeout = 100;
			let interval = setInterval(() => {
				if (window.searchspring) {
					clearInterval(interval);
					resolve();
				}
			}, checkTimeout);
		});
	});
});

Cypress.Commands.add('waitForIdle', (options) => {
	options = { initialTimeout: 2000, additionalTimeout: 200, ...options };

	return cy.window().then({ timeout: options.initialTimeout }, (window) => {
		return new Cypress.Promise((resolve) => {
			let timeout = setTimeout(resolve, options.additionalTimeout);

			const observer = new window.PerformanceObserver(() => {
				clearTimeout(timeout);
				timeout = setTimeout(resolve, options.additionalTimeout);
			});

			observer.observe({ entryTypes: ['resource'] });
		});
	});
});
