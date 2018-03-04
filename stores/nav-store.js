import NavigationStack from '../NavigationStack';

const INITIAL_STATE = NavigationStack.router.getStateForAction(NavigationStack.router.getActionForPathAndParams('Home'));

const reducer = (state = INITIAL_STATE, action) => {
	const newState = NavigationStack.router.getStateForAction(action, state);
	return newState || state;
};

export default reducer;
