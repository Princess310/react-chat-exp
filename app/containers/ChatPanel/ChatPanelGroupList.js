/*
 *
 * ChatMessage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadUserGroup } from 'containers/ChatPage/actions';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import FlexCenter from 'components/FlexCenter';

import { makeSelectChatGroups, makeSelectLoadingGroupList } from './selectors';

export class ChatPanelGroupList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { groupList, loadGroup, loading } = this.props;
    const listView = groupList ? groupList.map((groups, index) => {
      const { name, list } = groups;
      let arr = [];

      list.map((group, i) => {
        const { name, head } = group;
        arr.push((
          <ListItem
            key={i}
            primaryText={name}
            leftIcon={<Avatar src={head} />}
            onTouchTap={() => {loadGroup(group)}}
          />
        ));
      });

      return (
        <ListItem
          key={index}
          primaryText={name}
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={arr}
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

ChatPanelGroupList.propTypes = {
  groupList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadGroup: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  groupList: makeSelectChatGroups(),
  loading:　makeSelectLoadingGroupList(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadGroup: (data) => dispatch(loadUserGroup(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelGroupList);
