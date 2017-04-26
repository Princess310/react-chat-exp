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
      name,
      role,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const justify = direction === 'left' ? 'flex-start' : 'flex-end';
    const alignStyle = autoprefixer({ alignItems: justify });
    const inlineStyle = autoprefixer({ justifyContent: justify });
    const ChatBubbleElement = (
      <FlexColumn style={alignStyle}>
        <TimeLine time={msgTime} direction={direction} name={name} role={role} />
        <ChatBubble direction={direction} >
          <pre dangerouslySetInnerHTML={{ __html: twemoji.parse(value) }} />
        </ChatBubble>
      </FlexColumn>
    );

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
