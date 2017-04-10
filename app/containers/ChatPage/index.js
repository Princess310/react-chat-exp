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
import { fetchUser, fetchMessageUsers } from './actions';

export class ChatPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { currentUser, getUser, getMessageUsers } = this.props;

    if (!currentUser.id) {
      getUser();
    } else {
      getMessageUsers();
    }
  }

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
  currentUser: PropTypes.object,
  getUser: PropTypes.func,
  getMessageUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ChatPage: makeSelectChatPage(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
    getMessageUsers: () => dispatch(fetchMessageUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
