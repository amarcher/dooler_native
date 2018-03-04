import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';

const styles = {
	gameInput: {
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
			<View style={styles.container}>
				<Text style={styles.title}>Dooler</Text>
				<TextInput
					placeholder="Enter Game Code"
					placeholderTextColor="gray"
					disabled={!gameId}
					value={gameId}
					onChangeText={this.onChangeText}
					style={styles.gameInput}
				/>
				<Button
					disabled={!gameId}
					onPress={this.onSubmit}
					title="Enter"
				/>
			</View>
		);
	}
}

EnterGame.propTypes = propTypes;
