import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Caption} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStyles} from '../../utils/AppStyles';
import {basePagestyle} from '../../utils/BasePageStyle';
import API from '../../api/ApiHelper';
import {API_CONSTANTS} from '../../utils/Constants';

class EmployeeList extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({userId: await AsyncStorage.getItem('userId')});
    API.get(API_CONSTANTS.getUsers, {})
      .then(response => {
        this.setState({data: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('EmployeeDetail', {
              id: item.id,
            });
          }}
          style={styles.card}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Caption style={{}}>{item.email}</Caption>
        </TouchableOpacity>
      );
    };
    return (
      <View style={basePagestyle.baseContainer}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee List</Text>
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
          </TouchableOpacity>
        </View>
        <View style={basePagestyle.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={basePagestyle.flex}
            data={this.state.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No data available</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default EmployeeList;
const styles = StyleSheet.create({
  header: {
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: AppStyles.color.blueShade,
  },
  headerText: {
    marginLeft: 5,
    fontSize: 20,
    color: AppStyles.color.violet,
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: AppStyles.color.transparent,
    marginTop: 10,
  },
  nameText: {
    fontSize: 16,
    color: AppStyles.color.violet,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
});
