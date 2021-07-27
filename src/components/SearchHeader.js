import { h, Component } from 'preact';
import { observer } from 'mobx-react';

@observer
export class SearchHeader extends Component {
	render() {
		const { controller } = this.props;
		const {
			store,
			store: { pagination, search },
		} = controller;
		const originalQuery = search.originalQuery;

		return (
			store.loaded && (
				<div class="ss__search-header">
					{pagination.totalResults ? (
						<h1 class="ss__search-header--results">
							{`Showing `}
							{pagination.multiplePages && <span class="ss__search-header__count-range">{` ${pagination.begin} - ${pagination.end} of `}</span>}
							<span class="ss__search-header__count-total">{pagination.totalResults}</span>
							{` result${pagination.totalResults == 1 ? '' : 's'}`}
							{search?.query && (
								<span>
									{` for `}
									<span class="ss__search-header__query">"{search.query.string}"</span>
								</span>
							)}
						</h1>
					) : (
						pagination.totalResults === 0 && (
							<h1 class="ss__search-header--noresults">
								{search?.query ? (
									<span>
										No results for <span class="ss__search-header__query">"{search.query.string}"</span> found.
									</span>
								) : (
									<span>No results found.</span>
								)}
							</h1>
						)
					)}

					{originalQuery && (
						<div class="ss__oq">
							Search instead for "<a href={originalQuery.url.href}>{originalQuery.string}</a>"
						</div>
					)}
				</div>
			)
		);
	}
}
