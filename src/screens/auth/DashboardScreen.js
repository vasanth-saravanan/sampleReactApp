import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStyles} from '../../utils/AppStyles';
import {basePagestyle} from '../../utils/BasePageStyle';
import {images} from '../../utils/Images';

class DashboardScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({userId: await AsyncStorage.getItem('userId')});
  };
  render() {
    return (
      <View style={basePagestyle.baseContainer}>
        <SafeAreaView />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              this.context.signOut();
            }}>
            <Avatar.Icon
              size={50}
              style={styles.icon}
              icon="logout"
              color={AppStyles.color.greyMedium}
            />
            <Caption style={styles.logOutText}>logout</Caption>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={basePagestyle.container}>
            <View style={styles.greetContainer}>
              <Title style={styles.greetText}>Welcome</Title>
              <Text>{this.state.userId}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image source={images.dashboardImage} />
              <Title style={styles.QuoteText}>Life is Good!</Title>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DashboardScreen;
const styles = StyleSheet.create({
  header: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    backgroundColor: AppStyles.color.transparent,
    marginTop: 10,
  },
  logOutText: {
    bottom: 10,
  },
  greetContainer: {
    marginHorizontal: 20,
  },
  greetText: {
    fontSize: 25,
    color: AppStyles.color.violet,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  QuoteText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    color: AppStyles.color.violet,
  },
});
