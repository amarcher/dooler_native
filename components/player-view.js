import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import Text from './Text';

import { getConnectedPlayerNamesForGameId } from '../stores/players-store';
import { getActiveGameId } from '../stores/game-store';

const propTypes = {
	players: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const styles = {
	player: {
		height: 24,
		width: 24,
	},
	playerContainer: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		marginLeft: 6,
	},
};

export class BasePlayerView extends Component {
	renderPlayers() {
		const playerNameStyle = {
			position: 'absolute',
			fontSize: 5,
			bottom: -24,
			width: 30,
		};

		return this.props.players.map((player, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<View style={styles.playerContainer} key={index}>
				<Image
					source={require('../img/businessman.png')}
					style={styles.player}
				/>
				<Text style={playerNameStyle}>{player}</Text>
			</View>
		));
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
				{this.renderPlayers()}
			</View>
		);
	}
}

BasePlayerView.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		players: getConnectedPlayerNamesForGameId(state, getActiveGameId(state)),
	};
}

export default connect(mapStateToProps)(BasePlayerView);
