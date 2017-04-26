import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {
  loadSearchFilter,
  fetchTouchUser,
  loadMessageUser,
  loadTouchGroup,
  loadMessageGroup,
  fetchGroupMessageList,
  chageTab,
} from 'containers/ChatPage/actions';

import { makeSelectFilterContacts, makeSelectFilterGroups } from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  padding: 0 15px;
`;

class ChatPanelSearch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    openPopup: false,
    value: '',
  }

  handleChange = (e) => {
    const { setFilter } = this.props;
    const value = e.target.value;

    this.setState({
      value,
      anchorEl: e.currentTarget,
    });

    if (value.trim() !== '') {
      this.setState({
        openPopup: true,
      });
    } else {
      this.setState({
        openPopup: false,
      });
    }

    setFilter(value);
  }

  handleRequestClose = () => {
    this.setState({
      openPopup: false,
    });
  }

  render() {
    const {
      contacts,
      groups,
      loadUser,
      getTouchUser,
      getMessageGroup,
      loadGroup,
      getMessageList,
      chageTabName,
    } = this.props;
    const { value } = this.state;
    const contactListView = contacts.map((contact, index) => (
      <ListItem
        key={index}
        leftAvatar={<Avatar src={contact.avatar} />}
        primaryText={contact.nickname}
        onTouchTap={() => {
          loadUser(contact);
          getTouchUser(contact.id);
          chageTabName('message');
          this.setState({
            openPopup: false,
            value: '',
          });
        }}
      />
    ));

    const groupListView = groups.map((group, index) => (
      <ListItem
        key={index}
        leftAvatar={<Avatar src={group.head} />}
        primaryText={group.name}
        onTouchTap={() => {
          group.tid = group.im_group_id;
          getMessageGroup(group);
          loadGroup(group);
          getMessageList(group.im_group_id, '', 10);
          chageTabName('group');
          this.setState({
            openPopup: false,
            value: '',
          });
        }}
      />
    ));

    const showList = contacts.length > 0 || groups.length > 0;

    return (
      <Wrapper>
        <TextField
          hintText={<FormattedMessage {...messages.search} />}
          value={value}
          onChange={this.handleChange}
        />
        <Popover
          open={this.state.openPopup}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          style={{
            width: '256px',
          }}
        >
          {showList && <div style={{ maxHeight: '320px' }}>
            { contacts.length > 0 && <Subheader><FormattedMessage {...messages.friend} /></Subheader> }
            <List>
              {contactListView}
            </List>
            { groups.length > 0 && <Subheader><FormattedMessage {...messages.group} /></Subheader> }
            <List>
              {groupListView}
            </List>
          </div>}
          {!showList && <Subheader><FormattedMessage {...messages.noSearchResult} /></Subheader>}
        </Popover>
      </Wrapper>
    );
  }
}

ChatPanelSearch.propTypes = {
  setFilter: PropTypes.func,
  loadUser: PropTypes.func,
  getTouchUser: PropTypes.func,
  getMessageList: PropTypes.func,
  loadGroup: PropTypes.func,
  getMessageGroup: PropTypes.func,
  chageTabName: PropTypes.func,
  contacts: PropTypes.array,
  groups: PropTypes.array,
};


const mapStateToProps = createStructuredSelector({
  contacts: makeSelectFilterContacts(),
  groups: makeSelectFilterGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (value) => dispatch(loadSearchFilter(value)),
    loadUser: (data) => dispatch(loadMessageUser(data)),
    getTouchUser: (id) => dispatch(fetchTouchUser(id)),
    getMessageList: (tid, nextkey, count) => dispatch(fetchGroupMessageList(tid, nextkey, count)),
    getMessageGroup: (data) => dispatch(loadMessageGroup(data)),
    loadGroup: (data) => dispatch(loadTouchGroup(data)),
    chageTabName: (tab) => dispatch(chageTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelSearch);
