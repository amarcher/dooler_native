import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from './Button';
import Text from './Text';

import { changePlayerId, getPlayerId } from '../stores/player-id-store';

const PLAYERS = {
	ONE: 'one',
	TWO: 'two',
	NEUTRAL: '',
};

const propTypes = {
	changePlayerId: PropTypes.func.isRequired,
	playerId: PropTypes.string,
};

const defaultProps = {
	playerId: PLAYERS.NEUTRAL,
};

export class BasePlayerSelect extends Component {
	renderButton(playerId) {
		const text = playerId ? `Be player ${playerId}` : 'Be neutral';

		return (
			<Button
				style={{ marginRight: 12 }}
				key={`player${playerId}`}
				title={text}
				onPress={() => this.props.changePlayerId({ playerId })}
			/>
		);
	}

	render() {
		const buttons = this.props.playerId ? this.renderButton(PLAYERS.NEUTRAL) : [PLAYERS.ONE, PLAYERS.TWO].map(this.renderButton, this);
		const text = this.props.playerId && `You are player ${this.props.playerId}`;

		return (
			<View style={{ flexDirection: 'row', flexShrink: 1 }}>
				<Text style={{ marginRight: 12 }}>{text}</Text>
				{buttons}
			</View>
		);
	}
}

BasePlayerSelect.propTypes = propTypes;
BasePlayerSelect.defaultProps = defaultProps;

const mapDispatchToProps = { changePlayerId };

function mapStateToProps(state) {
	return {
		playerId: getPlayerId(state),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePlayerSelect);
