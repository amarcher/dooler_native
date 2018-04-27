import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import { addListener } from './stores';
import NavigationStack from './NavigationStack';

class BaseAppNavigation extends Component {
	constructor(props) {
		super(props);

		this.onBackPress = this.onBackPress.bind(this);
	}

	componentDidMount() {
		SplashScreen.hide();
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	onBackPress() {
		const { dispatch, navigationState } = this.props;

		if (navigationState.index === 0) return false;

		dispatch(NavigationActions.back());

		return true;
	}

	render() {
		const { navigationState, dispatch } = this.props;

		return (
			<NavigationStack
				navigation={addNavigationHelpers({
					dispatch,
					state: navigationState,
					addListener,
				})}
			/>
		);
	}
}

BaseAppNavigation.propTypes = {
	dispatch: PropTypes.func.isRequired,
	navigationState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({ navigationState: state.nav });

export default connect(mapStateToProps)(BaseAppNavigation);
