import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import Text from './Text';

import { getTurnsLeftForGameId } from '../stores/turns-store';
import { getAgentsLeftForGameId, getActiveGameId } from '../stores/game-store';

const propTypes = {
	agentsLeft: PropTypes.number,
	turnsLeft: PropTypes.number,
};

const defaultProps = {
	agentsLeft: undefined,
	turnsLeft: undefined,
};

const styles = {
	turn: {
		height: 24,
		width: 24,
	},
};

export class BaseTurnView extends Component {
	maybeRenderWin() {
		if (this.props.agentsLeft !== 0) return null;

		return (
			<Text>You Win!</Text>
		);
	}

	renderTurns() {
		const { turnsLeft } = this.props;

		if (typeof turnsLeft !== 'number') return null;

		if (turnsLeft < 1) {
			return (
				<Text>Game Over</Text>
			);
		}

		return Array(Math.max(turnsLeft, 0)).fill().map((_el, index) => (
			<Image source={require('../img/mushroom.png')} style={styles.turn} key={index} /> // eslint-disable-line react/no-array-index-key
		));
	}

	render() {
		return (
			<View style={{ flexGrow: 1, marginLeft: 6 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
					{this.renderTurns()}
				</View>
				{this.maybeRenderWin()}
			</View>
		);
	}
}

BaseTurnView.propTypes = propTypes;
BaseTurnView.defaultProps = defaultProps;

function mapStateToProps(state) {
	const gameId = getActiveGameId(state);

	return {
		turnsLeft: getTurnsLeftForGameId(state, gameId),
		agentsLeft: getAgentsLeftForGameId(state, gameId),
	};
}

export default connect(mapStateToProps)(BaseTurnView);
