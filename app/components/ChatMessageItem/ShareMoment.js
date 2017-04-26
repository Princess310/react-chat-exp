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
import request from 'utils/request';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import ChatBubble from './ChatBubble';
import TimeLine from './TimeLine';
import { ItemWrapper, TouchWrapper } from './Wrapper';

class ShareMoment extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    openDialog: false,
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
    });
  }

  render() {
    const {
      direction,
      avatar,
      title,
      content,
      pic,
      msgTime,
      id,
      name,
      role,
    } = this.props;

    const avatarElement = (<Avatar src={avatar} />);
    const ChatBubbleElement = (
      <div>
        <FlexColumn>
          <TimeLine time={msgTime} direction={direction} name={name} role={role} />
          <TouchWrapper onClick={this.handleOpenDialog}>
            <ChatBubble direction={direction} >
              <FlexColumn>
                <header>{title}</header>
                <FlexRow>
                  {pic && pic !== '' ? <img src={pic} role="presentation" style={{ width: '56px', height: '56px' }} /> : null}
                  <section style={{ marginLeft: '8px', maxWidth: '280px', height: '48px', overflowY: 'hidden', color: pallete.text.help }}>{content}</section>
                </FlexRow>
              </FlexColumn>
            </ChatBubble>
          </TouchWrapper>
        </FlexColumn>
        <Dialog
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
          bodyStyle={{ padding: 0 }}
        >
          <iframe src={`${request.getWebRoot()}/public_share.html?type=momment&id=${id}`} width="100%" height="640"></iframe>
        </Dialog>
      </div>
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
  msgTime: PropTypes.number,
  name: PropTypes.string,
  role: PropTypes.string,
  id: PropTypes.string,
};

export default ShareMoment;
