/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import FlexColumn from 'components/FlexColumn';
import autoprefixer from 'utils/autoprefixer';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import ActionFooter from './ActionFooter';
import CenterBubble from './CenterBubble';
import TimeLine from './TimeLine';
import CenterIconBubble from './CenterIconBubble';
import { ItemWrapper } from './Wrapper';

class ChangeTel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    statusMine: ['请求交换电话已发送', '您同意了手机号的交换请求', '您拒绝了手机号的交换请求'],
    statusTouch: ['我想和您交换联系方式，您是否同意？', '同意了您手机号的交换请求', '拒绝了您手机号的交换请求'],
  }

  handleCancel = () => {
    const { sendChatMessage, disAgreeChangeTel, currentUser } = this.props;

    const summary = this.state.statusTouch[1];
    const content = {
      type: 'exchange-tel',
      status: '2',
      from: currentUser.im_account,
    };

    sendChatMessage(content, summary);
    disAgreeChangeTel();
  }

  handleSave = () => {
    const { sendChatMessage, agreeChangeTel, currentUser } = this.props;

    const summary = this.state.statusTouch[1];
    const content = {
      type: 'exchange-tel',
      status: '1',
      from: currentUser.im_account,
    };

    sendChatMessage(content, summary);
    agreeChangeTel();
  }

  render() {
    const {
      avatar,
      direction,
      status,
      touchUser,
      msgTime,
    } = this.props;

    const title = direction === 'left' ?
      (this.state.statusTouch[status])
      : (this.state.statusMine[status]);

    if (status === '0' && direction === 'left') {
      const avatarElement = (<Avatar src={avatar} />);
      const ChatBubbleElement = (
        <FlexColumn>
          <TimeLine time={msgTime} direction={direction} />
          <ChatBubble direction={direction} >
            <FlexColumn>
              <header>{title}</header>
              <ActionFooter
                saveText="同意"
                cancelText="取消"
                onSave={this.handleSave}
                onCancel={this.handleCancel}
              />
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
      const inlineStyle = autoprefixer({
        justifyContent: justify,
      });

      return (
        <ItemWrapper style={inlineStyle}>
          {chatElement}
        </ItemWrapper>
      );
    } else if (status === '1') {
      return (
        <FlexColumn>
          <TimeLine time={msgTime} direction="center" />
          <CenterIconBubble
            iconClassName="mdi mdi-cellphone-iphone"
          >
            {`${touchUser.nickname}的手机号 ${touchUser.mobile}`}
          </CenterIconBubble>
        </FlexColumn>
      );
    }

    return (
      <FlexColumn>
        <TimeLine time={msgTime} direction="center" />
        <CenterBubble>
          {title}
        </CenterBubble>
      </FlexColumn>
    );
  }
}

ChangeTel.propTypes = {
  avatar: PropTypes.string,
  direction: PropTypes.string,
  status: PropTypes.string,
  sendChatMessage: PropTypes.func,
  disAgreeChangeTel: PropTypes.func,
  agreeChangeTel: PropTypes.func,
  currentUser: PropTypes.object,
  touchUser: PropTypes.object,
  msgTime: PropTypes.number,
};

export default ChangeTel;
