import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import Text from './Text';

const propTypes = {
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	title: PropTypes.string,
	numberOfLines: PropTypes.number,
	adjustsFontSizeToFit: PropTypes.bool,
};

const defaultProps = {
	style: {},
	title: '',
	numberOfLines: 1,
	adjustsFontSizeToFit: false,
};

const defaultTouchableHighlightStyle = {
	borderRadius: 5,
	paddingLeft: 12,
	paddingRight: 12,
	backgroundColor: '#1e1e1e',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const VALID_TEXT_KEYS = new Set(['color']);

const getTextStyle = style => (
	Object.keys(style).filter(key => VALID_TEXT_KEYS.has(key)).reduce((memo, key) => ({
		...memo,
		[key]: style[key],
	}), {})
);

const getTouchableHighlightStyle = style => ({
	...defaultTouchableHighlightStyle,
	...Object.keys(style).filter(key => !VALID_TEXT_KEYS.has(key)).reduce((memo, key) => ({
		...memo,
		[key]: style[key],
	}), {}),
});

export default class Button extends Component {
	render() {
		const {
			style, title, adjustsFontSizeToFit, numberOfLines, ...props
		} = this.props;

		const textStyle = getTextStyle(style);
		const touchableHighlightStyle = getTouchableHighlightStyle(style);

		return (
			<TouchableHighlight style={touchableHighlightStyle} {...props}>
				<Text numberOfLines={numberOfLines} adjustsFontSizeToFit={adjustsFontSizeToFit} style={textStyle}>{title}</Text>
			</TouchableHighlight>
		);
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
