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
import ChatLoadMore from 'components/ChatLoadMore';
import styled from 'styled-components';

import {
  sendChatMessage,
  fetchMessageList,
  agreeChangeTel,
  disAgreeChangeTel,
  agreeInterview,
  disAgreeInterview,
} from 'containers/ChatPage/actions';

import {
  makeSelectChatMessage,
  makeSelectCurrentUser,
  makeSelectTouchUser,
  makeSelectClearChatMessage,
  makeSelectMessageNextkey,
} from './selectors';

import Wrapper from './Wrapper';

const ContentWrapper = styled.div`
  position: relative;
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
  state = {
    msgCount: 10,
  }

  render() {
    const { messageList, currentUser, touchUser, clearChatMessage } = this.props;
    let userId = '';

    if (currentUser.id) {
      const { chat: { userid } } = currentUser;
      userId = userid;
    }

    const listView = messageList ? messageList.map((msgInfo, index) => {
      const { time } = msgInfo;
      const { customize } = msgInfo.msg;
      const msg = JSON.parse(customize);
      const direction = (userId === im.getNick(msgInfo.from) ? 'right' : 'left');
      const avatar = (userId === im.getNick(msgInfo.from) ? currentUser.avatar : touchUser.avatar);

      return (<ChatMessageItem
        key={index}
        direction={direction}
        avatar={avatar}
        touchUser={touchUser}
        currentUser={currentUser}
        msgTime={time}
        sendChatMessage={(content, summary) => {
          this.props.sendChatMessage(currentUser.im_account, touchUser.im_account, content, summary);
        }}
        agreeChangeTel={() => {
          this.props.doAgreeChangeTel(touchUser.id);
        }}
        disAgreeChangeTel={() => {
          this.props.doDisAgreeChangeTel(touchUser.id);
        }}
        agreeInterview={(id) => {
          this.props.doAgreeInterview(touchUser.id, id);
        }}
        disAgreeInterview={(id) => {
          this.props.doDisAgreeInterview(touchUser.id, id);
        }}
        {...msg}
      />);
    }) : null;

    const contentView = touchUser ?
    (
      <Wrapper>
        <ChatHeader title={touchUser ? touchUser.nickname : ''} />
        <ContentWrapper>
          <ChatLoadMore
            onLoad={() => {
              this.props.getMessageList(touchUser.im_account, this.props.nextKey, this.state.msgCount);
            }}
            visible = { this.props.nextKey !== '' ? true : false }
          />
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
  nextKey: PropTypes.string,
  fetchMessageList: PropTypes.func,
  doAgreeChangeTel: PropTypes.func,
  doDisAgreeChangeTel: PropTypes.func,
  doAgreeInterview: PropTypes.func,
  doDisAgreeInterview: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  messageList: makeSelectChatMessage(),
  currentUser: makeSelectCurrentUser(),
  touchUser: makeSelectTouchUser(),
  clearChatMessage: makeSelectClearChatMessage(),
  nextKey: makeSelectMessageNextkey(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendChatMessage: (userid, touid, content, summary) => dispatch(sendChatMessage(userid, touid, content, summary)),
    getMessageList: (touid, nextkey, count) => dispatch(fetchMessageList(touid, nextkey, count)),
    doAgreeChangeTel: (uid) => dispatch(agreeChangeTel(uid)),
    doDisAgreeChangeTel: (uid) => dispatch(disAgreeChangeTel(uid)),
    doAgreeInterview: (uid, id) => dispatch(agreeInterview(uid, id)),
    doDisAgreeInterview: (uid, id) => dispatch(disAgreeInterview(uid, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
