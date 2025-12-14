import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav';
import TabNav from './TabNav';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import { initDatabase } from '../database';

// Initialize database when app starts
initDatabase();

const App = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
        <StackNav />
        </NavigationContainer>
    </Provider>

  );
};

export default App;