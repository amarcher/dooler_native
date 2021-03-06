import { createAction, createReducer } from 'redux-act';
import { fetchGame, guess, startNewGame, fetchGames } from '../fetchers';
import { updateTurnsLeft } from './turns-store';
import { clearPlayers } from './players-store';
import { getPlayerId, setPlayerId } from './player-id-store';
import { getFacebookId } from './player-name-store';
import { getToken } from './token-store';
import { TOTAL_AGENTS } from '../rules/game';
import { isAgent } from '../rules/words';

export const updateGames = createAction('Update games');
export const addOrReplaceGame = createAction('Add or replace game');
export const updateWordInGame = createAction('Update roleRevealedForClueGiver for a word in a game');

const reducer = createReducer({
	[updateGames]: (state, games) => {
		if (!games) return state;

		return games;
	},

	[addOrReplaceGame]: (state, { gameId, words } = {}) => {
		if (!gameId) return state;

		return { ...state, [gameId]: { gameId, words } };
	},

	[updateWordInGame]: (state, { gameId, word, roleRevealedForClueGiver }) => {
		if (!state[gameId]) return state;

		return {
			...state,
			[gameId]: {
				...state[gameId],
				words: {
					...state[gameId].words,
					[word]: {
						...state[gameId].words[word],
						roleRevealedForClueGiver,
						guessedThisTurn: true,
					},
				},
			},
		};
	},

	[updateTurnsLeft]: (state, { gameId }) => {
		if (!state[gameId]) return state;

		const words = Object.keys(state[gameId].words).reduce((allWords, word) => ({
			...allWords,
			[word]: {
				...state[gameId].words[word],
				guessedThisTurn: undefined,
			},
		}), {});

		return {
			...state,
			[gameId]: {
				...state[gameId],
				words,
			},
		};
	},
}, {});

// Selectors
export const getGames = state => state && state.game && Object.keys(state.game);
export const getGameById = (state, gameId) => state && state.game && state.game[gameId];
export const getActiveGameId = state => state && state.nav && state.nav.routes
	&& state.nav.routes[state.nav.routes.length - 1].params
	&& state.nav.routes[state.nav.routes.length - 1].params.gameId;
export const getAgentsLeftForGameId = (state, gameId) => (
	gameId && state && state.game && state.game[gameId] && state.game[gameId].words &&
		Object.values(state.game[gameId].words).reduce((count, word) => (isAgent(word) ? count - 1 : count), TOTAL_AGENTS)
);

// Thunks
export function enterGame({ gameId, playerName }) {
	return (dispatch, getState) => {
		// replace the game with an dummy game (just an id)
		// until we have a full game object from web socket
		dispatch(addOrReplaceGame({ gameId }));
		const state = getState();
		const facebookId = getFacebookId(state);
		const token = getToken(state);
		return fetchGame({
			gameId,
			playerName,
			token,
			facebookId,
		});
	};
}

export function makeGuess({ word }) {
	return (dispatch, getState) => {
		const state = getState();
		const gameId = getActiveGameId(state);
		const playerId = getPlayerId(state, gameId);
		return guess({ gameId, word, player: playerId });
	};
}

export function getGamesViaApi() {
	return (dispatch, getState) => {
		const state = getState();
		const facebookId = getFacebookId(state);

		if (!facebookId) {
			dispatch(updateGames({}));
		} else {
			fetchGames({
				facebookId,
			}).then((games) => {
				if (games) {
					dispatch(updateGames(games));
					Object.values(games).forEach((game) => {
						dispatch(setPlayerId(game));
						dispatch(updateTurnsLeft(game));
						dispatch(clearPlayers(game));
					});
				}
			});
		}
	};
}

export function startNew() {
	return (dispatch, getState) => startNewGame({ gameId: getActiveGameId(getState()) });
}

export default reducer;
