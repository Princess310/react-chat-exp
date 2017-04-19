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

import { makeSelectFilterContacts, makeSelectFilterGroups } from './selectors';
import {
  loadSearchFilter,
  fetchTouchUser,
  loadMessageUser,
  loadTouchGroup,
  loadMessageGroup,
  fetchGroupMessageList,
  chageTab,
} from 'containers/ChatPage/actions';
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
      value: value,
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

  handleRequestClose = (e) => {
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
      loadMessageGroup,
      loadGroup,
      getMessageList,
      chageTab,
    } = this.props;
    const { value } = this.state;console.log('props', this.props);
    const contactListView = contacts.map((contact, index) => {
      return (
        <ListItem
          key={index}
          leftAvatar={<Avatar src={contact.avatar} />}
          primaryText={contact.nickname}
          onTouchTap={() => {
            loadUser(contact);
            getTouchUser(contact.id);
            chageTab('message');
            this.setState({
              openPopup: false,
              value: '',
            });
          }}
        />
      );
    });

    const groupListView = groups.map((group, index) => {
      return (
        <ListItem
          key={index}
          leftAvatar={<Avatar src={group.head} />}
          primaryText={group.name}
          onTouchTap={() => {
            group.tid = group.im_group_id;
            loadMessageGroup(group);
            loadGroup(group);
            getMessageList(group.im_group_id, '', 10);
            chageTab('group');
            this.setState({
              openPopup: false,
              value: '',
            });
          }}
        />
      );
    });

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
            { contacts.length > 0 && <Subheader>好友</Subheader> }
            {contactListView}
            { groups.length > 0 && <Subheader>群组</Subheader> }
            {groupListView}
          </div>}
          {!showList && <Subheader>没有相关匹配</Subheader>}
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
  loadMessageGroup: PropTypes.func,
  chageTab: PropTypes.func,
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
    loadMessageGroup: (data) => dispatch(loadMessageGroup(data)),
    loadGroup: (data) => dispatch(loadTouchGroup(data)),
    chageTab: (tab) => dispatch(chageTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelSearch);
