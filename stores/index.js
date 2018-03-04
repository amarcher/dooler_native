import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import gameReducer, { enterGame, getGameId, addOrReplaceGame, updateWordInGame } from './game-store';
import playersReducer, { updatePlayerCount } from './players-store';
import playerIdReducer, { getPlayerId, setPlayerId, changePlayerId } from './player-id-store';
import turnsReducer, { updateTurnsLeft, updateClue, updateGuessesLeft } from './turns-store';
import navReducer from './nav-store';

const middleware = createReactNavigationReduxMiddleware(
	'root',
	state => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

export const store = createStore(
	combineReducers({
		game: gameReducer,
		turns: turnsReducer,
		players: playersReducer,
		playerId: playerIdReducer,
		nav: navReducer,
	}),
	applyMiddleware(thunkMiddleware, middleware),
);

export function wsEvent(data) {
	const { type, payload } = data;

	switch (type) {
	case 'words':
		return store.dispatch(addOrReplaceGame(payload));
	case 'guess':
		store.dispatch(updateWordInGame(payload));
		return store.dispatch(updateGuessesLeft(payload));
	case 'playerLeft':
	case 'playerJoined':
		return store.dispatch(updatePlayerCount(payload));
	case 'playerChanged':
		return store.dispatch(setPlayerId(payload));
	case 'turns':
		return store.dispatch(updateTurnsLeft(payload));
	case 'clueGiven':
		return store.dispatch(updateClue(payload));
	default:
		return null;
	}
}

export function wsConnected() {
	const state = store.getState();
	const playerId = getPlayerId(state);
	const gameId = getGameId(state);

	if (playerId) {
		return store.dispatch(changePlayerId({ playerId }));
	}

	return store.dispatch(enterGame({ gameId }));
}

export default store;
