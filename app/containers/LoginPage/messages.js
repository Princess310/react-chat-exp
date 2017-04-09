/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.LoginPage.header',
    defaultMessage: '登录-健康汇销',
  },
  username: {
    id: 'app.containers.LoginPage.username',
    defaultMessage: '账号',
  },
  usernameErr: {
    id: 'app.containers.LoginPage.usernameErr',
    defaultMessage: '账号不能为空',
  },
  password: {
    id: 'app.containers.LoginPage.password',
    defaultMessage: '密码',
  },
  passwordErr: {
    id: 'app.containers.LoginPage.passwordErr',
    defaultMessage: '密码不能为空',
  },
  login: {
    id: 'app.containers.LoginPage.login',
    defaultMessage: '登录',
  },
});
