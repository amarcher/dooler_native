import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import ClueView from './clue-view';
import PlayerView from './player-view';
import GameView from './game-view';
import TurnView from './turn-view';
import PlayerSelect from './player-select';
import EndTurn from './end-turn';
import Button from './Button';

import { getPlayerName } from '../stores/player-id-store';
import { enterGame, getGame } from '../stores/game-store';
import { addToken } from '../stores/token-store';
import { enableNotifications } from '../utils/notifications';

const propTypes = {
	enterGame: PropTypes.func.isRequired,
	addToken: PropTypes.func.isRequired,
	playerName: PropTypes.string,
	gameId: PropTypes.string.isRequired,
	game: PropTypes.shape({
		gameId: PropTypes.string,
		words: PropTypes.object,
	}),
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

const defaultProps = {
	game: {},
	playerName: '',
};

const styles = {
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
};

export class BaseContainer extends Component {
	constructor(props) {
		super(props);

		this.onBackPress = this.onBackPress.bind(this);
	}

	componentDidMount() {
		const { gameId, playerName } = this.props;

		enableNotifications({ setToken: this.props.addToken });
		this.props.enterGame({ gameId, playerName });
	}

	onBackPress() {
		this.props.navigation.navigate('Home');
	}

	render() {
		const { game } = this.props;

		if (!game.words) {
			return null;
		}

		return (
			<View style={styles.container}>
				<View style={{
					flexGrow: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 6,
				}}
				>
					<Button title="<" onPress={this.onBackPress} />
					<TurnView />
					<ClueView />
				</View>
				<GameView game={game} />
				<View style={{
					flexGrow: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 6,
				}}
				>
					<PlayerSelect />
					<EndTurn />
					<PlayerView />
				</View>
			</View>
		);
	}
}

BaseContainer.propTypes = propTypes;
BaseContainer.defaultProps = defaultProps;

function mapStateToProps(state, ownProps) {
	const { gameId } = ownProps.navigation.state.params;

	return {
		playerName: getPlayerName(state),
		game: getGame(state),
		gameId,
	};
}

const mapDispatchToProps = {
	enterGame,
	addToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);
