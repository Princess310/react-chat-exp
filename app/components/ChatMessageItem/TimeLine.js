/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import { createChildFragment } from 'utils/childUtils';
import autoprefixer from 'utils/autoprefixer';
import date from 'utils/date';
import pallete from 'styles/colors';
import styled from 'styled-components';
import FlexRow from 'components/FlexRow';

const Wrapper = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 12px;
  color: ${pallete.text.help};
`;

const RolewWrapper = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 0 4px;
  font-size: 12px;
  color: ${pallete.white};
  background-color: ${pallete.text.yellow};
  border-radius: 4px;
`;

const NamewWrapper = styled.span`
  font-size: 12px;
  margin-left: 8px;
`;

class TimeLine extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { time, direction, name, role } = this.props;
    const fromatDate = date.getFormatDate(time);

    const roleElement = `${role}` === '0' ?(
      <div>
        <RolewWrapper>群主</RolewWrapper>
        <NamewWrapper>{name}</NamewWrapper>
      </div>
    ) : <NamewWrapper>{name}</NamewWrapper>;

    const timeElement = (
      <Wrapper style={{ textAlign: direction }}>
        {fromatDate}
      </Wrapper>
    );

    const chatFragment = (role && direction === 'left') ?
    {
      roleElement,
      timeElement,
    } :
    {
      timeElement
    };

    const justify = direction === 'left' ? 'flex-start' : direction === 'right' ? 'flex-end' : 'center';
    const inlineStyle = autoprefixer({ justifyContent: justify, alignItems: 'center' });
    const chatElement = createChildFragment(chatFragment);

    return (
      <FlexRow style={inlineStyle}>
        {chatElement}
      </FlexRow>
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
