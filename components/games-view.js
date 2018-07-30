import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { setPlayerName, forgetMe, getPlayerName, getMe, getFacebookId } from '../stores/player-name-store';
import { getGames, getGamesViaApi } from '../stores/game-store';
import Button from './Button';
import Text from './Text';
import GameSummary from './game-summary';

const styles = {
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
	facebookId: PropTypes.string,
	forgetMe: PropTypes.func.isRequired,
	getMe: PropTypes.func.isRequired,
	getGamesViaApi: PropTypes.func.isRequired,
	games: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
	games: [],
	facebookId: undefined,
};

export class BaseGamesView extends Component {
	constructor(props) {
		super(props);

		this.onStartNewGame = this.onStartNewGame.bind(this);
	}

	componentDidMount() {
		AccessToken.getCurrentAccessToken().then((data) => {
			if (data && data.accessToken) this.props.getMe();
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.facebookId !== this.props.facebookId) {
			this.props.getGamesViaApi();
		}
	}

	onStartNewGame() {
		this.props.navigation.navigate('EnterGame');
	}

	renderGames() {
		const { games, navigation } = this.props;

		if (!games || !games.length) return null;

		const gameSummaries = games.map(gameId => (
			<GameSummary gameId={gameId} key={gameId} navigation={navigation} />
		));

		return (
			<View>
				<Text>Active Games: </Text>
				{gameSummaries}
			</View>
		);
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container} behavior="padding">
				<Text style={styles.title}>Dooler</Text>
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
				{this.renderGames()}
				<Button
					onPress={this.onStartNewGame}
					title="Start New Game"
				/>
			</ScrollView>
		);
	}
}

BaseGamesView.defaultProps = defaultProps;
BaseGamesView.propTypes = propTypes;

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
	getMe,
	getGamesViaApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseGamesView);
