import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { setPlayerName, forgetMe, getPlayerName, getFacebookId } from '../stores/player-id-store';
import { getGames } from '../stores/games-store';
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
	forgetMe: PropTypes.func.isRequired,
	fetchGames: PropTypes.func.isRequired,
	games: PropTypes.arrayOf(PropTypes.shape({
		gameId: PropTypes.string.isRequired,
		otherPlayerName: PropTypes.string.isRequired,
	})),
};

const defaultProps = {
	playerName: undefined,
	facebookId: undefined,
	games: [],
};

export class GamesView extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchGames();
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

GamesView.defaultProps = defaultProps;
GamesView.propTypes = propTypes;

const mapStateToProps = (state) => {
	const playerName = getPlayerName(state);
	const facebookId = getFacebookId(state);
	const games = getGames(state);

	return {
		playerName,
		facebookId,
		games,
	};
};

const mapDispatchToProps = {
	setPlayerName,
	forgetMe,
	fetchGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesView);
