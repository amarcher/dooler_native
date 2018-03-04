import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';

import { endTurn, getGuessesLeft, getTurnsLeft } from '../stores/turns-store';
import { getPlayerId } from '../stores/player-id-store';

const propTypes = {
	endTurn: PropTypes.func.isRequired,
	playerId: PropTypes.string,
	guessesLeft: PropTypes.number,
	turnsLeft: PropTypes.number,
};

const defaultProps = {
	playerId: undefined,
	guessesLeft: undefined,
	turnsLeft: 0,
};

export class BaseEndTurn extends Component {
	render() {
		if (!this.props.playerId || this.props.guessesLeft === 0 || this.props.turnsLeft < 1) return null;

		return (
			<Button onPress={this.props.endTurn} title="End Turn" />
		);
	}
}

BaseEndTurn.propTypes = propTypes;
BaseEndTurn.defaultProps = defaultProps;

const mapDispatchToProps = { endTurn };

function mapStateToProps(state) {
	return {
		guessesLeft: getGuessesLeft(state),
		playerId: getPlayerId(state),
		turnsLeft: getTurnsLeft(state),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseEndTurn);