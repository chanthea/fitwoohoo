import React, { Component } from 'react';
import { NetInfo } from 'react-native';

function withNetInfo(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      NetInfo.isConnected.fetch().then(this.handleChange);
    }

    componentDidMount() {
      NetInfo.isConnected.addEventListener('change', this.handleChange);
    }

    componentWillUnmount() {
      NetInfo.isConnected. removeEventListener('change', this.handleChange);
    }

    handleChange(isConnected) {
      this.setState({ isConnected });
    }

    render() {
      return <WrappedComponent isConnected={this.state.isConnected} {...this.props} />;
    }
  }
}

export default withNetInfo;