/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import pallete from 'styles/colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const Bubble = styled(Paper)`
  padding: 4px 15px;
`;

class CenterBubble extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      children,
      style,
    } = this.props;

    return (
      <Wrapper>
        <Bubble style={{ color: pallete.white, backgroundColor: 'rgba(0, 0, 0, 0.56)', fontSize: '14px' }}>
          {children}
        </Bubble>
      </Wrapper>
    );
  }
}

CenterBubble.propTypes = {

};

export default CenterBubble;
