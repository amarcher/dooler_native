import { createAction, createReducer } from 'redux-act';

export const addToken = createAction('Add a token');

const reducer = createReducer({
	[addToken]: (state, { token, os }) => {
		console.log('addToken', token);

		return {
			...state,
			token,
			os,
		};
	},
}, {});

// Selectors
export const getToken = state => state && state.token && state.token.token;

export default reducer;
