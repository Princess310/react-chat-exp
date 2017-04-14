/**
*
* ChatLoadMore
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${pallete.theme};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

class ChatLoadMore extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { visible } = this.props;

    return (
      <Wrapper>
        {visible ?
        (<section onTouchTap={() => { this.props.onLoad() }}>
          查看更多消息
        </section>) : null}
      </Wrapper>
    );
  }
}

ChatLoadMore.propTypes = {
  onLoad: PropTypes.func,
  visible: PropTypes.bool,
};

export default ChatLoadMore;
