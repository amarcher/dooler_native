import { createAction, createReducer } from 'redux-act';
import { fetchMe } from '../fetchers';

export const setPlayerName = createAction('Set player name');
export const setFacebookId = createAction('Set Facebook id');

const reducer = createReducer({
	[setPlayerName]: (state, payload) => ({ ...state, playerName: payload.playerName }),
	[setFacebookId]: (state, { playerName, facebookId, facebookImage } = {}) => ({
		...state,
		playerName,
		facebookId,
		facebookImage,
	}),
}, {});


// Selectors
export const getPlayerName = state => state && state.playerName && state.playerName.playerName;
export const getFacebookId = state => state && state.playerName && state.playerName.facebookId;
export const getFacebookImage = state => state && state.playerName && state.playerName.facebookImage;


// Thunks
export function getMe() {
	return dispatch => (
		fetchMe().then(({ id, name } = {}) => (
			dispatch(setFacebookId({
				facebookId: id,
				playerName: name.split(' ')[0].toUpperCase(),
			}))
		))
	);
}

export function forgetMe() {
	return dispatch => (
		dispatch(setFacebookId({
			facebookId: undefined,
			playerName: '',
		}))
	);
}

export default reducer;
