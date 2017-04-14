/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import FlexColumn from 'components/FlexColumn';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import TimeLine from './TimeLine';
import { ItemWrapper } from './Wrapper';

class MessageItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      avatar,
      value,
      direction,
      msgTime,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <FlexColumn>
        <TimeLine time={msgTime} direction={direction} />
        <ChatBubble direction={direction} >
          <pre dangerouslySetInnerHTML={{ __html: twemoji.parse(value) }} />
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
  }
}

MessageItem.propTypes = {
  avatar: PropTypes.string,
  value: PropTypes.string,
  direction: PropTypes.string,
};

export default MessageItem;
