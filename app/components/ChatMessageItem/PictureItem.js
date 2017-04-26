/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';

import FlexColumn from 'components/FlexColumn';
import Avatar from 'material-ui/Avatar';
import ChatBubble from './ChatBubble';
import TimeLine from './TimeLine';
import { ItemWrapper } from './Wrapper';

class PictureItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    maxLenth: 200,
  }

  handleView = (e) => {
    e.preventDefault();
    const eTarget = e.target || e.srcElement;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const { width, height } = this.props;

    const items = [
      {
        src: eTarget.src,
        w: width,
        h: height,
        el: eTarget,
      },
    ];

    const options = {
      index: 0,
      shareEl: false,
      bgOpacity: 0.5,
      getThumbBoundsFn: () => {
        const thumbnail = eTarget;
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width,
        };
      },
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIdefault, items, options);
    gallery.init();
  }

  render() {
    const {
      avatar,
      url,
      direction,
      msgTime,
      name,
      role,
      width,
      height,
    } = this.props;
    const { maxLenth } = this.state;

    const styleWidth = {
      maxWidth: maxLenth,
      height: 'auto',
    };

    const styleHeight = {
      maxHeight: maxLenth,
      width: 'auto',
    };

    const imgStyle = Number(width) > Number(height) ? styleWidth : styleHeight;

    const avatarElement = (<Avatar src={avatar} />);
    const justify = direction === 'left' ? 'flex-start' : 'flex-end';
    const alignStyle = autoprefixer({ alignItems: justify });
    const inlineStyle = autoprefixer({ justifyContent: justify });
    const ChatBubbleElement = (
      <FlexColumn style={alignStyle}>
        <TimeLine time={msgTime} direction={direction} name={name} role={role} />
        <ChatBubble direction={direction}>
          <img src={url} role="presentation" style={imgStyle} onTouchTap={this.handleView} />
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

PictureItem.propTypes = {
  avatar: PropTypes.string,
  url: PropTypes.string,
  direction: PropTypes.string,
  msgTime: PropTypes.number,
  name: PropTypes.number,
  role: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default PictureItem;
