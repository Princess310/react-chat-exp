/*
 *
 * WeChatLogin
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { doWechatLogin } from './actions';

export class WeChatLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { location, doLogin } = this.props;
    const { query: { code } } = location;

    if (code) {
      doLogin(code);
    }
  }

  render() {
    return (
      <div>
        WeChat Login...
      </div>
    );
  }
}

WeChatLogin.propTypes = {
  doLogin: PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    doLogin: (code) => dispatch(doWechatLogin(code)),
  };
}

export default connect(null, mapDispatchToProps)(WeChatLogin);
