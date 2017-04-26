/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadUserContact } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import FlexCenter from 'components/FlexCenter';

import { makeSelectChatContacts, makeSelectLoadingUserContacts } from './selectors';

export class ChatPanelContacts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { contactList, loadContact, loading } = this.props;
    const listView = contactList ? contactList.map((contacts, index) => {
      const { name, list } = contacts;
      let users = [];

      list.map((contact, i) => {
        const { nickname, avatar } = contact;
        users.push((
          <ListItem
            key={i}
            primaryText={nickname}
            leftIcon={<Avatar src={avatar} />}
            onTouchTap={() => {loadContact(contact)}}
          />
        ));
      });

      return (
        <ListItem
          key={index}
          primaryText={name}
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={users}
        />
      );
    }) : null;

    return (
      <list>
        {loading && <FlexCenter>
          <CircularProgress size={24} />
        </FlexCenter>}
        {listView}
      </list>
    );
  }
}

ChatPanelContacts.propTypes = {
  contactList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadContact: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  contactList: makeSelectChatContacts(),
  loading: makeSelectLoadingUserContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadContact: (data) => dispatch(loadUserContact(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelContacts);
