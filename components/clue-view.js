import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TextInput, Button } from 'react-native';

import { getClue, getGuessesLeft, getTurnsLeft, giveClue } from '../stores/turns-store';
import { startNew } from '../stores/game-store';
import { getPlayerId } from '../stores/player-id-store';

const propTypes = {
	clue: PropTypes.shape({
		word: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired,
	}),
	giveClue: PropTypes.func.isRequired,
	guessesLeft: PropTypes.number,
	playerId: PropTypes.string,
	turnsLeft: PropTypes.number,
	startNew: PropTypes.func.isRequired,
};

const defaultProps = {
	clue: undefined,
	guessesLeft: 0,
	playerId: '',
	turnsLeft: 0,
};

export class BaseClueView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			word: '',
			number: 1,
		};

		this.onWordChange = this.onWordChange.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onSubmitClue = this.onSubmitClue.bind(this);
	}

	onWordChange(e) {
		const word = e.target.value;
		this.setState(() => ({ word: word && word.replace(/\s/g, '').toUpperCase() }));
	}

	onNumberChange(e) {
		const number = e.target.value;
		this.setState(() => ({ number }));
	}

	onSubmitClue(e) {
		e.preventDefault();
		const { number, word } = this.state;

		if (word) {
			this.props.giveClue({ word, number });
		}
	}

	maybeRenderClue() {
		if (!this.props.clue || !this.props.clue.word || this.props.turnsLeft < 1) {
			return null;
		}

		const clueWord = this.props.clue && this.props.clue.word && (
			<View className="clue-for-guesser">
				<span className="clue-for-guesser-word"><span className="light">Clue:</span>&nbsp;{this.props.clue.word}</span>
				<span className="clue-for-guesser-number">
					<span className="light">Guesses:</span>&nbsp;
					<span className="clue-for-guesser-guesses-left">
						{this.props.guessesLeft} / {this.props.clue.number}
					</span>
				</span>
			</View>
		);

		return (
			<View className="clue">
				{clueWord}
			</View>
		);
	}

	maybeRenderInput() {
		if (!this.props.playerId || (this.props.clue && this.props.clue.word) || this.props.turnsLeft < 1) {
			return null;
		}

		return (
			<View>
				<TextInput className="word-input" placeholder="WORD" value={this.state.word} onChange={this.onWordChange} />
				<TextInput className="number-input" pattern="[0-9]*" value={this.state.number} onChange={this.onNumberChange} />
				<Button
					disabled={!this.state.word}
					onPress={this.onSubmitClue}
					title="Enter"
				/>
			</View>

		);
	}

	maybeRenderStartNewGame() {
		if (this.props.turnsLeft > 0) return null;

		return (
			<Button type="button" onPress={() => this.props.startNew()} title="Start New Game" />
		);
	}

	render() {
		return (
			<View className="clue-view">
				{this.maybeRenderStartNewGame()}
				{this.maybeRenderClue()}
				{this.maybeRenderInput()}
			</View>
		);
	}
}

BaseClueView.propTypes = propTypes;
BaseClueView.defaultProps = defaultProps;

const mapDispatchToProps = { giveClue, startNew };

function mapStateToProps(state) {
	return {
		clue: getClue(state),
		guessesLeft: getGuessesLeft(state),
		playerId: getPlayerId(state),
		turnsLeft: getTurnsLeft(state),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseClueView);