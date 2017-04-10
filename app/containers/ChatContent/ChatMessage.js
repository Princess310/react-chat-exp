/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import { makeSelectChatMessage, makeSelectCurrentUser } from './selectors';

import Wrapper from './Wrapper';

export class ChatContent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { messageList, currentUser } = this.props;
    const { chat: { userid } } = currentUser;
    console.log('messageList', userid);

    const listView = messageList.map((msgInfo, index) => {
      const { customize } = msgInfo.msg;
      const msg = JSON.parse(customize);

      if (userid === im.getNick(msgInfo.from)) {
        return (
          <Chip key={index}>{msg.value}</Chip>
        )
      }else {
        return (
          <Chip key={index}>{msg.value}</Chip>
        )
      }
    });

    return (
      <Wrapper>
        {listView}
      </Wrapper>
    );
  }
}

ChatContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messageList: makeSelectChatMessage(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
