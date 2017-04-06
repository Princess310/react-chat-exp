/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import messages from './messages';
import Warpper, { Container } from './Wrapper';

import { doLogin } from './actions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    password: '',
    usernameErr: false,
    passwordErr: false,
  }

  handleUsernameChange = (e: object, v: string) => {
    this.setState({
      username: v
    });
  }

  handlePasswordChange = (e: object, v: string) => {
    this.setState({
      password: v
    });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    let checkUsername = false, checkPassword = false;

    if(username.trim() === '') {
      checkUsername = true;
    }else {
      checkUsername = false;
    }

    if(password.trim() === '') {
      checkPassword = true;
    }else {
      checkPassword = false;
    }

    this.setState({
      usernameErr: checkUsername,
      passwordErr: checkPassword,
    });

    // if validate err
    if(checkUsername || checkPassword) {
      return false;
    }

    this.props.doLogin(username, password);
  }

  render() {
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
            type='password'
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
      </Container>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doLogin: (u, p) => dispatch(doLogin(u, p))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
