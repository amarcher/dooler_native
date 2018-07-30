import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import Text from './Text';

const propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // eslint-disable-line react/forbid-prop-types
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
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

const defaultTextStyle = {};

const VALID_TEXT_KEYS = new Set(['color', 'lineHeight']);

function getTextStyle(style) {
	const validTextStyles = Object.keys(style).filter(key => VALID_TEXT_KEYS.has(key));

	if (!validTextStyles.length) return defaultTextStyle;

	return {
		...defaultTextStyle,
		...validTextStyles.reduce((memo, key) => ({
			...memo,
			[key]: style[key],
		}), {}),
	};
}

function getTouchableHighlightStyle(style) {
	const validTouchableHighlightStyles = Object.keys(style).filter(key => !VALID_TEXT_KEYS.has(key));

	if (!validTouchableHighlightStyles.length) return defaultTouchableHighlightStyle;

	return {
		...defaultTouchableHighlightStyle,
		...validTouchableHighlightStyles.reduce((memo, key) => ({
			...memo,
			[key]: style[key],
		}), {}),
	};
}

export default class Button extends Component {
	render() {
		const {
			style, title, adjustsFontSizeToFit, numberOfLines, ...props
		} = this.props;

		// TODO: understand where Array values for style come from
		const appliedStyle = style instanceof Array ? {} : style;

		const textStyle = getTextStyle(appliedStyle);
		const touchableHighlightStyle = getTouchableHighlightStyle(appliedStyle);

		return (
			<TouchableHighlight style={touchableHighlightStyle} activeOpacity={0.8} {...props}>
				<Text
					numberOfLines={numberOfLines}
					adjustsFontSizeToFit={adjustsFontSizeToFit}
					allowFontScaling={adjustsFontSizeToFit}
					style={textStyle}
				>
					{title}
				</Text>
			</TouchableHighlight>
		);
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
