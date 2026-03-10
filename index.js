import { registerRootComponent } from 'expo';
import App from './App'; // Import your main App component

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that the app is properly initialized for Expo
registerRootComponent(App);