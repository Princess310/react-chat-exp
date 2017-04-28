/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import MessageItem from './MessageItem';
import ShareMoment from './ShareMoment';
import YaoyueItem from './YaoyueItem';
import ChangeTel from './ChangeTel';
import UserCard from './UserCard';
import ShareBusiness from './ShareBusiness';
import CenterBubble from './CenterBubble';
import SoundItem from './SoundItem';
import PictureItem from './PictureItem';
import RevokeItem from './RevokeItem';
import Wrapper from './Wrapper';

class ChatMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      type,
      ...other
    } = this.props;
    let itemView = null;

    switch (type) {
      case 'text':
        itemView = (<MessageItem {...other} />);
        break;
      case 'share_momment':
        itemView = (<ShareMoment {...other} />);
        break;
      case 'share_card':
        itemView = (<UserCard {...other} />);
        break;
      case 'share_business':
        itemView = (<ShareBusiness {...other} />);
        break;
      case 'yaoyue':
        itemView = (<YaoyueItem {...other} />);
        break;
      case 'exchange-tel':
        itemView = (<ChangeTel {...other} />);
        break;
      case 'set_money_envelope':
        itemView = (<CenterBubble>{other.message} (请前往手机APP领取红包)</CenterBubble>);
        break;
      case 'sound':
        itemView = (<SoundItem {...other} />);
        break;
      case 'pic':
        itemView = (<PictureItem {...other} />);
        break;
      case 'revoke':
        itemView = (<RevokeItem {...other} />);
        break;
      default:
        itemView = null;
    }

    return (
      <Wrapper>
        {itemView}
      </Wrapper>
    );
  }
}

ChatMessage.propTypes = {
  type: PropTypes.string,
  avatar: PropTypes.string,
};

export default ChatMessage;
