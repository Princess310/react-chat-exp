import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Tabs, Tab } from 'material-ui/Tabs';
import styled from 'styled-components';

import { chageTab } from 'containers/ChatPage/actions';

import { makeSelectChatTab } from './selectors';
import ChatPanelMessage from './ChatPanelMessage';
import ChatPanelGroup from './ChatPanelGroup';
import ChatPanelContacts from './ChatPanelContacts';
import ChatPanelGroupList from './ChatPanelGroupList';

const TabWrapper = styled.div`
  height: 472px;
  overflow-y: scroll;
`;

class ChatPanelTab extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { chatTab } = this.props;

    return (
      <Tabs
        style={{ position: 'relative' }}
        value={chatTab}
      >
        <Tab
          icon={<span className="mdi mdi-comment-processing-outline" />}
          onActive={() => this.props.chageTab('message')}
          value="message"
        >
          <TabWrapper>
            <ChatPanelMessage />
          </TabWrapper>
        </Tab>
        <Tab
          icon={<span className="mdi mdi-comment-multiple-outline" />}
          onActive={() => this.props.chageTab('group')}
          value="group"
        >
          <TabWrapper>
            <ChatPanelGroup />
          </TabWrapper>
        </Tab>
        <Tab
          icon={<span className="mdi mdi-city" />}
          onActive={() => this.props.chageTab('groupList')}
          value="groupList"
        >
          <TabWrapper>
            <ChatPanelGroupList />
          </TabWrapper>
        </Tab>
        <Tab
          icon={<span className="mdi mdi-contact-mail" />}
          onActive={() => this.props.chageTab('contact')}
          value="contact"
        >
          <TabWrapper>
            <ChatPanelContacts />
          </TabWrapper>
        </Tab>
      </Tabs>
    );
  }
}

ChatPanelTab.propTypes = {
  chatTab: PropTypes.string,
  chageTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  chatTab: makeSelectChatTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    chageTab: (tab) => dispatch(chageTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelTab);
