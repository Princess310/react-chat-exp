/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';

import { makeSelectLoginError } from './selectors';
import messages from './messages';
import Warpper, { Container } from './Wrapper';

import { doLogin, loadLoginError } from './actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    password: '',
    usernameErr: false,
    passwordErr: false,
    autoHideDuration: 4000,
  }

  componentDidMount() {
    const obj = new WxLogin({
      id: 'weixin_login',
      appid: 'wx6cfafa809546088c',
      scope: 'snsapi_login',
      redirect_uri: encodeURIComponent(`http://${request.getDomain()}/#/wechat`),
      state: 2,
    });
  }

  handleUsernameChange = (e, v) => {
    this.setState({
      username: v,
    });
  }

  handlePasswordChange = (e, v) => {
    this.setState({
      password: v,
    });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    let checkUsername = false;
    let checkPassword = false;

    if (username.trim() === '') {
      checkUsername = true;
    } else {
      checkUsername = false;
    }

    if (password.trim() === '') {
      checkPassword = true;
    } else {
      checkPassword = false;
    }

    this.setState({
      usernameErr: checkUsername,
      passwordErr: checkPassword,
    });

    // if validate err
    if (checkUsername || checkPassword) {
      return false;
    }

    return this.props.doLogin(username, password);
  }

  render() {
    const { loginError: { error, msg } } = this.props;

    return (
      <Container>
        <Warpper>
          <Subheader>
            <FormattedMessage {...messages.header} />
          </Subheader>

          <TextField
            onChange={this.handleUsernameChange}
            hintText={<FormattedMessage {...messages.username} />}
            errorText={this.state.usernameErr && <FormattedMessage {...messages.usernameErr} />}
          />
          <TextField
            onChange={this.handlePasswordChange}
            hintText={<FormattedMessage {...messages.password} />}
            errorText={this.state.passwordErr && <FormattedMessage {...messages.passwordErr} />}
            type="password"
          />

          <RaisedButton
            label={<FormattedMessage {...messages.login} />}
            primary={true}
            style={{
              marginTop: '24px',
              marginBottom: '15px',
              width: '256px',
            }}
            onTouchTap={this.handleLogin}
          />
        </Warpper>
        <div id="weixin_login"></div>
        <Snackbar
          open={error}
          message={msg !== '' ? msg : '登录异常'}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={() => {
            this.props.setLoadingError(false, { message: '' });
          }}
        />
      </Container>
    );
  }
}

LoginPage.propTypes = {
  doLogin: PropTypes.func,
  setLoadingError: PropTypes.func,
  loginError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginError: makeSelectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doLogin: (u, p) => dispatch(doLogin(u, p)),
    setLoadingError: (b, d) => dispatch(loadLoginError(b, d)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
