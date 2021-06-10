import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Appbar, Title, Caption, Button} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import {AppStyles} from '../../utils/AppStyles';
import {basePagestyle} from '../../utils/BasePageStyle';
import Themes from '../../utils/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={basePagestyle.baseContainer}>
        <SafeAreaView />
        <Appbar.Header style={styles.appBar}>
          <Appbar.Action
            icon="arrow-left"
            color={AppStyles.color.greyDark}
            onPress={() => {}}
          />
        </Appbar.Header>
        <ScrollView>
          <View style={basePagestyle.container}>
            <View style={styles.body}>
              <Title style={Themes.textGreyMedium}>Login</Title>

              <View style={styles.bodyInnerContainer}>
                <Caption style={Themes.textBlueLight}>User ID</Caption>
                <TextInput
                  style={styles.input}
                  selectionColor={AppStyles.color.black}
                  onChangeText={value => this.setState({userId: value})}
                  value={this.state.userId}
                  maxLength={250}
                />
                <Caption style={Themes.textBlueLight}>Password</Caption>
                <TextInput
                  style={styles.input}
                  onChangeText={value => this.setState({password: value})}
                  selectionColor={AppStyles.color.black}
                  secureTextEntry={true}
                  value={this.state.password}
                  maxLength={250}
                />
              </View>

              <View style={styles.footer}>
                <Caption>
                  <Caption style={Themes.textGreyLight}>
                    By logging in you agree to our{' '}
                  </Caption>

                  <Caption style={styles.policyText}>
                    Terms & Conditions
                  </Caption>
                  <Caption style={Themes.textGreyLight}> and </Caption>

                  <Caption style={styles.policyText}>Privacy Policy</Caption>
                </Caption>

                <Button
                  mode="contained"
                  disabled={
                    this.state.userId.length > 0 &&
                    this.state.password.length > 0
                      ? false
                      : true
                  }
                  style={styles.button}
                  color={AppStyles.color.violet}
                  onPress={async () => {
                    await AsyncStorage.setItem('userId', this.state.userId);
                    this.context.signIn();
                  }}>
                  Continue
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: AppStyles.color.transparent,
    elevation: 0,
  },
  body: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 15,
  },
  bodyInnerContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ebecf7',
    backgroundColor: '#f8f8fd',
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  footer: {
    marginTop: 30,
  },
  policyText: {
    color: AppStyles.color.blue,
    fontWeight: 'bold',
  },
  button: {
    padding: 5,
    marginVertical: 10,
  },
});
