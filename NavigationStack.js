import { StackNavigator } from 'react-navigation';
import GamesView from './components/games-view';
import EnterGame from './components/enter-game';
import Container from './components/container';

const NavigationStack = StackNavigator({
	Home: { screen: GamesView },
	EnterGame: { screen: EnterGame },
	Game: { screen: Container, path: '/:gameId' },
}, {
	header: { visible: false },
	headerMode: 'none',
	cardStyle: {
		backgroundColor: 'black',
	},
});

export default NavigationStack;
