/*
 *
 * ChatPanel
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectCurrentUser from './selectors';
import messages from './messages';

import Wrapper from './Wrapper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

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
  dispatch: PropTypes.func.isRequired,
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
