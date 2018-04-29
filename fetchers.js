import { send } from './utils/ws';
import { graphRequest } from './utils/fb';

/* Websocket Fetchers */

export function fetchGame({ gameId, playerName, token } = {}) {
	send({
		type: 'words',
		gameId,
		payload: { playerName, token },
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
	gameId, player, playerName, token,
}) {
	send({
		gameId,
		type: 'changePlayer',
		payload: { player, playerName, token },
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
