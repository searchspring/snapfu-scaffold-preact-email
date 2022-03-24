/* searchspring imports */
import { Snap } from '@searchspring/snap-preact';
import { getContext } from '@searchspring/snap-toolbox';

/* local imports */
import './styles/custom.scss';

/*
	context and background filtering
 */

const context = getContext(['shopper']);

/*
	configuration and instantiation
 */

const config = {
	context,
	url: {
		parameters: {
			core: {
				query: { name: 'q' },
			},
		},
	},
	client: {
		globals: {
			siteId: '{{snapfu.siteId}}',
		},
	},
	instantiators: {
		recommendation: {
			components: {
				Email: async () => {
					return (await import('./components/Recommendations/Email')).Email;
				},
			},
			config: {
				branch: BRANCHNAME,
			},
		},
	},
	controllers: {},
};

const snap = new Snap(config);
