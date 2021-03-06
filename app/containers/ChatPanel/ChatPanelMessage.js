/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';
import { fetchTouchUser, fetchMessageUsers } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import CircularProgress from 'material-ui/CircularProgress';
import FlexCenter from 'components/FlexCenter';

import { makeSelectChatMessageUsers, makeSelectTouchUser, makeSelectLoadingMessageUsers } from './selectors';

export class ChatPanelMessage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    msgCount: 10,
    tel: {
      statusMine: ['请求交换电话已发送', '您同意了手机号的交换请求', '您拒绝了手机号的交换请求'],
      statusTouch: ['我想和您交换联系方式，您是否同意？', '同意了您手机号的交换请求', '拒绝了您手机号的交换请求'],
    },
    yaoyue: {
      statusMine: ['邀约邀请已发送', '您同意了邀约邀请', '您拒绝了邀约邀请', '您取消了邀约邀请'],
      statusTouch: ['向您发起邀约', '同意了您的邀约邀请', '拒绝了您的邀约邀请', '取消了您的邀约邀请'],
    },
  }

  render() {
    const { messageUsers, getTouchUser, getMessageUsers, touchUser, loading } = this.props;
    const { tel, yaoyue } = this.state;

    const listView = messageUsers ? messageUsers.map((user, key) => {
      const { msg } = user;
      const { customize } = msg;
      const { type, status, from } = JSON.parse(customize);
      const itemStyle = {};
      let summary = user.msg.header.summary;

      // reset summary for tel and yaoyue msg
      if (type === 'exchange-tel') {
        summary = from === user.im_account ? tel.statusTouch[status] : tel.statusMine[status];
      } else if (type === 'yaoyue') {
        summary = from === user.im_account ? yaoyue.statusTouch[status] : yaoyue.statusMine[status];
      }

      // set active style for touch user
      if (touchUser && (touchUser.id === user.id)) {
        itemStyle.backgroundColor = 'rgba(0, 0, 0, 0.125)';
      }

      return (
        <ListItem
          key={key}
          leftAvatar={<Avatar src={user.avator} />}
          rightIcon={user.msgCount ?
            <Badge badgeContent={user.msgCount} secondary={true} />
            : null
          }
          primaryText={user.nickname}
          secondaryText={summary}
          style={itemStyle}
          onTouchTap={() => {
            getTouchUser(user.id);
            im.chat.setReadState(user.im_account).then(() => {
              getMessageUsers();
            });
          }}
        />
      );
    }) : null;
    return (
      <List>
        {loading && <FlexCenter>
          <CircularProgress size={24} />
        </FlexCenter>}
        {listView}
      </List>
    );
  }
}

ChatPanelMessage.propTypes = {
  messageUsers: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getTouchUser: PropTypes.func,
  getMessageUsers: PropTypes.func,
  touchUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  messageUsers: makeSelectChatMessageUsers(),
  touchUser: makeSelectTouchUser(),
  loading: makeSelectLoadingMessageUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTouchUser: (id) => dispatch(fetchTouchUser(id)),
    getMessageUsers: () => dispatch(fetchMessageUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelMessage);
