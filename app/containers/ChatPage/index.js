/*
 *
 * ChatPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import im from 'utils/im';

import ChatPanel from 'containers/ChatPanel';
import ChatContent from 'containers/ChatContent';

import makeSelectChatPage, { makeSelectCurrentUser, makeSelectTouchUser } from './selectors';
import Wrapper, { Container } from './Wrapper';
import { fetchUser, fetchMessageUsers, loadChatMessage } from './actions';

export class ChatPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { currentUser, getUser, getMessageUsers } = this.props;

    if (!currentUser.id) {
      getUser();
    } else {
      getMessageUsers();
    }

    this.handleListenMessage();
  }

  handleListenMessage() {
    const { getMessageUsers, setChatMessage } = this.props;
    im.chat.recieveMsg((res) => {
      const { touchUser } = this.props;
      const { data } = res;
      const { msgs } = data;

      for (const msg of msgs) {
        setChatMessage(msg);

        im.chat.setReadState(touchUser.im_account).then(() => {
          getMessageUsers();
        });
      }
    });
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
  touchUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getUser: PropTypes.func,
  getMessageUsers: PropTypes.func,
  loadChatMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ChatPage: makeSelectChatPage(),
  currentUser: makeSelectCurrentUser(),
  touchUser: makeSelectTouchUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
    getMessageUsers: () => dispatch(fetchMessageUsers()),
    setChatMessage: (data) => dispatch(loadChatMessage(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
