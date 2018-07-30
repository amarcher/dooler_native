import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';

const propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // eslint-disable-line react/forbid-prop-types
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

		// TODO: understand where Array values for style come from
		const appliedStyle = style instanceof Array ? {} : style;

		return (
			<BaseText style={{ ...defaultStyle, ...appliedStyle }} {...props}>
				{children}
			</BaseText>
		);
	}
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
