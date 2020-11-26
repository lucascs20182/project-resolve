import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Desafios from './pages/desafios';

import Detalhe from './pages/detalhe';  

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="desafios" component={Desafios} />
                <AppStack.Screen name="detalhe" component={Detalhe} />
            </AppStack.Navigator>
        </NavigationContainer>        
    );
}