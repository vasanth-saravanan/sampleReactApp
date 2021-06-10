import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DashboardScreen from './src/screens/auth/DashboardScreen';
import LoginScreen from './src/screens/unAuth/LoginScreen';
import {Title, Caption} from 'react-native-paper';
import {AppStyles} from './src/utils/AppStyles';
import Themes from './src/utils/Themes';

const Stack = createStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => ({
    signIn: async userName => {
      let userToken;
      userToken = null;
      userToken = 'Token';
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log('App', e);
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: () => {
      dispatch({type: 'LOGOUT'});
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('error', e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <Title style={Themes.textViolet}>SAMPLE APP</Title>
        <Caption>Loading...</Caption>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.userToken != null ? (
            <Stack.Screen
              name="Dashboard"
              options={{headerShown: false}}
              component={DashboardScreen}
            />
          ) : (
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
