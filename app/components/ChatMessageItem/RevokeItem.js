import React, { PropTypes } from 'react';
import CenterBubble from './CenterBubble';

class RevokeItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const {
      direction,
      summary,
    } = this.props;

    const msg = direction === 'left' ? summary : '你撤回了一条消息';

    return (
      <CenterBubble>
        {msg}
      </CenterBubble>
    );
  }
}

RevokeItem.propTypes = {
  direction: PropTypes.string,
  summary: PropTypes.string,
};

export default RevokeItem;
