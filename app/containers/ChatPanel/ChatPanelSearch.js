import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

import messages from './messages';


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
