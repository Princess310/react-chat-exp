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
import { ItemWrapper } from './Wrapper';

class ChangeTel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    statusMine: ['请求交换电话已发送', '您同意了手机号的交换请求', '您拒绝了手机号的交换请求'],
    statusTouch: ['我想和您交换联系方式，您是否同意？', '同意了您手机号的交换请求', '拒绝了您手机号的交换请求'],
  }

  render() {
    const {
      avatar,
      direction,
      status,
    } = this.props;

    const title = direction === 'left' ?
      (this.state.statusTouch[status])
      : (this.state.statusMine[status]);

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <ChatBubble direction={direction} >
        <FlexColumn>
          <header>{title}</header>
          <ActionFooter
            saveText="同意"
            cancelText="取消"
          />
        </FlexColumn>
      </ChatBubble>
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
      width: '120px',
    });

    return (
      <ItemWrapper style={inlineStyle}>
        {chatElement}
      </ItemWrapper>
    );
  }
}

ChangeTel.propTypes = {
  avatar: PropTypes.string,
  direction: PropTypes.string,
  status: PropTypes.string,
};

export default ChangeTel;
