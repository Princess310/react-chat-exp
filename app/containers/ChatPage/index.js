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

import makeSelectChatPage, { makeSelectCurrentUser, makeSelectTouchUser, makeSelectGroupList, makeSelectContacts } from './selectors';
import Wrapper, { Container } from './Wrapper';
import {
  fetchUser,
  fetchMessageUsers,
  loadChatMessage,
  fetchMessageGroups,
  loadChatGroupMessage,
  fetchUserContacts,
  fetchUserGroups,
} from './actions';

export class ChatPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { currentUser, getUser, getMessageUsers, getMessageGroups, getUserContacts, getUserGroups } = this.props;

    if (!currentUser.id) {
      getUser();
    } else {
      getMessageUsers();
      getMessageGroups();
      getUserContacts();
      getUserGroups();

      // start im listen task
      im.startListenAllMsg();
    }

    this.handleListenMessage();
  }

  handleListenMessage() {
    const { getMessageUsers, setChatMessage, setChatGroupMessage, getMessageGroups } = this.props;

    // single chat
    im.chat.recieveMsg((res) => {
      const { touchUser } = this.props;
      const { data } = res;
      const { msgs } = data;

      for (const msg of msgs) {
        setChatMessage(msg);

        this.handleNotification('chat', msg);
        if (touchUser) {
          im.chat.setReadState(touchUser.im_account).then(() => {
            getMessageUsers();
          });
        }
      }
    });

    // tribe chat
    im.tribe.recieveMsg((res) => {
      const { data } = res;
      const { msgs, touid } = data;

      for (const msg of msgs) {
        msg.tid = touid;

        this.handleNotification('tribe', msg);
        setChatGroupMessage(msg);
        getMessageGroups();
      }
    });
  }

  popNotice(type, title, content, icon) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: content,
        icon,
      });

      notification.onclick = () => {
        notification.close();
        window.focus();
      };
    }
  }

  checkNotice(type, title, content, icon) {
    const self = this;

    if (window.Notification) {
      if (Notification.permission === 'granted') {
        self.popNotice(type, title, content, icon);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(() => {
          self.popNotice(type, title, content, icon);
        });
      }
    }
  }

  handleNotification(type, msgInfo) {
    const self = this;
    const { groupList, contactList } = this.props;
    const { msg } = msgInfo;
    const { header: { summary } } = msg;
    const content = summary;
    let title = '';
    let icon = '';

    if (type === 'tribe') {
      for (const group of groupList) {
        if (group.im_group_id === `${msgInfo.tid}`) {
          title = group.name;
          icon = group.head;

          self.checkNotice(type, title, content, icon);
        }
      }
    } else {
      for (const userList of contactList) {
        const { list } = userList;
        for (const user of list) {
          if (user.im_account === im.getNick(msgInfo.from)) {
            title = user.nickname;
            icon = user.avatar;

            self.checkNotice(type, title, content, icon);
          }
        }
      }
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
  touchUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getUser: PropTypes.func,
  getMessageUsers: PropTypes.func,
  getMessageGroups: PropTypes.func,
  setChatMessage: PropTypes.func,
  setChatGroupMessage: PropTypes.func,
  groupList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  contactList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getUserContacts: PropTypes.func,
  getUserGroups: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ChatPage: makeSelectChatPage(),
  currentUser: makeSelectCurrentUser(),
  touchUser: makeSelectTouchUser(),
  groupList: makeSelectGroupList(),
  contactList: makeSelectContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
    getMessageUsers: () => dispatch(fetchMessageUsers()),
    setChatMessage: (data) => dispatch(loadChatMessage(data)),
    getMessageGroups: () => dispatch(fetchMessageGroups()),
    setChatGroupMessage: (data) => dispatch(loadChatGroupMessage(data)),
    getUserContacts: () => dispatch(fetchUserContacts()),
    getUserGroups: () => dispatch(fetchUserGroups()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
