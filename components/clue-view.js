import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Text from './Text';
import TextInput from './TextInput';
import Button from './Button';

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
			number: '',
		};

		this.onWordChange = this.onWordChange.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
		this.onSubmitClue = this.onSubmitClue.bind(this);
	}

	onWordChange(word) {
		this.setState(() => ({ word: word && word.replace(/\s/g, '').toUpperCase() }));
	}

	onNumberChange(number) {
		this.setState(() => ({ number }));
	}

	onSubmitClue(e) {
		e.preventDefault();
		const { number, word } = this.state;

		if (word) {
			this.props.giveClue({ word, number });
			this.setState(() => ({ word: '', number: '' }));
		}
	}

	maybeRenderClue() {
		if (!this.props.clue || !this.props.clue.word || this.props.turnsLeft < 1) {
			return null;
		}

		return this.props.clue && this.props.clue.word && (
			<View style={{ flexDirection: 'row' }}>
				<Text>
					<Text style={{ color: '#898989' }}>Clue: </Text>
					{this.props.clue.word}
				</Text>
				<Text style={{ marginLeft: 12 }}>
					<Text style={{ color: '#898989' }}>Guesses: </Text>
					{this.props.guessesLeft} / {this.props.clue.number}
				</Text>
			</View>
		);
	}

	maybeRenderInput() {
		if (!this.props.playerId || (this.props.clue && this.props.clue.word) || this.props.turnsLeft < 1) {
			return null;
		}

		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 0 }}>
				<TextInput placeholder="WORD" value={this.state.word} onChangeText={this.onWordChange} style={{ width: 250, marginRight: 3 }} />
				<TextInput placeholder="#" keyboardType="numeric" maxLength={2} value={`${this.state.number}`} onChangeText={this.onNumberChange} style={{ width: 50, marginRight: 3 }} />
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
			<View>
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
