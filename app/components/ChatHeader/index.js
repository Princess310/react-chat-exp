/**
*
* ChatHeader
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const Wrapper = styled(Paper)`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ChatHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title } = this.props;

    return (
      <Wrapper>
        {title}
      </Wrapper>
    );
  }
}

ChatHeader.propTypes = {
  title: PropTypes.any,
};

export default ChatHeader;
