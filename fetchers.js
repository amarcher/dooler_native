import { send } from './utils/ws';
import { get } from './utils/ajax';
import { graphRequest } from './utils/fb';
import { isDebugMode } from './rules/env';

/* Websocket Fetchers */

export function fetchGame({
	gameId,
	playerName,
	token,
	facebookId,
} = {}) {
	send({
		type: 'words',
		gameId,
		payload: { playerName, token, facebookId },
	});
}

export function guess({ gameId, word, player } = {}) {
	send({
		gameId,
		type: 'guess',
		payload: { word, player },
	});
}

export function changePlayer({
	gameId, player, playerName, token, facebookId,
}) {
	send({
		gameId,
		type: 'changePlayer',
		payload: {
			player,
			playerName,
			token,
			facebookId,
		},
	});
}

export function endTurn({ gameId } = {}) {
	send({
		gameId,
		type: 'endTurn',
		payload: {},
	});
}

export function giveClue({
	gameId, player, word, number,
} = {}) {
	send({
		gameId,
		type: 'giveClue',
		payload: { player, word, number },
	});
}

export function startNewGame({
	gameId,
} = {}) {
	send({
		gameId,
		type: 'startNewGame',
		payload: {},
	});
}


/* Facebook Graph Request Fetchers */

export function fetchMe() {
	return graphRequest('/me');
}

/* HTTPS Fetchers */

export function fetchGames({ facebookId } = {}) {
	const hostname = isDebugMode() ? 'http://localhost:3000' : 'https://www.dooler.com';
	return get(`${hostname}/games`, { facebookId });
}
