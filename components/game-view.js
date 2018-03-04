import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Word from './word';

const propTypes = {
	game: PropTypes.shape({
		gameId: PropTypes.string,
		words: PropTypes.object,
	}).isRequired,
};

export default class GameView extends Component {
	renderWords() {
		const { game } = this.props;

		return Object.keys(game.words).map(word => (
			<Word
				word={word}
				guessedThisTurn={game.words[word].guessedThisTurn}
				role={game.words[word].role}
				revealed={game.words[word].roleRevealedForClueGiver}
				key={word}
			/>
		));
	}

	render() {
		if (!this.props.game.words) {
			return null;
		}

		return (
			<View className="words">
				{this.renderWords()}
			</View>
		);
	}
}

GameView.propTypes = propTypes;
