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
import ChatTool from 'components/ChatTool';
import styled from 'styled-components';

import { sendChatMessage } from 'containers/ChatPage/actions';

import {
  makeSelectChatMessage,
  makeSelectCurrentUser,
  makeSelectTouchUser,
  makeSelectClearChatMessage,
} from './selectors';

import Wrapper from './Wrapper';

const ContentWrapper = styled.div`
  padding: 15px;
  width: 100%;
  height: 440px;
  overflow-y: scroll;
  background-color: ${pallete.background.light}
`;

const ChatWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 152px;
`;

export class ChatMessage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { messageList, currentUser, touchUser, clearChatMessage } = this.props;
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

    const contentView = touchUser ?
    (
      <Wrapper>
        <ChatHeader title={touchUser ? touchUser.nickname : ''} />
        <ContentWrapper>
          {listView}
        </ContentWrapper>
        <ChatWrapper>
          <ChatTool
            clearMessage={clearChatMessage}
            sendChatMessage={(content, summary) => {
              this.props.sendChatMessage(currentUser.im_account, touchUser.im_account, content, summary);
            }}
            currentUser={currentUser}
          />
        </ChatWrapper>
      </Wrapper>
    ) : null;

    return contentView;
  }
}

ChatMessage.propTypes = {
  messageList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  currentUser: PropTypes.object,
  touchUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  sendChatMessage: PropTypes.func,
  clearChatMessage: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  messageList: makeSelectChatMessage(),
  currentUser: makeSelectCurrentUser(),
  touchUser: makeSelectTouchUser(),
  clearChatMessage: makeSelectClearChatMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendChatMessage: (userid, touid, content, summary) => dispatch(sendChatMessage(userid, touid, content, summary)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
