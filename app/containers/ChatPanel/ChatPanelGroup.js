/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadTouchGroup, fetchGroupMessageList } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import FlexCenter from 'components/FlexCenter';

import { makeSelectChatMessageGroups, makeSelectTouchGroup, makeSelectLoadingMessageGroups } from './selectors';

export class ChatPanelGroup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    msgCount: 10,
  }

  render() {
    const { messageGroups, loadGroup, getMessageList, touchGroup, loading } = this.props;
    const { msgCount } = this.state;

    const listView = messageGroups ? messageGroups.map((group, key) => {
      const itemStyle = {};

      // set active style for touch user
      if (touchGroup && (touchGroup.id === group.id)) {
        itemStyle.backgroundColor = 'rgba(0, 0, 0, 0.125)';
      }

      return (
        <ListItem
          key={key}
          leftAvatar={<Avatar src={group.head} />}
          // rightIcon={group.msgCount ?
          //   <Badge badgeContent={group.msgCount} secondary={true} />
          //   : null
          // }
          primaryText={group.name}
          style={itemStyle}
          onTouchTap={() => {
            loadGroup(group);
            getMessageList(group.tid, '', msgCount);
          }}
        />
      );
    }) : null;

    return (
      <List>
        {loading && <FlexCenter>
          <CircularProgress size={24} />
        </FlexCenter>}
        {listView}
      </List>
    );
  }
}

ChatPanelGroup.propTypes = {
  messageGroups: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getMessageList: PropTypes.func,
  loadGroup: PropTypes.func,
  touchGroup: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  messageGroups: makeSelectChatMessageGroups(),
  touchGroup: makeSelectTouchGroup(),
  loading: makeSelectLoadingMessageGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMessageList: (tid, nextkey, count) => dispatch(fetchGroupMessageList(tid, nextkey, count)),
    loadGroup: (data) => dispatch(loadTouchGroup(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelGroup);
