import React, { Component } from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
import { Tabs, Drawer, LoginStack } from './config/router';
import { connect } from 'react-redux';
import { checkLogin } from './actions';

class Content extends Component {
  componentWillMount() {
    this.props.checkLogin();
  }

  render() {
    if (this.props.checkingUser) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (this.props.token) {
      if (Platform.OS === 'ios') {
        return <Tabs />;
      }

      return <Drawer />;
    }

    return <LoginStack />;
  }
}

const mapStateToProps = ({ auth }) => {
  const { token, checkingUser } = auth;

  return { token, checkingUser };
}

export default connect(mapStateToProps, { checkLogin })(Content);
