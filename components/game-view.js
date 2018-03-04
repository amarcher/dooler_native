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

		const words = Object.keys(game.words).map(word => (
			<Word
				word={word}
				guessedThisTurn={game.words[word].guessedThisTurn}
				role={game.words[word].role}
				revealed={game.words[word].roleRevealedForClueGiver}
				key={word}
			/>
		));

		return new Array(5).fill().map((_, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }} key={index}>
				{words.slice(5 * index, 5 * (index + 1))}
			</View>
		));
	}

	render() {
		if (!this.props.game.words) {
			return null;
		}

		return (
			<View style={{
				flexGrow: 1, flexShrink: 0, alignSelf: 'stretch', backgroundColor: 'black',
			}}
			>
				{this.renderWords()}
			</View>
		);
	}
}

GameView.propTypes = propTypes;
