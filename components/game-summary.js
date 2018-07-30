import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGameById } from '../stores/game-store';
import Button from './Button';

const propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	gameId: PropTypes.string,
};

const defaultProps = {
	gameId: '',
};

export class BaseGameSummary extends Component {
	constructor(props) {
		super(props);

		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		const { gameId } = this.props;

		this.props.navigation.navigate('Game', { gameId });
	}

	render() {
		const { gameId } = this.props;

		return (
			<Button
				onPress={this.onPress}
				title={gameId}
			/>
		);
	}
}

BaseGameSummary.propTypes = propTypes;
BaseGameSummary.defaultProps = defaultProps;

const mapStateToProps = (state, { gameId } = {}) => {
	const game = getGameById(state, gameId);

	return {
		...game,
	};
};

export default connect(mapStateToProps)(BaseGameSummary);
