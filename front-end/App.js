import React from 'react';
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import {PaperProvider} from "react-native-paper";
import Routes from './src/routes';

export default function App() {
  return (
      <PaperProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>
            <Routes/>
          </NavigationContainer>
      </PaperProvider>
  );
}

