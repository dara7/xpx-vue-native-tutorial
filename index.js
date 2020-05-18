/**
 * @format
 */
import './shim';
import {AppRegistry} from 'react-native';
import App from './App.vue';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
