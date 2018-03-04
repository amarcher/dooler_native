import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput as BaseTextInput } from 'react-native';

const propTypes = {
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
	style: {},
};

const defaultStyle = {
	borderColor: 'gray',
	borderWidth: 1,
	color: 'white',
	width: 300,
	fontFamily: 'American Typewriter',
	textAlign: 'center',
	backgroundColor: '#2f2f2f',
	fontSize: 24,
	paddingLeft: 12,
	paddingRight: 12,
};

export default class Text extends Component {
	render() {
		const { style, ...props } = this.props;

		return (
			<BaseTextInput placeholderTextColor="#a9a9a9" style={{ ...defaultStyle, ...style }} {...props} />
		);
	}
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
