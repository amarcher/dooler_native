import { StackNavigator } from 'react-navigation';
import EnterGame from './components/enter-game';
import Container from './components/container';

const NavigationStack = StackNavigator({
	Home: { screen: EnterGame },
	Game: { screen: Container, path: '/:gameId' },
}, {
	header: { visible: false },
	headerMode: 'none',
});

export default NavigationStack;
