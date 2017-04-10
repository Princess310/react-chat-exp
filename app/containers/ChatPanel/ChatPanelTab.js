import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Tabs, Tab } from 'material-ui/Tabs';
import styled from 'styled-components';

import { chageTab } from 'containers/ChatPage/actions';

import { makeSelectChatTab } from './selectors';
import ChatPanelMessage from './ChatPanelMessage';

const TabWrapper = styled.div`
  height: 472px;
  overflow-y: scroll;
`;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class ChatPanelTab extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { chatTab } = this.props;
    let selectTab = 0;

    switch (chatTab) {
      case 'message':
        selectTab = 0;
        break;
      case 'business':
        selectTab = 1;
        break;
      case 'contact':
        selectTab = 2;
        break;
      default:
        selectTab = 0;
    }

    return (
      <Tabs
        style={{ position: 'relative' }}
        initialSelectedIndex={selectTab}
      >
        <Tab
          icon={<span className="mdi mdi-comment-processing-outline" />}
          onActive={() => this.props.chageTab('message')}
        >
          <TabWrapper>
            <ChatPanelMessage />
          </TabWrapper>
        </Tab>
        <Tab
          icon={<span className="mdi mdi-city" />}
          onActive={() => this.props.chageTab('business')}
        >
          <TabWrapper>
            <h2 style={styles.headline}>Tab Two</h2>
            <p>
              This is another example tab.
            </p>
          </TabWrapper>
        </Tab>
        <Tab
          icon={<span className="mdi mdi-contact-mail" />}
          onActive={() => this.props.chageTab('contact')}
        >
          <TabWrapper>
            <h2 style={styles.headline}>Tab Three</h2>
            <p>
              This is a third example tab.
            </p>
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
