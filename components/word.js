import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

import { isAgent, isAssasin, isGuessed } from '../rules/words';
import { getActiveGameId, makeGuess } from '../stores/game-store';
import { getPlayerId } from '../stores/player-id-store';

const propTypes = {
	word: PropTypes.string.isRequired,
	role: PropTypes.string,
	revealed: PropTypes.shape({
		playerOne: PropTypes.string,
		playerTwo: PropTypes.string,
	}).isRequired,
	playerId: PropTypes.string,
	makeGuess: PropTypes.func.isRequired,
	guessedThisTurn: PropTypes.bool,
};

const defaultProps = {
	role: '',
	playerId: '',
	guessedThisTurn: false,
};

const styles = {
	nonAgentPlayerOne: {
		backgroundColor: '#721932',
	},
	nonAgentPlayerTwo: {
		backgroundColor: '#721932',
	},
	nonAgentBothPlayers: {
		backgroundColor: '#721932',
	},
	agent: {
		backgroundColor: '#029192',
	},
	assasin: {
		backgroundColor: '#fff',
		color: 'black',
	},
	myAgent: {
		color: '#029192',
	},
	myNonAgent: {
		color: 'gray',
	},
	myAssasin: {
		color: '#DD1919',
	},
	guessedThisTurn: {
		shadowColor: '#B82',
		shadowRadius: 10,
		shadowOpacity: 1,
	},
};

function getStyles({ revealed, role, guessedThisTurn }) {
	const rules = {
		agent: isAgent(revealed),
		nonAgentPlayerOne: revealed.playerOne === 'NON_AGENT' && !revealed.playerTwo,
		nonAgentPlayerTwo: revealed.playerTwo === 'NON_AGENT' && !revealed.playerOne,
		nonAgentBothPlayers: revealed.playerOne === 'NON_AGENT' && revealed.playerTwo === 'NON_AGENT',
		assasin: isAssasin(revealed),
		myAgent: role === 'AGENT',
		myNonAgent: role === 'NON_AGENT',
		myAssasin: role === 'ASSASIN',
		guessedThisTurn,
	};

	return Object.assign(
		{
			flex: 1, flexDirection: 'row', alignSelf: 'stretch', margin: 1, lineHeight: 0,
		},
		...Object.keys(rules).filter(key => rules[key]).map(key => styles[key]),
	);
}

export class BaseWord extends Component {
	constructor(props) {
		super(props);

		this.onPress = this.onPress.bind(this);
	}

	onPress(e) {
		e.preventDefault();

		const {
			word, revealed, role, playerId,
		} = this.props;

		if (role && !isGuessed(revealed, playerId)) {
			this.props.makeGuess({ word });
		}
	}

	render() {
		const {
			word, revealed, role, playerId, guessedThisTurn,
		} = this.props;

		const style = getStyles({ revealed, role, guessedThisTurn });

		return (
			<Button
				onPress={this.onPress}
				disabled={!role || isGuessed(revealed, playerId)}
				style={style}
				title={word}
				numberOfLines={1}
				adjustsFontSizeToFit
			/>
		);
	}
}

const mapDispatchToProps = { makeGuess };
function mapStateToProps(state) {
	const gameId = getActiveGameId(state);

	return {
		playerId: getPlayerId(state, gameId),
	};
}

BaseWord.propTypes = propTypes;
BaseWord.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(BaseWord);
