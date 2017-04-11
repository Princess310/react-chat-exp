/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';
import pallete from 'styles/colors';

import ChatHeader from 'components/ChatHeader';
import ChatMessageItem from 'components/ChatMessageItem';
import Chip from 'material-ui/Chip';
import styled from 'styled-components';

import {
  makeSelectChatMessage,
  makeSelectCurrentUser,
  makeSelectTouchUser,
} from './selectors';

import Wrapper from './Wrapper';

const ContentWrapper = styled.div`
  padding: 15px;
  width: 100%;
  height: 440px;
  overflow-y: scroll;
  background-color: ${pallete.background.light}
`;

export class ChatMessage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { messageList, currentUser, touchUser } = this.props;
    let userId = '';

    if (currentUser.id) {
      const { chat: { userid } } = currentUser;
      userId = userid;
    }

    const listView = messageList ? messageList.map((msgInfo, index) => {
      const { customize } = msgInfo.msg;
      const msg = JSON.parse(customize);
      const direction = (userId === im.getNick(msgInfo.from) ? 'right' : 'left');
      const avatar = (userId === im.getNick(msgInfo.from) ? currentUser.avatar : touchUser.avatar);

      return (<ChatMessageItem
        key={index}
        direction={direction}
        avatar={avatar}
        touchUser={touchUser}
        {...msg}
      />);
    }) : null;

    return (
      <Wrapper>
        <ChatHeader title={touchUser ? touchUser.nickname : ''} />
        <ContentWrapper>
          {listView}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

ChatMessage.propTypes = {
  messageList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  messageList: makeSelectChatMessage(),
  currentUser: makeSelectCurrentUser(),
  touchUser: makeSelectTouchUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
