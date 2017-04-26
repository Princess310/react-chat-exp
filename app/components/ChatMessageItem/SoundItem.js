/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';
import pallete from 'styles/colors';
import FlexColumn from 'components/FlexColumn';

import playImg from 'assets/sound.gif';
import staticImg from 'assets/sound.png';

import Avatar from 'material-ui/Avatar';
import TimeLine from './TimeLine';
import ChatBubble from './ChatBubble';
import { ItemWrapper, TouchWrapper } from './Wrapper';


class SoundItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    img: staticImg,
  }

  handlePlay = () => {
    const audio = this.audio;
    const timeElement = this.time;
    let { time } = this.props;

    if (audio.paused) {
      audio.play();

      this.setState({
        img: playImg,
      });

      this.timer = setInterval(() => {
        timeElement.innerHTML = `${time -= 1}"`;
      }, 1000);
    } else {
      audio.pause();

      this.setState({
        img: staticImg,
      });
    }
  }

  handleEnded = () => {
    const audio = this.audio;
    const timeElement = this.time;
    const { time } = this.props;

    // clear tmer first
    clearInterval(this.timer);
    audio.pause();
    timeElement.innerHTML = `${time}"`;

    this.setState({
      img: staticImg,
    });
  }

  render() {
    const {
      avatar,
      direction,
      url,
      time,
      name,
      msgTime,
      role,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <div>
        <FlexColumn>
          <TimeLine time={msgTime} direction={direction} name={name} role={role} />
          <TouchWrapper onClick={this.handlePlay}>
            <ChatBubble direction={direction} >
              <audio src={url} ref={(r) => { this.audio = r; }} onEnded={this.handleEnded} />
              <img src={this.state.img} role="presentation" ref={(r) => { this.img = r; }} style={{ width: 'auto', height: '24px' }} />
            </ChatBubble>
          </TouchWrapper>
        </FlexColumn>
      </div>
    );
    const timeElement = (<span ref={(r) => { this.time = r; }} style={{ color: pallete.text.help }} >{time}{'"'}</span>);
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
  time: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  msgTime: PropTypes.number,
  role: PropTypes.string,
};

export default SoundItem;
