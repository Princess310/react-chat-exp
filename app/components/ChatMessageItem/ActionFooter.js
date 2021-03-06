/**
*
* ChatMessage
*
*/

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import FlexRow from 'components/FlexRow';
import pallete from 'styles/colors';

const ActionItem = styled(RaisedButton)`
  width: 50%;
  border-right: 1px ${pallete.white} solid;
`;

class ActionFooter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      saveText,
      cancelText,
      onSave,
      onCancel,
    } = this.props;

    return (
      <FlexRow>
        <ActionItem primary={true} label={saveText} onTouchTap={() => { onSave(); }} />
        <ActionItem secondary={true} label={cancelText} onTouchTap={() => { onCancel(); }} />
      </FlexRow>
    );
  }
}

ActionFooter.propTypes = {
  saveText: PropTypes.string,
  cancelText: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ActionFooter;
