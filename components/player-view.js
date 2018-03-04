import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';

import { getPlayers } from '../stores/players-store';

const propTypes = {
	players: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	player: {
		height: 24,
		width: 24,
	},
});

export class BasePlayerView extends Component {
	renderPlayers() {
		return Array(this.props.players).fill().map((_el, index) => (
			<Image /* eslint-disable-next-line react/no-array-index-key */
				key={index}
				source={require('../img/businessman.png')}
				style={styles.player}
			/>
		));
	}

	render() {
		return (
			<View>
				{this.renderPlayers()}
			</View>
		);
	}
}

BasePlayerView.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		players: getPlayers(state),
	};
}

export default connect(mapStateToProps)(BasePlayerView);
