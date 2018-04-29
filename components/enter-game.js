import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { setPlayerName, forgetMe, getMe, getPlayerName, getFacebookId } from '../stores/player-id-store';
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
	playerName: PropTypes.string,
	facebookId: PropTypes.string,
	setPlayerName: PropTypes.func.isRequired,
	forgetMe: PropTypes.func.isRequired,
	getMe: PropTypes.func.isRequired,
};

const defaultProps = {
	playerName: undefined,
	facebookId: undefined,
};

export class BaseEnterGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameId: '',
			name: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeGameId = this.onChangeGameId.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
	}

	componentDidMount() {
		AccessToken.getCurrentAccessToken().then(({ accessToken } = {}) => {
			if (accessToken) this.props.getMe();
		});
	}

	onChangeGameId(gameId) {
		this.setState(() => ({ gameId: gameId && gameId.replace(/\s/g, '').toUpperCase() }));
	}

	onChangeName(name) {
		this.setState(() => ({ name: name && name.replace(/\s/g, '').toUpperCase() }));
	}

	onSubmit() {
		const { facebookId } = this.props;
		const { gameId, name } = this.state;

		if (!gameId) return;

		if (!facebookId && name) {
			this.props.setPlayerName({ playerName: name });
		}
		this.props.navigation.navigate('Game', { gameId });
	}

	render() {
		const { facebookId, playerName } = this.props;
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
					value={facebookId ? playerName : name}
					onChangeText={this.onChangeName}
					style={styles.nameInput}
					editable={!facebookId}
				/>
				<Button
					disabled={!gameId}
					onPress={this.onSubmit}
					title="Enter"
				/>
				<LoginButton
					readPermissions={['public_profile']}
					onLoginFinished={
						(error, result) => {
							if (error) {
								// eslint-disable-next-line no-alert
								alert(`Login failed with error: ${result.error}`);
							} else if (result.isCancelled) {
								// eslint-disable-next-line no-alert
								alert('Login was cancelled');
							} else {
								this.props.getMe();
							}
						}
					}
					onLogoutFinished={this.props.forgetMe}
				/>
			</KeyboardAvoidingView>
		);
	}
}

BaseEnterGame.defaultProps = defaultProps;
BaseEnterGame.propTypes = propTypes;

const mapStateToProps = (state) => {
	const playerName = getPlayerName(state);
	const facebookId = getFacebookId(state);

	return {
		playerName,
		facebookId,
	};
};

const mapDispatchToProps = {
	setPlayerName,
	forgetMe,
	getMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseEnterGame);
