/*
 *
 * ChatPanel
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import makeSelectCurrentUser from './selectors';

export class ChatPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <List>
          <ListItem
            primaryText={currentUser.nickname}
            leftAvatar={<Avatar src={currentUser.avatar} />}
          />
        </List>
      </div>
    );
  }
}

ChatPanel.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
