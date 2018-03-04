import React from 'react';
import { Provider } from 'react-redux';

import { store } from './stores';
import AppNavigation from './AppNavigation';

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigation />
		</Provider>
	);
}
