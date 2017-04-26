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
  static defaultProps = {
    style: {},
  }

  render() {
    const {
      children,
      style,
    } = this.props;

    return (
      <Wrapper style={{ style }}>
        <Bubble style={{ color: pallete.theme, backgroundColor: pallete.background.chatBubble, fontSize: '14px' }}>
          {children}
        </Bubble>
      </Wrapper>
    );
  }
}

CenterBubble.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

export default CenterBubble;
