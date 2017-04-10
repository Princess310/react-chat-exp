/*
 *
 * ChatContent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectChatTab } from './selectors';

import Wrapper from './Wrapper';
import ChatMessage from './ChatMessage';
import ChatBusiness from './ChatBusiness';
import ChatContact from './ChatContact';

export class ChatContent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { chatTab } = this.props;
    let chatView = null;

    switch (chatTab) {
      case 'message':
        chatView = (
          <ChatMessage />
        );
        break;
      case 'business':
        chatView = (
          <ChatBusiness />
        );
        break;
      case 'contact':
        chatView = (
          <ChatContact />
        );
        break;
      default:
        chatView = (
          <ChatMessage />
        );
    }

    return (
      <Wrapper>
        {chatView}
      </Wrapper>
    );
  }
}

ChatContent.propTypes = {
  chatTab: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chatTab: makeSelectChatTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
