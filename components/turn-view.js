import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import Text from './Text';

import { getTurnsLeft } from '../stores/turns-store';
import { getAgentsLeft } from '../stores/game-store';

const propTypes = {
	agentsLeft: PropTypes.number.isRequired,
	turnsLeft: PropTypes.number.isRequired,
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
		const turnsLeft = Math.max(this.props.turnsLeft, 0);

		if (turnsLeft < 1) {
			return (
				<Text>Game Over</Text>
			);
		}

		return Array(turnsLeft).fill().map((_el, index) => (
			<Image source={require('../img/mushroom.png')} style={styles.turn} key={index} /> // eslint-disable-line react/no-array-index-key
		));
	}

	render() {
		return (
			<View style={{ flexGrow: 0 }}>
				<View style={{ flexDirection: 'row' }}>
					{this.renderTurns()}
				</View>
				{this.maybeRenderWin()}
			</View>
		);
	}
}

BaseTurnView.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		turnsLeft: getTurnsLeft(state),
		agentsLeft: getAgentsLeft(state),
	};
}

export default connect(mapStateToProps)(BaseTurnView);
