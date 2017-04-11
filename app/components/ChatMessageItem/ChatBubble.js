/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

const Wrapper = styled(Paper)`
  padding: 8px;
  margin-left: 8px;
  margin-right: 8px;
  max-width: 360px;
  background-color: #fff;
  border-radius: 4px;
`;

class MessageBubble extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      direction,
      children,
      style,
    } = this.props;

    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }
}

MessageBubble.propTypes = {

};

export default MessageBubble;
