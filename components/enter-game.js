import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	gameInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
	},
});

const propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

export default class EnterGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameId: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
	}

	onChangeText(gameId) {
		this.setState(() => ({ gameId }));
	}

	onSubmit(e) {
		e.preventDefault();
		const { gameId } = this.state;

		if (gameId) {
			this.props.navigation.navigate('Game', { gameId });
		}
	}

	render() {
		const { gameId } = this.state;

		return (
			<View>
				<Text>Dooler</Text>
				<TextInput
					placeholder="Enter Game Code"
					disabled={!gameId}
					value={gameId}
					onChangeText={this.onChangeText}
					style={styles.gameInput}
				/>
				<Button
					onPress={this.onSubmit}
					title="Enter"
				/>
			</View>
		);
	}
}

EnterGame.propTypes = propTypes;
