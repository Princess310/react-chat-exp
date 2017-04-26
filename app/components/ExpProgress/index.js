/**
*
* ChatLoadMore
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

const barWidth = 40;
const Wrapper = styled.div`
  position: relative;
  width: ${barWidth}px;
  height: 12px;
  marginLeft: 4px;
  backgroundColor: ${pallete.background.progress};
  borderRadius: 4px;
`;

const Progress= styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  borderRadius: 4px;
  backgroundColor: ${pallete.text.yellow};
`;

class ExpProgress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { progress } = this.props;
    const width = barWidth * progress;

    return (
      <Wrapper>
        <Progress style={{width: width}} />
      </Wrapper>
    );
  }
}

ExpProgress.propTypes = {
  progress: PropTypes.string,
};

export default ExpProgress;
