/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchMessageList } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';

import { makeSelectChatMessageUsers } from './selectors';

export class ChatMessage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    msgCount: 10,
  }

  render() {
    const { messageUsers, getMessageList } = this.props;
    const { msgCount } = this.state;

    const listView = messageUsers.map((user, key) => (
      <ListItem
        key={key}
        leftAvatar={<Avatar src={user.avator} />}
        rightIcon={user.msgCount ?
          <Badge badgeContent={user.msgCount} secondary={true} />
          : null
        }
        primaryText={user.nickname}
        secondaryText={user.msg.header.summary}
        onTouchTap={() => { getMessageList(user.uid, '', msgCount); }}
      />
    ));
    return (
      <List>
        {listView}
      </List>
    );
  }
}

ChatMessage.propTypes = {
  messageUsers: PropTypes.array,
  getMessageList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  messageUsers: makeSelectChatMessageUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMessageList: (touid, nextkey, count) => dispatch(fetchMessageList(touid, nextkey, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
