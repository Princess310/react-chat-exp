/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { createChildFragment } from 'utils/childUtils';
import FlexColumn from 'components/FlexColumn';
import FlexRow from 'components/FlexRow';
import autoprefixer from 'utils/autoprefixer';
import pallete from 'styles/colors';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import CenterBubble from './CenterBubble';
import TimeLine from './TimeLine';
import ActionFooter from './ActionFooter';
import { ItemWrapper } from './Wrapper';

const SectionWrapper = styled.div`
  display: inline-block;
  margin-left: 8px;
  max-width: 200px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  color: ${pallete.text.help};
`;

class YaoyueItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    statusMine: ['邀约邀请已发送', '您同意了邀约邀请', '您拒绝了邀约邀请', '您取消了邀约邀请'],
    statusTouch: ['向您发起邀约', '同意了您的邀约邀请', '拒绝了您的邀约邀请', '取消了您的邀约邀请'],
  }

  handleSave = () => {
    const { id, address, date, remark, agreeInterview, currentUser, sendChatMessage } = this.props;

    const summary = this.state.statusTouch[1];
    const content = {
      type: 'yaoyue',
      status: '1',
      address,
      date,
      remark,
      from: currentUser.im_account,
    };

    sendChatMessage(content, summary);
    agreeInterview(id);
  }

  handleCancel = () => {
    const { id, address, date, remark, disAgreeInterview, currentUser, sendChatMessage } = this.props;

    const summary = this.state.statusTouch[1];
    const content = {
      type: 'yaoyue',
      status: '2',
      address,
      date,
      remark,
      from: currentUser.im_account,
    };

    sendChatMessage(content, summary);
    disAgreeInterview(id);
  }

  render() {
    const {
      direction,
      avatar,
      status,
      address,
      date,
      remark,
      touchUser,
      msgTime,
    } = this.props;

    const title = direction === 'left' ?
      (touchUser.nickname + this.state.statusTouch[status])
      : (this.state.statusMine[status]);

    if (status === '0') {
      const avatarElement = (<Avatar src={avatar} />);
      const ChatBubbleElement = (
        <FlexColumn>
          <TimeLine time={msgTime} direction={direction} />
          <ChatBubble direction={direction} >
            <FlexColumn>
              <header>{title}</header>
              <FlexRow>
                <span>面谈地点</span>
                <SectionWrapper>{address}</SectionWrapper>
                <span className="mdi mdi-map-marker" style={{ color: pallete.theme }} />
              </FlexRow>
              <FlexRow>
                <span>面谈时间</span>
                <SectionWrapper>{date}</SectionWrapper>
              </FlexRow>
              <FlexRow>
                <span>面谈事项</span>
                <SectionWrapper>{remark}</SectionWrapper>
              </FlexRow>
              {direction === 'left' && <ActionFooter
                saveText="同意"
                cancelText="忽略"
                onSave={this.handleSave}
                onCancel={this.handleCancel}
              />}
            </FlexColumn>
          </ChatBubble>
        </FlexColumn>
      );
      const justify = direction === 'left' ? 'flex-start' : 'flex-end';

      const chatFragment = direction === 'left' ?
      {
        avatarElement,
        ChatBubbleElement,
      } :
      {
        ChatBubbleElement,
        avatarElement,
      };

      const chatElement = createChildFragment(chatFragment);
      const inlineStyle = autoprefixer({ justifyContent: justify });

      return (
        <ItemWrapper style={inlineStyle}>
          {chatElement}
        </ItemWrapper>
      );
    } else {
      return (
        <FlexColumn>
          <TimeLine time={msgTime} direction='center' />
          <CenterBubble>
            {title}
          </CenterBubble>
        </FlexColumn>
      )
    }
  }
}

YaoyueItem.propTypes = {
  id: PropTypes.string,
  direction: PropTypes.string,
  avatar: PropTypes.string,
  status: PropTypes.string,
  address: PropTypes.string,
  date: PropTypes.string,
  remark: PropTypes.string,
  touchUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default YaoyueItem;
