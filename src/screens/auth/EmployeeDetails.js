import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Caption} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStyles} from '../../utils/AppStyles';
import {basePagestyle} from '../../utils/BasePageStyle';
import API from '../../api/ApiHelper';
import {API_CONSTANTS} from '../../utils/Constants';

class EmployeeDetail extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userAddress: {},
      companyDetails: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const userId = this.props.route.params.id;
    this.setState({userId: await AsyncStorage.getItem('userId')});
    API.get(`${API_CONSTANTS.getUsers}/${userId}`, {})
      .then(response => {
        this.setState({
          data: response.data,
          userAddress: response.data.address,
          companyDetails: response.data.company,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={basePagestyle.baseContainer}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee Detail</Text>
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
        <ScrollView>
          <View style={basePagestyle.container}>
            <View style={styles.card}>
              <Text style={styles.subHeading}>Employee Details :</Text>
              <Caption>Employee Id : {this.state.data.id}</Caption>
              <Caption>Name : {this.state.data.name}</Caption>
              <Caption>Email : {this.state.data.email}</Caption>
              <Caption>Address :</Caption>
              <Caption>
                {this.state.userAddress.suite}, {this.state.userAddress.street},
              </Caption>
              <Caption>
                {this.state.userAddress.city}, {this.state.userAddress.zipcode},
              </Caption>
              <Caption>Phone number : {this.state.data.phone},</Caption>
            </View>

            <View style={styles.card}>
              <Text style={styles.subHeading}>Company Details :</Text>
              <Caption>Company Name : {this.state.companyDetails.name}</Caption>
              <Caption>Website : {this.state.data.website}</Caption>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EmployeeDetail;
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
  subHeading: {
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
