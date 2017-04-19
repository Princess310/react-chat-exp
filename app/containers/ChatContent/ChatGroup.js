/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexRow from 'components/FlexRow';
import ChatHeader from 'components/ChatHeader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import QRCode from 'qrcode.react';
import request from 'utils/request';

import Wrapper from './Wrapper';

import {
  makeSelectChatGroup,
} from './selectors';

import {
  loadTouchGroup,
  loadMessageGroup,
  fetchGroupMessageList,
  chageTab,
} from 'containers/ChatPage/actions';

const ContentWrapper = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BlackChatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${pallete.text.help};
`;

export class ChatGroup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    msgCount: 10
  }

  render() {
    const { group, loadMessageGroup, loadGroup, getMessageList, chageTab } = this.props;
    const url = request.getWebRoot();
    const qrcodeUrl = `${url}index.html#groupEdit!id=${group.id}`;
    const { msgCount } = this.state;

    const contentView = group ?
    (
      <Wrapper>
        <ChatHeader title='群信息' />
        <ContentWrapper>
          <FlexRow style={{ position: 'relative', marginTop: '15px' }}>
            <QRCode size={240} value={qrcodeUrl} />
            <Avatar src={group.head} size={56} style={{ position: 'absolute', top: 97, left: 97 }} />
          </FlexRow>
          <FlexRow style={{ marginTop: '15px', fontSize: 20 }}>
            <span>{group.name}</span>
          </FlexRow>
          <RaisedButton
            label="发消息"
            primary={true}
            style={{ marginTop: '40px' }}
            onTouchTap={() => {
              group.tid = group.im_group_id;
              loadMessageGroup(group);
              loadGroup(group);
              getMessageList(group.im_group_id, '', msgCount);
              chageTab('group');
            }}
          />
        </ContentWrapper>
      </Wrapper>
    ) : (
      <BlackChatWrapper>
        未选择群
      </BlackChatWrapper>
    );

    return (
      <Wrapper>
        {contentView}
      </Wrapper>
    );
  }
}

ChatGroup.propTypes = {
  group: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getMessageList: PropTypes.func,
  loadGroup: PropTypes.func,
  loadMessageGroup: PropTypes.func,
  chageTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  group: makeSelectChatGroup(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMessageList: (tid, nextkey, count) => dispatch(fetchGroupMessageList(tid, nextkey, count)),
    loadMessageGroup: (data) => dispatch(loadMessageGroup(data)),
    loadGroup: (data) => dispatch(loadTouchGroup(data)),
    chageTab: (tab) => dispatch(chageTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
