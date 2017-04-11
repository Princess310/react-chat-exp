/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';
import pallete from 'styles/colors';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import { ItemWrapper } from './Wrapper';

class SoundItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      avatar,
      direction,
      url,
      time,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <ChatBubble direction={direction} >
        <audio src={url} />
        Sound
      </ChatBubble>
    );
    const timeElement = (<span style={{ color: pallete.text.help }}>{time}{'"'}</span>);
    const justify = direction === 'left' ? 'flex-start' : 'flex-end';

    const chatFragment = direction === 'left' ?
    {
      avatarElement,
      ChatBubbleElement,
      timeElement,
    } :
    {
      timeElement,
      ChatBubbleElement,
      avatarElement,
    };

    const chatElement = createChildFragment(chatFragment);
    const inlineStyle = autoprefixer({ justifyContent: justify, alignItems: 'center' });
    return (
      <ItemWrapper style={inlineStyle}>
        {chatElement}
      </ItemWrapper>
    );
  }
}

SoundItem.propTypes = {
  avatar: PropTypes.string,
  direction: PropTypes.string,
  url: PropTypes.string,
  time: PropTypes.string,
};

export default SoundItem;
