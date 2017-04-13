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
  }

  render() {
    const { messageUsers, getMessageList, getTouchUser, getMessageUsers } = this.props;
    const { msgCount } = this.state;

    const listView = messageUsers ? messageUsers.map((user, key) => (
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
    )) : null;
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
