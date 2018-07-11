import { createAction, createReducer } from 'redux-act';
import { fetchGame, guess, startNewGame } from '../fetchers';
import { getPlayerId } from './player-id-store';
import { getToken } from './token-store';
import { updateTurnsLeft } from './turns-store';
import { TOTAL_AGENTS } from '../rules/game';
import { isAgent } from '../rules/words';

export const updateGames = createAction('Update games');
export const addOrReplaceGame = createAction('Add or replace game');
export const updateWordInGame = createAction('Update roleRevealedForClueGiver for a word in a game');
export const setActiveGameId = createAction('Set the active gameId');

const reducer = createReducer({
	[updateGames]: (state, games) => {
		if (!games && !games.length) return state;

		return games;
	},

	[addOrReplaceGame]: (state, game) => {
		if (!game) return state;

		return { ...state, [game.id]: game };
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
				...state.words[word],
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
export const getGameById = (state, gameId) => state && state[gameId];
export const getActiveGameId = state => state && state.nav && state.nav.params && state.nav.params.gameId;
export const getAgentsLeft = state => {
	const game = getActiveGameId(state);

	game && state.game.words && Object.values(state.game.words).reduce((count, word) => (
		isAgent(word) ? count - 1 : count
	), TOTAL_AGENTS)
};

// Thunks
export function enterGame({ gameId, playerName }) {
	return (dispatch, getState) => {
		// replace the game with an dummy game (just an id)
		// until we have a full game object from web socket
		dispatch(addOrReplaceGame({ gameId }));
		const token = getToken(getState());
		return fetchGame({ gameId, playerName, token });
	};
}

export function makeGuess({ word }) {
	return (dispatch, getState) => {
		const state = getState();
		const gameId = getActiveGameId(state);
		const playerId = getPlayerId(state);
		return guess({ gameId, word, player: playerId });
	};
}

export function startNew() {
	return (dispatch, getState) => startNewGame({ gameId: getActiveGameId(getState()) });
}

export default reducer;
