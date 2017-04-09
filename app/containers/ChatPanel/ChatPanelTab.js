import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import styled from 'styled-components';

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

class ChatPanelHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Tabs style={{ position: 'relative' }}>
        <Tab icon={<span className="mdi mdi-comment-processing-outline" />} >
          <TabWrapper>
            <ChatPanelMessage />
          </TabWrapper>
        </Tab>
        <Tab icon={<span className="mdi mdi-city" />} >
          <TabWrapper>
            <h2 style={styles.headline}>Tab Two</h2>
            <p>
              This is another example tab.
            </p>
          </TabWrapper>
        </Tab>
        <Tab icon={<span className="mdi mdi-contact-mail" />} >
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

export default ChatPanelHeader;
