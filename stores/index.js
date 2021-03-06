import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import gameReducer, { enterGame, getActiveGameId, addOrReplaceGame, updateWordInGame } from './game-store';
import playersReducer, { incrementPlayerCount, decrementPlayerCount, clearPlayers } from './players-store';
import playerIdReducer, { setPlayerId } from './player-id-store';
import playerNameReducer, { getPlayerName } from './player-name-store';
import turnsReducer, { updateTurnsLeft, updateClue, updateGuessesLeft } from './turns-store';
import tokenReducer from './token-store';
import navReducer from './nav-store';
import { addCallbacks as addWsCallbacks } from '../utils/ws';

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
		playerName: playerNameReducer,
		token: tokenReducer,
		nav: navReducer,
	}),
	applyMiddleware(thunkMiddleware, middleware),
);

export function onWsEvent(data) {
	const { type, payload: payloadWithoutGameId, gameId } = data;
	const payload = { ...payloadWithoutGameId, gameId };

	switch (type) {
	case 'words':
		return store.dispatch(addOrReplaceGame(payload));
	case 'guess':
		store.dispatch(updateWordInGame(payload));
		return store.dispatch(updateGuessesLeft(payload));
	case 'playerLeft':
		return store.dispatch(decrementPlayerCount(payload));
	case 'playerJoined':
		return store.dispatch(incrementPlayerCount(payload));
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

export function onWsConnected() {
	const state = store.getState();
	const gameId = getActiveGameId(state);
	const playerName = getPlayerName(state);

	store.dispatch(clearPlayers({ gameId }));
	return store.dispatch(enterGame({ gameId, playerName }));
}

addWsCallbacks({ onWsEvent, onWsConnected });

export default store;
