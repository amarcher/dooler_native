import { createAction, createReducer } from 'redux-act';
import { changePlayer, fetchMe } from '../fetchers';
import { getActiveGameId } from './game-store';
import { getToken } from './token-store';

export const setPlayerId = createAction('Set player id');
export const setPlayerName = createAction('Set player name');
export const setFacebookId = createAction('Set Facebook id');

const reducer = createReducer({
	[setPlayerId]: (state, payload) => ({ ...state, id: payload.player }),
	[setPlayerName]: (state, payload) => ({ ...state, playerName: payload.playerName }),
	[setFacebookId]: (state, payload) => ({ ...state, playerName: payload.playerName, facebookId: payload.facebookId }),
}, {});


// Selectors
export const getPlayerId = state => state && state.playerId && state.playerId.id;
export const getPlayerName = state => state && state.playerId && state.playerId.playerName;
export const getFacebookId = state => state && state.playerId && state.playerId.facebookId;

// Thunks
export function changePlayerId({ playerId }) {
	return (dispatch, getState) => {
		const state = getState();

		return changePlayer({
			gameId: getActiveGameId(state),
			player: playerId,
			playerName: getPlayerName(state),
			token: getToken(state),
		});
	};
}

// Thunks
export function getMe() {
	return (dispatch) => {
		fetchMe().then(({ id, name } = {}) => {
			dispatch(setFacebookId({
				facebookId: id,
				playerName: name.split(' ')[0].toUpperCase(),
			}));
		});
	};
}

// Thunks
export function forgetMe() {
	return (dispatch) => {
		dispatch(setFacebookId({
			facebookId: undefined,
			playerName: '',
		}));
	};
}

export default reducer;
