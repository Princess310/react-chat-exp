/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';
import { fetchMessageList, fetchTouchUser, fetchMessageUsers } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';

import { makeSelectChatMessageUsers } from './selectors';

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
    }
  }

  render() {
    const { messageUsers, getMessageList, getTouchUser, getMessageUsers } = this.props;
    const { msgCount, tel, yaoyue } = this.state;

    const listView = messageUsers ? messageUsers.map((user, key) => {
      const { msg } = user;
      const { customize } = msg;
      const { type, status, from } = JSON.parse(customize);
      let summary = user.msg.header.summary;

      // reset summary for tel and yaoyue msg
      if (type === 'exchange-tel') {
        summary = from === user.im_account ? tel.statusTouch[status] : tel.statusTouch[statusMine]
      } else if (type === 'yaoyue') {
        summary = from === user.im_account ? yaoyue.statusTouch[status] : yaoyue.statusTouch[statusMine]
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
          secondaryText={user.msg.header.summary}
          onTouchTap={() => {
            getTouchUser(user.id);
            getMessageList(user.uid, '', msgCount);

            im.chat.setReadState(user.im_account).then(() => {
              getMessageUsers();
            });
          }}
        />
      )
    }) : null;
    return (
      <List>
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
  getMessageList: PropTypes.func,
  getTouchUser: PropTypes.func,
  getMessageUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  messageUsers: makeSelectChatMessageUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMessageList: (touid, nextkey, count) => dispatch(fetchMessageList(touid, nextkey, count)),
    getTouchUser: (id) => dispatch(fetchTouchUser(id)),
    getMessageUsers: () => dispatch(fetchMessageUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelMessage);
