/**
*
* ChatTool
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import FlexRow from 'components/FlexRow';
import pallete from 'styles/colors';
import utils from 'utils/utils';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Overlay from 'material-ui/internal/Overlay';
import { Picker } from 'emoji-mart';

const HeaderWrapper = styled(FlexRow)`
  padding: 0 15px 0 0;
  height: 48px;
  background: #fff;
  color: ${pallete.text.help};
  align-items: center;
  justify-content: space-between;
`

const ActionItem = styled(IconButton)`
  font-size: 24px;

  &:hover{
    cursor: pointer;
  }
`;

const FileItem = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  font-size: 0;

  &:hover{
    cursor: pointer;
  }
`;

class ChatTool extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    showEmojiPanel: false,
    selectRange: null,
  }

  handleSendMessage = () => {
    const msg = this.editor.innerHTML;
    const content = {
      type: 'text',
      value: msg,
    };

    this.props.sendChatMessage(content, msg);
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSendMessage();
    }

    this.saveSelection();
  }

  handleShowEmoji = () => {
    this.setState({
      showEmojiPanel: true,
    });
  }

  handleTouchTapOverlay = () => {
    this.restoreSelection();
    this.setState({
      showEmojiPanel: false,
    });
  }

  saveSelection() {
    const selectRange = this.getSelection();
    this.setState({
      selectRange: selectRange,
    });
  }

  getSelection() {
    let sel, range, html;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  restoreSelection() {
    let sel, range, html;
    if (range) {
      if (window.getSelection) {
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }

    this.setState({
      selectRange: null,
    });
  }

  handleInsertTextAtCursor(dom) {
    const { selectRange } = this.state;

    if (selectRange) {
      selectRange.deleteContents();
      selectRange.insertNode( dom );
    }
  }

  handleSelectEmoji = (emoji, e) => {
    const { selectRange } = this.state;

    if (selectRange) {
      this.handleInsertTextAtCursor(utils.parseDom(twemoji.parse(emoji.native))[0]);
    } else {
      this.editor.innerHTML += twemoji.parse(emoji.native);
    }

    this.handleTouchTapOverlay();
  }

  render() {
    return (
      <div>
        <HeaderWrapper>
          <FlexRow>
            <ActionItem iconClassName="mdi mdi-emoticon" iconStyle={{ color: pallete.text.help }} onTouchTap={this.handleShowEmoji} />
            <div style={{ position: 'relative' }}>
              <FileItem type="file" accept="image/jpg,image/jpeg,image/png,image/gif" />
              <ActionItem iconClassName="mdi mdi-file" iconStyle={{ color: pallete.text.help }} />
            </div>
          </FlexRow>
          <FlexRow style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '12px', marginRight: '15px' }}>按下Ctrl+Enter 发送</span>
            <RaisedButton label="发送" primary={true} onTouchTap={this.handleSendMessage} />
          </FlexRow>
        </HeaderWrapper>
        { this.state.showEmojiPanel &&
          <div>
            <Picker
              set='twitter'
              sheetSize={20}
              onClick={this.handleSelectEmoji}
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '48px',
                zIndex: '20',
              }}
            />
            <Overlay
              show={true}
              style={{
                zIndex: '10',
              }}
              onTouchTap={this.handleTouchTapOverlay}
            />
          </div>
        }
        <pre
          className="chat-editor"
          contentEditable="plaintext-only"
          onKeyUp={ this.handleKeyUp }
          onClick={ () => { this.saveSelection() } }
          ref={ (r) => { this.editor = r } }
        />
      </div>
    );
  }
}

ChatTool.propTypes = {
  sendChatMessage: PropTypes.func,
};

export default ChatTool;
