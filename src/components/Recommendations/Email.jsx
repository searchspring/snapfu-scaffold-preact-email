import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';

import { Result } from '@searchspring/snap-preact-components';

@observer
export class Email extends Component {
	render() {
		const controller = this.props.controller;
		const store = controller?.store;
		const theme = {
			components: {
				image: {
					lazy: false,
				},
			},
		};
		return store.results.length && (
			<div>
				{store.results.map((result, idx) => (
					//****** IMPORTANT  *******//
					// THIS OUTER "ss-emailrec" WRAPPER IS REQUIRED FOR EMAIL RECS TO WORK PROPERLY.
					// DO NOT REMOVE OR EDIT IT
					<div key={idx} id={\`ss-emailrec\${idx}\`} style={{ display: 'block', width: '240px' }}>
						{/* make your result changes here  */}
						<Result result={result} theme={theme}></Result>
					</div>
				))}
			</div>
		);
	}
}
