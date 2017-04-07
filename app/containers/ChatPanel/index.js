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

import ChatPanelHeader from './ChatPanelHeader';
import ChatPanelSearch from './ChatPanelSearch';
import ChatPanelTab from './ChatPanelTab';

import Wrapper from './Wrapper';

export class ChatPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { currentUser } = this.props;

    return (
      <Wrapper>
        <ChatPanelHeader user={currentUser} />
        <ChatPanelSearch />
        <ChatPanelTab />
      </Wrapper>
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
