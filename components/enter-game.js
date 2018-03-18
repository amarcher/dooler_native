import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { setPlayerName } from '../stores/player-id-store';
import { close as closeWebSocket } from '../utils/ws';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';

const styles = {
	gameInput: {
		marginBottom: 24,
	},
	nameInput: {
		marginBottom: 24,
	},
	container: {
		backgroundColor: 'black',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 48,
		lineHeight: 72,
		textAlign: 'center',
		padding: 12,
	},
};

const propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	setPlayerName: PropTypes.func.isRequired,
};

export class BaseEnterGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameId: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeGameId = this.onChangeGameId.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
	}

	onComponentDidMount() {
		closeWebSocket();
	}

	onChangeGameId(gameId) {
		this.setState(() => ({ gameId: gameId && gameId.replace(/\s/g, '').toUpperCase() }));
	}

	onChangeName(name) {
		this.setState(() => ({ name: name && name.replace(/\s/g, '').toUpperCase() }));
	}

	onSubmit() {
		const { gameId, name } = this.state;

		if (!gameId) return;

		if (name) this.props.setPlayerName({ playerName: name });
		this.props.navigation.navigate('Game', { gameId });
	}

	render() {
		const { gameId, name } = this.state;

		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={styles.title}>Dooler</Text>
				<TextInput
					placeholder="Game Code"
					placeholderTextColor="gray"
					value={gameId}
					onChangeText={this.onChangeGameId}
					style={styles.gameInput}
				/>
				<TextInput
					placeholder="Your Name"
					placeholderTextColor="gray"
					value={name}
					onChangeText={this.onChangeName}
					style={styles.nameInput}
				/>
				<Button
					disabled={!gameId}
					onPress={this.onSubmit}
					title="Enter"
				/>
			</KeyboardAvoidingView>
		);
	}
}

BaseEnterGame.propTypes = propTypes;

const mapDispatchToProps = {
	setPlayerName,
};

export default connect(undefined, mapDispatchToProps)(BaseEnterGame);
