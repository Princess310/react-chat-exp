/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';
import pallete from 'styles/colors';

import ChatHeader from 'components/ChatHeader';
import ChatMessageItem from 'components/ChatMessageItem';
import ChatTool from 'components/ChatTool';
import ChatLoadMore from 'components/ChatLoadMore';
import styled from 'styled-components';
import { Base64 } from 'js-base64';
import CircularProgress from 'material-ui/CircularProgress';
import FlexCenter from 'components/FlexCenter';

import {
  fetchGroupMessageList,
  sendChatGroupMessage,
} from 'containers/ChatPage/actions';

import {
  makeSelectChatGroupMessageList,
  makeSelectCurrentUser,
  makeSelectTouchGroup,
  makeSelectClearChatMessage,
  makeSelectGroupNextkey,
  makeSelectLoadingGroupMessageList,
} from './selectors';

import messages from './messages';
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

const BlackChatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${pallete.text.help};
`;

export class ChatGroupMessage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    msgCount: 10,
  }

  render() {
    const { messageList, currentUser, touchGroup, clearChatMessage, loadingList } = this.props;
    let userId = '';

    if (currentUser.id) {
      const { chat: { userid } } = currentUser;
      userId = userid;
    }

    const listView = messageList ? messageList.map((msgInfo, index) => {
      const { time } = msgInfo;
      const { customize, header: { summary } } = msgInfo.msg;
      const msg = JSON.parse(customize);
      const direction = (userId === im.getNick(msgInfo.from) ? 'right' : 'left');
      const avatar = msg.head;

      // base 64 decode
      if (msg.type === 'text') {
        msg.value = Base64.decode(msg.value);
      }

      return (<ChatMessageItem
        key={index}
        direction={direction}
        avatar={avatar}
        touchGroup={touchGroup}
        currentUser={currentUser}
        msgTime={time}
        summary={summary}
        {...msg}
      />);
    }) : null;

    const loadElement = loadingList ?
    (
      <FlexCenter>
        <CircularProgress size={24} />
      </FlexCenter>
    ) : (
      <ChatLoadMore
        onLoad={() => {
          this.props.getMessageList(touchGroup.tid, this.props.nextKey, this.state.msgCount);
        }}
        visible={(this.props.nextKey && this.props.nextKey !== '') ? true : false}
      />
    );

    const contentView = touchGroup ?
    (
      <Wrapper>
        <ChatHeader title={touchGroup ? touchGroup.name : ''} />
        <ContentWrapper>
          {loadElement}
          {listView}
        </ContentWrapper>
        <ChatWrapper>
          <ChatTool
            clearMessage={clearChatMessage}
            sendChatMessage={(content, summary) => {
              content.value = Base64.encode(content.value);
              content.name = currentUser.nickname;
              content.head = currentUser.avatar;
              content.role = touchGroup.role;
              this.props.sendChatMessage(currentUser.im_account, touchGroup.tid, content, summary);
            }}
            currentUser={touchGroup}
          />
        </ChatWrapper>
      </Wrapper>
    ) : (
      <BlackChatWrapper>
        <FormattedMessage {...messages.noSelectChat} />
      </BlackChatWrapper>
    );

    return contentView;
  }
}

ChatGroupMessage.propTypes = {
  messageList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  currentUser: PropTypes.object,
  touchGroup: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  sendChatMessage: PropTypes.func,
  clearChatMessage: PropTypes.bool,
  nextKey: PropTypes.string,
  getMessageList: PropTypes.func,
  loadingList: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  messageList: makeSelectChatGroupMessageList(),
  currentUser: makeSelectCurrentUser(),
  touchGroup: makeSelectTouchGroup(),
  clearChatMessage: makeSelectClearChatMessage(),
  nextKey: makeSelectGroupNextkey(),
  loadingList: makeSelectLoadingGroupMessageList(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendChatMessage: (userid, tid, content, summary) => dispatch(sendChatGroupMessage(userid, tid, content, summary)),
    getMessageList: (touid, nextkey, count) => dispatch(fetchGroupMessageList(touid, nextkey, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroupMessage);
