import { StackNavigator } from 'react-navigation';
import EnterGame from './components/enter-game';
import Container from './components/container';

const NavigationStack = StackNavigator({
	Home: { screen: EnterGame },
	Game: { screen: Container, path: '/:gameId' },
});

export default NavigationStack;
