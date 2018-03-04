import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';

const propTypes = {
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.node,
};

const defaultProps = {
	style: {},
	children: null,
};

const defaultStyle = {
	fontFamily: 'American Typewriter',
	textAlign: 'center',
	textAlignVertical: 'center',
	color: 'white',
	fontSize: 24,
	lineHeight: 36,
};

export default class Text extends Component {
	render() {
		const { children, style, ...props } = this.props;

		return (
			<BaseText style={{ ...defaultStyle, ...style }} {...props}>
				{children}
			</BaseText>
		);
	}
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
