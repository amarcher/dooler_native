import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';

import { changePlayerId, getPlayerId, getPlayerName, setPlayerName } from '../stores/player-id-store';

const propTypes = {
	changePlayerId: PropTypes.func.isRequired,
	setPlayerName: PropTypes.func.isRequired,
	playerId: PropTypes.string,
	playerName: PropTypes.string,
};

const defaultProps = {
	playerId: '',
	playerName: '',
};

export class BasePlayerSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerName: props.playerName,
		};

		this.onChangePlayer = this.onChangePlayer.bind(this);
		this.onChangePlayerName = this.onChangePlayerName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangePlayer() {
		this.props.setPlayerName({ playerName: '' });
		this.props.changePlayerId({ playerId: '' });
	}

	onChangePlayerName(name) {
		this.setState(() => ({ playerName: name && name.replace(/\s/g, '').toUpperCase() }));
	}

	onSubmit() {
		const { playerId } = this.props;
		const { playerName } = this.state;

		if (playerName) this.props.setPlayerName({ playerName });
		this.props.changePlayerId({ playerId });
	}

	renderBeNeutralButton() {
		return (
			<Button
				style={{ marginRight: 12 }}
				title="Be neutral"
				onPress={this.onChangePlayer}
			/>
		);
	}

	renderEnterGameButton() {
		return (
			<TextInput
				placeholder="Your Name"
				placeholderTextColor="gray"
				value={this.state.playerName}
				onChangeText={this.onChangePlayerName}
				returnKeyType="go"
				enablesReturnKeyAutomatically
				onSubmitEditing={this.onSubmit}
			/>
		);
	}

	render() {
		const button = this.props.playerId ? this.renderBeNeutralButton() : this.renderEnterGameButton();
		const text = this.props.playerId ? `You are ${this.props.playerName}` : 'You are neutral';

		return (
			<View style={{ flexDirection: 'row', flexShrink: 1 }}>
				<Text style={{ marginRight: 12 }}>{text}</Text>
				{button}
			</View>
		);
	}
}

BasePlayerSelect.propTypes = propTypes;
BasePlayerSelect.defaultProps = defaultProps;

const mapDispatchToProps = { setPlayerName, changePlayerId };

function mapStateToProps(state) {
	return {
		playerId: getPlayerId(state),
		playerName: getPlayerName(state),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePlayerSelect);
