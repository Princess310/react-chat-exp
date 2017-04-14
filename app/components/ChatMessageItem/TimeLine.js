/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import date from 'utils/date';
import pallete from 'styles/colors';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 12px;
  color: ${pallete.text.help};
`;

class TimeLine extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { time, direction } = this.props;
    const fromatDate = date.getFormatDate(time);
    return (
      <Wrapper style={{ textAlign: direction }}>
        {fromatDate}
      </Wrapper>
    );
  }
}

TimeLine.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  direction: PropTypes.string,
};

export default TimeLine;
