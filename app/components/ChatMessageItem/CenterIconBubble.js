/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import FlexRow from 'components/FlexRow';
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

class CenterIconBubble extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const {
      children,
      style,
      iconClassName,
    } = this.props;

    return (
      <Wrapper style={{ style }}>
        <Bubble style={{ backgroundColor: pallete.white, fontSize: '14px' }}>
          <FlexRow>
            <span className={iconClassName} style={{ marginRight: '4px', color: pallete.theme }} />
            <span>{children}</span>
          </FlexRow>
        </Bubble>
      </Wrapper>
    );
  }
}

CenterIconBubble.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  iconClassName: PropTypes.string,
};

export default CenterIconBubble;
