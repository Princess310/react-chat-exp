/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import { ItemWrapper } from './Wrapper';

class PictureItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      avatar,
      url,
      direction,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <ChatBubble direction={direction} >
        <img src={url} role="presentation" style={{ width: '200px', height: '200px' }} />
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
    const inlineStyle = autoprefixer({ justifyContent: justify });
    return (
      <ItemWrapper style={inlineStyle}>
        {chatElement}
      </ItemWrapper>
    );
  }
}

PictureItem.propTypes = {
  avatar: PropTypes.string,
  url: PropTypes.string,
  direction: PropTypes.string,
};

export default PictureItem;
