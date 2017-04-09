/*
 *
 * ChatPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import ChatPanel from 'containers/ChatPanel';
import ChatContent from 'containers/ChatContent';

import makeSelectChatPage, { makeSelectCurrentUser } from './selectors';
import Wrapper, { Container } from './Wrapper';

export class ChatPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <Helmet
          title="ChatPage"
          meta={[
            { name: 'description', content: 'Description of ChatPage' },
          ]}
        />
        <Wrapper>
          <ChatPanel />
          <ChatContent />
        </Wrapper>
      </Container>
    );
  }
}

ChatPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ChatPage: makeSelectChatPage(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
