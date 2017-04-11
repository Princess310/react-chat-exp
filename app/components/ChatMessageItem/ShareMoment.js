/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import FlexColumn from 'components/FlexColumn';
import FlexRow from 'components/FlexRow';
import autoprefixer from 'utils/autoprefixer';
import pallete from 'styles/colors';

import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import { ItemWrapper } from './Wrapper';

class ShareMoment extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      direction,
      avatar,
      title,
      content,
      pic,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <ChatBubble direction={direction} >
        <FlexColumn>
          <header>{title}</header>
          <FlexRow>
            {pic && pic !== '' ? <img src={pic} role="presentation" style={{ width: '56px', height: '56px' }} /> : null}
            <section style={{ marginLeft: '8px', maxWidth: '280px', height: '48px', overflowY: 'hidden', color: pallete.text.help }}>{content}</section>
          </FlexRow>
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
    const inlineStyle = autoprefixer({ justifyContent: justify });

    return (
      <ItemWrapper style={inlineStyle}>
        {chatElement}
      </ItemWrapper>
    );
  }
}

ShareMoment.propTypes = {
  direction: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  pic: PropTypes.string,
};

export default ShareMoment;
