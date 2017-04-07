import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styled from 'styled-components';

import TextField from 'material-ui/TextField';

const Wrapper = styled.div`
  padding: 0 15px;
`;

class ChatPanelHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <TextField
          hintText={<FormattedMessage {...messages.search} />}
        />
      </Wrapper>
    );
  }
}

export default ChatPanelHeader;
